package com.zack.demo.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {
    // no custom existsById() here — JpaRepository already provides existsById(ID
    // id)
}
