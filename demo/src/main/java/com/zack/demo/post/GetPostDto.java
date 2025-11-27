package com.zack.demo.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetPostDto {
    private long id;
    private String content;
    private String image_path;
    private long user_id;
    private boolean visibility;
    private long created_at;
    private String nickname;
    private long likes;
    private long dislikes;
    private boolean postOwner;
    private String reacted;
}
