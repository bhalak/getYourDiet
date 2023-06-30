package model;

import lombok.Data;

import java.util.Arrays;
import java.util.List;

@Data
public class DishModel {
    protected String img;
    protected String name;
    protected String description;
    protected String recommendations;
    protected boolean hasMeat;
    protected String byCourse;
    protected List<Ingredient> ingredients;

    public DishModel(){}
    public DishModel(String img, String name, String description, String recommendations, boolean hasMeat, String byCourse, List<Ingredient> ingredients) {
        this.img = img;
        this.name = name;
        this.description = description;
        this.recommendations = recommendations;
        this.hasMeat = hasMeat;
        this.byCourse = byCourse;
        this.ingredients = ingredients;
    }

    @Override
    public String toString() {
        return "DishModel{" +
                "img='" + img + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", recommendations='" + recommendations + '\'' +
                ", hasMeat=" + hasMeat +
                ", byCourse='" + byCourse + '\'' +
                ", ingredients=" + ingredients.toString() +
                '}';
    }
}
