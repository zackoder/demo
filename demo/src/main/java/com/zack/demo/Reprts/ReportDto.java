package com.zack.demo.Reprts;

import lombok.Data;

@Data
public class ReportDto {
    private String target;
    private long targetId;
    private String content;
    private long createdAt;
}
