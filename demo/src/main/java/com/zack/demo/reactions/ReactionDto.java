package com.zack.demo.reactions;

import lombok.Data;

@Data
public class ReactionDto {
    private String target;
    private long targetId;
    private String reactionType;
    private long createdAt;
}
