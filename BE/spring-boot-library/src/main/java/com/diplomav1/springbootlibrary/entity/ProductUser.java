package com.diplomav1.springbootlibrary.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "product_user")
@Data
public class ProductUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "product_id")
    private int productId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "weight")
    private Float weight;

    @Column(name = "expiration_date")
    private Date expirationDate;

    @Column(name = "quantity")
    private Integer quantity;

    public ProductUser(){}
    public ProductUser(int id, int productId, int userId, Float weight, Date expirationDate, Integer quantity) {
        this.id = id;
        this.productId = productId;
        this.userId = userId;
        this.weight = weight;
        this.expirationDate = expirationDate;
        this.quantity = quantity;
    }
}
