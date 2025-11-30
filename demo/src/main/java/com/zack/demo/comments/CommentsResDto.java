package com.zack.demo.comments;

import lombok.Data;

@Data
public class CommentsResDto {
    private long id;
    private long userId;
    private long postId;
    private String comment;
    private String nickname;
    private long creadAt;
}
