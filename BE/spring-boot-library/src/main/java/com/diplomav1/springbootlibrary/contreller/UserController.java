package com.diplomav1.springbootlibrary.contreller;

import com.diplomav1.springbootlibrary.entity.User;
import com.diplomav1.springbootlibrary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/check")
    public User checkUserExist(@RequestParam String email, @RequestParam String password) {
        Optional<User> user = Optional.ofNullable(userService.getUserByEmailAndPassword(email, password));
        if (user.isPresent()) {
            return user.get();
        }

        return null;
    }

    @PostMapping("/add")
    public User addUser(@RequestParam String email, @RequestParam String password) {
        return userService.addUser(email, password);
    }
}
