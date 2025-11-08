package com.zack.demo.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zack.demo.config.JwtService;

@RestController
@RequestMapping("/api")
public class AddPostControler {

    @Autowired
    private PostService postService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/addPost")
    public ResponseEntity<?> addPost(@RequestBody AddPostDto dto, @RequestHeader("authorization") String authHeader) {
        System.out.println("Headers: " + authHeader);
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body("Missing or invalid Authorization header");
            }
            String jwt = authHeader.substring(7);
            String nickname = jwtService.extractUsername(jwt);
            System.out.println("Extracted nickname: " + nickname);
            postService.savePost(dto, nickname);
            return ResponseEntity.ok("good");
        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body("Error creating post: " + e.getMessage());
        }
    }
}
