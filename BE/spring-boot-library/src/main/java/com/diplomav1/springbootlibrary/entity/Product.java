package com.diplomav1.springbootlibrary.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "product")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "img")
    private String img;

    @Column(name = "individually")
    private Byte individually;

    public Product(){}
    public Product(String name, String img, Byte individually) {
        this.img = img;
        this.name = name;
        this.individually = individually;
    }
}
