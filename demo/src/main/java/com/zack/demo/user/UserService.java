package com.zack.demo.user;

import java.util.Optional;

public class UserService {
    private UserRepository userRepository;

    UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    public Optional<User> findByNickname(String nickname) {
        return this.userRepository.findByNickname(nickname);
    }

    public User saveUser(User user) {
        return this.userRepository.save(user);
    }
}
