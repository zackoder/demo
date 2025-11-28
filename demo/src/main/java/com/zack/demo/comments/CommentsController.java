package com.zack.demo.comments;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zack.demo.config.JwtService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api")
public class CommentsController {

    @Autowired
    private CommentsService commentsService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/addComment")
    public ResponseEntity<?> addComment(@RequestBody CommentsReqDto dto, @RequestHeader("authorization") String jwt) {
        HashMap<String, String> resp = new HashMap<>();
        if (jwt == null || jwt.startsWith("Bearer")) {
            resp.put("error", "unauthorized");
            return ResponseEntity.status(403).body(resp);
        }

        System.out.println("hello");

        System.out.println(dto.toString());
        // dto.stringifi();

        String nickname = jwtService.extractUsername(jwt.substring(7));
        commentsService.checkUser(nickname);
        return null;
    }
}
