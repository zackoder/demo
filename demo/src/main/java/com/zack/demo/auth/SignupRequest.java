package com.zack.demo.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String username;
    private String email;
    private String password;
    private String fullName;
    private String bio;
    public SignupRequest() {
    }
}
