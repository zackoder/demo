package com.zack.demo.reactions;

import com.beust.jcommander.internal.Nullable;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReactionDtoResp {
    private long likes;
    private long dislikes;
    private String reacted;
}
