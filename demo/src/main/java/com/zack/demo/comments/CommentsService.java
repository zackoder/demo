package com.zack.demo.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zack.demo.post.PostRepo;
import com.zack.demo.user.UserRepository;

@Service
public class CommentsService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PostRepo postRepo;

    public boolean checkUser(String nickname) {
        return userRepo.existsByNickname(nickname);
    }

    
}
