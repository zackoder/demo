package com.zack.demo.Reprts;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Reports {
    @Id
    private long id;

    // @OneToMany
    private long postId;
    // @OneToMany
    private long userId;

    private long created_at;
    private String content;
}
