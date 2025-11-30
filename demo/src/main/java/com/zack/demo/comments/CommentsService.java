package com.zack.demo.comments;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zack.demo.post.Post;
import com.zack.demo.post.PostRepo;
import com.zack.demo.user.User;
import com.zack.demo.user.UserRepository;

@Service
public class CommentsService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PostRepo postRepo;
    @Autowired
    private CommentsRepo commentsRepo;

    public boolean checkUser(String nickname) {
        return userRepo.existsByNickname(nickname);
    }

    public boolean checkPost(long postId) {
        return postRepo.existsById(postId);
    }

    public CommentsResDto saveComment(CommentsReqDto dto, String nickname) {
        Comments comment = convertToComments(dto, nickname);
        if (comment == null) {
            return null;
        }
        comment = commentsRepo.save(comment);
        CommentsResDto res = commentsResDto(comment);
        return res;
    }

    private Comments convertToComments(CommentsReqDto dto, String nickname) {
        User user = userRepo.findByNickname(nickname).get();
        Post post = postRepo.findById(dto.getPostId()).get();

        Comments comment = new Comments();
        comment.setContent(dto.getComment());
        comment.setCreatedAt(new Date().getTime() / 1000);
        comment.setPost(post);
        comment.setUser(user);
        return comment;
    }

    private CommentsResDto commentsResDto(Comments comment) {
        CommentsResDto resDto = new CommentsResDto();
        resDto.setComment(comment.getContent());
        resDto.setCreadAt(comment.getCreatedAt());
        resDto.setId(comment.getId());
        resDto.setNickname(comment.getUser().getNickname());
        resDto.setUserId(comment.getUser().getId());
        resDto.setPostId(comment.getPost().getId());
        return resDto;
    }

    public List<Comments> getAllComments(long id) {
        return commentsRepo.findAllByPostId(id);
    }
}
