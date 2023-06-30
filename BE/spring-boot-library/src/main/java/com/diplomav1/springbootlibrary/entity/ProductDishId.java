package com.diplomav1.springbootlibrary.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class ProductDishId implements Serializable {
    private int productId;
    private int dishId;
}
