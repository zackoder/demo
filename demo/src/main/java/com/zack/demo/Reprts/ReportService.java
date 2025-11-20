package com.zack.demo.Reprts;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.zack.demo.post.Post;
import com.zack.demo.post.PostRepo;
import com.zack.demo.user.User;
import com.zack.demo.user.UserRepository;

@Service
public class ReportService {
    @Autowired
    UserRepository userRepo;
    @Autowired
    PostRepo postRepo;

    public ResponseEntity<?> checkReportData(String nickname, ReportDto dto) {

        HashMap<String, Object> resp = new HashMap<>();

        boolean userExists = userRepo.existsByNickname(nickname);

        if (!userExists) {
            resp.put("error", "User Not found");
            return ResponseEntity.status(404).body(resp);
        }

        boolean postExists = postRepo.existsById(dto.getTargetId());

        if (!postExists) {
            resp.put("error", "Post Does not exists");
            return ResponseEntity.status(404).body(resp);
        }

        return null;
    }
}
