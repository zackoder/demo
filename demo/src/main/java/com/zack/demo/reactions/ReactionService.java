package com.zack.demo.reactions;

import java.util.Date;
import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zack.demo.post.Post;
import com.zack.demo.post.PostRepo;
import com.zack.demo.user.User;
import com.zack.demo.user.UserRepository;

@Service
public class ReactionService {
    @Autowired
    private PostRepo post;

    @Autowired
    private UserRepository user;

    @Autowired
    private ReactionRepo reactionRepo;

    // i have to add the comment repo
    public boolean validateDto(ReactionDto dto) {
        System.out.println(dto);
        if (dto.getReactionType().isEmpty()
                || (!dto.getReactionType().equals("like") && !dto.getReactionType().equals("dislike"))) {
            return false;
        }

        if (!dto.getTarget().equals("post") && !dto.getTarget().equals("comment")) {
            return false;
        }

        if (dto.getTarget().equals("post")) {
            Optional<Post> postOption = post.findById(dto.getTargetId());
            if (postOption.isEmpty()) {
                return false;
            }
        } else {
            // here i should hadle the case of the comment reaction
        }

        return true;
    }

    public HashMap<Object, Object> seveReaction(ReactionDto dto, String nickname) {
        HashMap<Object, Object> ret = new HashMap<>();
        Optional<User> userOptional = user.findByNickname(nickname);
        if (userOptional == null || userOptional.isEmpty()) {
            ret.put("error", "User not found");
            return ret;
        }
        User reacter = userOptional.get();
        // here i should check if the who reacted following the poster
        Optional<Reactions> reactionOptional = reactionRepo.findByPostIdAndUserId(dto.getTargetId(),
                reacter.getId());
        if (reactionOptional.isEmpty()) {
            Reactions reaction = new Reactions();
            reaction.setCreatedAt(new Date().getTime() / 1000);
            reaction.setPostId(dto.getTargetId());
            reaction.setUserId(reacter.getId());
            reaction.setReaction_type(dto.getReactionType());
            reactionRepo.save(reaction);
            ret.put("userId", reacter.getId());
            return ret;
        } else {
            Reactions reaction = reactionOptional.get();
            if (reaction.getReaction_type().equals(dto.getReactionType())) {
                reactionRepo.delete(reaction);
            } else {
                reaction.setReaction_type(dto.getReactionType());
                var test = reactionRepo.save(reaction);
                System.out.println(test);
                ret.put("userId", reacter.getId());
            }
        }

        // System.out.println(reaction.getReaction());
        return ret;
    }

    public ReactionRespDto getNewReactions(long userId, long postId) {
        return reactionRepo.getNewReactions(postId, userId, postId);
    }
}
