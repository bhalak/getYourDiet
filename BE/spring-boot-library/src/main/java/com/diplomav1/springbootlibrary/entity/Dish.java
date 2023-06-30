package com.diplomav1.springbootlibrary.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "dish")
@Data
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "img")
    private String img;

    @Column(name = "has_meat")
    private Byte hasMeat;

    @Column(name = "course_type")
    private String courseType;

    @Column(name = "description")
    private String description;

    @Column(name = "recommendations")
    private String recommendations;

    public Dish(){}

    public Dish(String name, String img, Byte hasMeat, String courseType, String description, String recommendations) {
        this.name = name;
        this.img = img;
        this.hasMeat = hasMeat;
        this.courseType = courseType;
        this.description = description;
        this.recommendations = recommendations;
    }
}
