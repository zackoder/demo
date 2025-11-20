package com.zack.demo.reactions;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReactionRepo extends JpaRepository<Reactions, Long> {
    // match the entity field names
    Optional<Reactions> findByPostIdAndUserId(long postId, long userId);

    @Query(value = """
            SELECT
                SUM(CASE WHEN reaction_type = 'like' THEN 1 ELSE 0 END) AS likes,
                SUM(CASE WHEN reaction_type = 'deslike' THEN 1 ELSE 0 END) AS dislikes,
                CASE
                    WHEN post_id = ? AND user_id = ? THEN reaction_type
                    ELSE ''
            END AS reacted
            FROM reactions
            WHERE post_id = ?
            GROUP BY post_id, user_id, reaction_type
            """, nativeQuery = true)
    ReactionRespDto getNewReactions(long postId, long userId, long postId);
}
