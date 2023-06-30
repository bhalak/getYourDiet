package com.diplomav1.springbootlibrary.service;

import com.diplomav1.springbootlibrary.dao.UserRepository;
import com.diplomav1.springbootlibrary.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public User addUser(String email, String password) {
        Optional<User> userCopy = Optional.ofNullable(userRepository.findByEmail(email));
        if (userCopy.isPresent()) {
            return null;
        }

        User newUser = new User(email, password);
        return userRepository.save(newUser);
    }
}
