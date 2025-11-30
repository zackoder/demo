package com.zack.demo.comments;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepo extends JpaRepository<Comments, Long> {
    long countByPostId(long postId);
}
