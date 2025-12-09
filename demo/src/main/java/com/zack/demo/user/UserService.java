package com.zack.demo.user;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zack.demo.post.PostRepo;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepo postRepo;

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
        if (user == null) {
            return null;
        }
        return this.userRepository.save(user);
    }

    public GetCredentialsDto getCredentials(String nickname) {
        User user = userRepository.findByNickname(nickname).get();
        if (user == null) {
            return null;
        }
        GetCredentialsDto userCredentials = new GetCredentialsDto(user.getNickname(), user.getId());
        return userCredentials;
    }

    public HashMap<String, String> checkData(String nickname, String[] data) {
        HashMap<String, String> res = new HashMap<>();
        long id = 0;
        try {
            id = Long.parseLong(data[1]);
        } catch (Exception e) {
            res.put("error", "invalid Data");
            return res;
        }
        User userById = userRepository.findById(id).get();

        User user = userRepository.findByNickname(nickname).get();
        if (user == null) {
            res.put("error", "Unauthorized");
            return res;
        }

        if (userById == null || !userById.getNickname().equals(data[0])) {
            res.put("error", "invalid Data");
            return res;
        }
        return null;
    }
    
}
