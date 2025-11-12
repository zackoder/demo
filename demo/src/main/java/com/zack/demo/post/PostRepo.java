package com.zack.demo.post;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {
    Optional<Post> findById(Long id);

    @Query(value = "SELECT * FROM posts OFFSET ? LIMIT 10", nativeQuery = true)
    List<Post> findPostsByOffsetAndLimit(int offset);
}
