package com.diplomav1.springbootlibrary.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@IdClass(ProductDishId.class)
@Table(name = "product_dish")
@Data
public class ProductDish {
    @Id
    @Column(name = "product_id")
    private int productId;

    @Id
    @Column(name = "dish_id")
    private int dishId;

    @Column(name = "weight")
    private Float weight;

    @Column(name = "quantity")
    private Integer quantity;

    public ProductDish(){}
    public ProductDish(int productId, int dishId, Float weight, Integer quantity) {
        this.productId = productId;
        this.dishId = dishId;
        this.weight = weight;
        this.quantity = quantity;
    }
}
