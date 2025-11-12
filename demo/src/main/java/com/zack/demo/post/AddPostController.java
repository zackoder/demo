package com.zack.demo.post;

import java.util.List;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.zack.demo.config.JwtService;

@RestController
@RequestMapping("/api")
public class AddPostController {

    @Autowired
    private PostService postService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/getPosts")
    public ResponseEntity<?> testAddPost(@RequestParam int offset, @RequestHeader("authorization") String authHeader) {
        System.out.println("offset: " + offset);
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body("Missing or invalid Authorization header");
            }
            List<GetPostDto> posts = postService.getPosts(offset);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body("Error creating post: " + e.getMessage());
        }
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

            // postService.savePost(dto, nickname, file);

            return ResponseEntity.ok("good");
        } catch (Exception e) {
            System.err.println("Error details: " + e.getMessage());
            return ResponseEntity
                    .status(500)
                    .body("Error creating post: " + e.getMessage());
        }
    }
}
