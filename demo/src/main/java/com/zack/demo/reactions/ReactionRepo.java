package com.zack.demo.reactions;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReactionRepo extends JpaRepository<Reactions, Long> {
    // match the entity field names
    Optional<Reactions> findByPostIdAndUserId(long postId, long userId);
}
