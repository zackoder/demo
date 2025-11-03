package com.zack.demo.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDto {
    private String email;
    private String password;

    public LoginRequestDto() {
    }
}