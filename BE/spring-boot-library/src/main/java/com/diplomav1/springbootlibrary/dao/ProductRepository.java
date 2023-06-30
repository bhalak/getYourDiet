package com.diplomav1.springbootlibrary.dao;

import com.diplomav1.springbootlibrary.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Product findById(int id);
    Product findByName(@RequestParam("name") String name);

}
