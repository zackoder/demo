package com.zack.demo.post;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zack.demo.user.User;
import com.zack.demo.user.UserRepository;

import lombok.Data;

@Service
@Data
public class PostService {

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepository userRepository;

    public void savePost(AddPostDto addPost, String userEmailOrNickname) {
        Post post = new Post();

        User user = userRepository.findByEmail(userEmailOrNickname)
                .orElseGet(() -> userRepository.findByNickname(userEmailOrNickname)
                        .orElseThrow(() -> new RuntimeException("User not found")));
        post.setContent(addPost.getContent());
        post.setImagePath("nothing for the moment");
        post.setUserId(user.getId());
        post.setVisibility(true);
        post.setCreated_at(new Date().getTime() / 1000);
        postRepo.save(post);
    }

    public List<GetPostDto> getPosts(int offset) {
        List<Post> posts = postRepo.findPostsByOffsetAndLimit(offset);
        return posts.stream().map(post -> {
            GetPostDto dto = new GetPostDto();
            dto.setId(post.getId());
            dto.setContent(post.getContent());
            dto.setImagePath(post.getImagePath());
            dto.setUserId(post.getUserId());
            User user = userRepository.findById(post.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            dto.setNickname(user.getNickname());
            dto.setVisibility(post.isVisibility());
            dto.setCreatedAt(post.getCreated_at());
            return dto;
        }).toList();
    }
}
