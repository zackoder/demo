package com.zack.demo.post;

import lombok.Data;

@Data
public class AddPostDto {
    private Integer id;
    private String content;
    private Integer user_id;
}
