package com.zack.demo.comments;

import lombok.Data;

@Data
public class CommentsReqDto {
    private long postId;
    private String comment;

    // public long getPostId() {
    // return postId;
    // }

    // public String getComment() {
    // return comment;
    // }

    // public void setComment(String comment) {
    // this.comment = comment;
    // }

    // public void setPostId(long postId) {
    // this.postId = postId;
    // }

    // public void stringifi() {
    // System.out.printf("{\npostId: %d,\ncomment: %s\n}", this.postId,
    // this.comment);
    // }
}
