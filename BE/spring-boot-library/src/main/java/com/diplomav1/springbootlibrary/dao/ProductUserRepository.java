package com.diplomav1.springbootlibrary.dao;

import com.diplomav1.springbootlibrary.entity.ProductUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface ProductUserRepository  extends JpaRepository<ProductUser, Integer> {
    Page<ProductUser> findByUserId(@RequestParam("user_id") int userId, Pageable pageable);
    ProductUser findById(int id);
}
