package com.zack.demo.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestDto {
    private String nickname;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String bio;

    public SignupRequestDto() {
    }
}
