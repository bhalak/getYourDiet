package com.diplomav1.springbootlibrary.dao;

import com.diplomav1.springbootlibrary.entity.ProductDish;
import com.diplomav1.springbootlibrary.entity.ProductDishId;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.Serializable;
import java.util.List;

//Page<ProductUser> findByUserId(@RequestParam("user_id") int userId, Pageable pageable);
public interface ProductDishRepository extends JpaRepository<ProductDish, ProductDishId> {
    List<ProductDish> findByDishId(@RequestParam("dish_id") int dishId);
}
