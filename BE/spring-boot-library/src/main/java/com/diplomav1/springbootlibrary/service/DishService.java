package com.diplomav1.springbootlibrary.service;

import com.diplomav1.springbootlibrary.dao.DishRepository;
import com.diplomav1.springbootlibrary.entity.Dish;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DishService {
    private DishRepository dishRepository;

    public DishService(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    public int addDish(Dish dish) {
        dishRepository.save(dish);
        return dish.getId();
    }

    public List<Dish> getAll() {
        return dishRepository.findAll();
    }
}
