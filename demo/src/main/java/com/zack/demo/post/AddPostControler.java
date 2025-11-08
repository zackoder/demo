package com.zack.demo.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AddPostControler {

    @Autowired
    private PostService postService;

    @PostMapping("/addPost")
    public ResponseEntity<?> addPost(@RequestBody AddPostDto dto, @RequestHeader("authorization") String authHeader) {
        System.out.println("Headers: " + authHeader);
        try {
            postService.savePost(dto, authHeader);
            return ResponseEntity.ok("good");
        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body("Error creating post: " + e.getMessage());
        }
    }

}