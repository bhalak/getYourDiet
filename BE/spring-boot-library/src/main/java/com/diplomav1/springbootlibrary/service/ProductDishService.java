package com.diplomav1.springbootlibrary.service;

import com.diplomav1.springbootlibrary.dao.ProductDishRepository;
import com.diplomav1.springbootlibrary.entity.ProductDish;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductDishService {
    private ProductDishRepository productDishRepository;

    public ProductDishService(ProductDishRepository productDishRepository) {
        this.productDishRepository = productDishRepository;
    }

    public ProductDish addProductDish(ProductDish productDish) {
        productDishRepository.save(productDish);
        return productDish;
    }

    public Iterable<ProductDish> addProductDish(Iterable<ProductDish> productDishes) {
        productDishRepository.saveAll(productDishes);
        return productDishes;
    }

    public List<ProductDish> getAll() {
        return productDishRepository.findAll();
    }

    public List<ProductDish> getAll(int dishId) {
        return productDishRepository.findByDishId(dishId);
    }
}
