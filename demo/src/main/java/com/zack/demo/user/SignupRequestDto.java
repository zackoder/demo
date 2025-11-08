package com.zack.demo.user;

import lombok.Data;

@Data
public class SignupRequestDto {
    private String nickname;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String bio;
}
