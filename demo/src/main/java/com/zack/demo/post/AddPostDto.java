package com.zack.demo.post;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AddPostDto {
    private Integer id;
    private String content;
    private Integer user_id;
    
}
