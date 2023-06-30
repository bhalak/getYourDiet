package com.diplomav1.springbootlibrary.dao;

import com.diplomav1.springbootlibrary.entity.Product;
import com.diplomav1.springbootlibrary.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(@RequestParam("email") String email);
    User findByEmailAndPassword(@RequestParam("email") String email, @RequestParam("password") String password);
}
