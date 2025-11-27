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
                SUM(CASE WHEN r.reaction_type = 'like' THEN 1 ELSE 0 END) AS likes,
                SUM(CASE WHEN r.reaction_type = 'dislike' THEN 1 ELSE 0 END) AS dislikes,
                CASE WHEN r.user_id = ? THEN r.reaction_type ELSE '' END AS reacted
            FROM
                reactions r
            WHERE
                r.post_id = ?
            GROUP BY
                user_id, r.reaction_type;
                """, nativeQuery = true)
    ReactionDtoResp countReaction(long userId, long postId);
}
