package com.diplomav1.springbootlibrary.dao;

import com.diplomav1.springbootlibrary.entity.Dish;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DishRepository  extends JpaRepository<Dish, Integer> {
    Dish findById(int id);
}
