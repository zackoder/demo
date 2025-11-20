package com.zack.demo.reactions;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zack.demo.config.JwtService;

@RestController
@RequestMapping("/api")
public class ReactionController {

    @Autowired
    private ReactionService reactionService;

    @Autowired
    private JwtService jwt;

    @PostMapping("/reaction")
    public ResponseEntity<?> handleReaction(@RequestBody ReactionDto dtoReq,
            @RequestHeader(value = "authorization", required = false) String auth) {

        HashMap<Object, Object> resp = new HashMap<>();
        if (auth == null || auth.isEmpty() || !auth.startsWith("Bearer")) {
            resp.put("error", "unauthorized");
            return ResponseEntity.status(403).body(resp);
        }
        String nickname = jwt.extractUsername(auth.substring(7));
        if (!reactionService.validateDto(dtoReq)) {
            resp.put("error", "invalid data");
            return ResponseEntity.badRequest().body(resp);
        }
        resp = reactionService.seveReaction(dtoReq, nickname);
        if (resp.get("error") != null) {
            return ResponseEntity.status(404).body(resp);
        }
        System.out.println(resp.toString());

        ReactionRespDto res = reactionService.getNewReactions(1, dtoReq.getTargetId());
        // resp.put("message", "nothing");
        return ResponseEntity.ok().body(res);
    }
}
