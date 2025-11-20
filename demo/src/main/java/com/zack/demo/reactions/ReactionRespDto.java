package com.zack.demo.reactions;

public record ReactionRespDto(
        long likes,
        long dislikes,
        String reacted) {
}
