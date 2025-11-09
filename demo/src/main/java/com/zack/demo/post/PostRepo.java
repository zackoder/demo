package com.zack.demo.post;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {
    Optional<Post> findById(Long id);

    // List<Post> findPostsByOffsetAndLimit(int offset, int limit);
}
