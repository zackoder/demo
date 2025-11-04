package com.zack.demo.user;

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
}
