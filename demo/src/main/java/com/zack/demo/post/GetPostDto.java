package com.zack.demo.post;

import lombok.Data;

@Data
public class GetPostDto {
    private long id;
    private String content;
    private String imagePath;
    
}
