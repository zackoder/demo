package com.zack.demo.auth;

import com.zack.demo.config.JwtService;
import com.zack.demo.user.User;
import com.zack.demo.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class LoginController {
    
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public LoginController(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginRequestDto loginRequest) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByNickname(loginRequest.getEmail());
        }

        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return ResponseEntity.status(200).body(response);
        }

        User user = userOpt.get();

        System.out.println(loginRequest.getPassword());

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            response.put("success", false);
            response.put("message", "Incorrect password");
            return ResponseEntity.status(200).body(response);
        }

        String token = jwtService.generateToken(user);

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("token", token);
        response.put("user", user);

        return ResponseEntity.ok(response);
    }
}
