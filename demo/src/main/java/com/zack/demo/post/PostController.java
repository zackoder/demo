package com.zack.demo.post;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.zack.demo.config.JwtService;

@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/getPosts")
    public ResponseEntity<?> getPosts(@RequestParam int offset, @RequestHeader("authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing or invalid Authorization header");
        }
        String nickname = jwtService.extractUsername(authHeader.substring(7));
        List<GetPostDto> posts = postService.getPosts(offset, nickname);
        return ResponseEntity.ok(posts);
    }

    @PostMapping("/addPost")
    public ResponseEntity<?> addPost(
            @RequestPart("content") String content,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @RequestHeader("authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body("Missing or invalid Authorization header");
            }

            String jwt = authHeader.substring(7);
            String nickname = jwtService.extractUsername(jwt);
            System.out.println("Extracted nickname: " + nickname);

            postService.savePost(content, nickname, file);

            return ResponseEntity.ok("good");
        } catch (Exception e) {
            System.err.println("Error details: " + e.getMessage());
            System.err.println("content: " + content);
            return ResponseEntity
                    .status(500)
                    .body("Error creating post: " + e.getMessage());
        }
    }

    @DeleteMapping("/deletePost/{id}")
    public ResponseEntity<?> deletePost(@PathVariable long id, @RequestHeader("authorization") String jwt) {
        HashMap<String, String> resp = new HashMap<>();
        if (jwt == null || !jwt.startsWith("Bearer ")) {
            resp.put("error", "Unauthorized");
            return ResponseEntity.status(403).body(resp);
        }

        String UserNickname = jwtService.extractUsername(jwt.substring(7));
        if (!postService.checkUser(UserNickname)) {
            resp.put("error", "user not found");
            return ResponseEntity.status(403).body(resp);
        }

        if (!postService.checkPost(id)) {
            resp.put("error", "post not found");
            return ResponseEntity.status(403).body(resp);
        }
        System.out.println(postService.checkouner(id, UserNickname));
        if (!postService.checkouner(id, UserNickname)) {

        }

        postService.deletePost(id);
        resp.put("message", "post deleted");
        return ResponseEntity.ok().body(resp);
    }
}
