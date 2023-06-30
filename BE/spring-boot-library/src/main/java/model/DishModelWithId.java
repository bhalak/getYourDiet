package model;

import java.util.List;

public class DishModelWithId extends DishModel {
    public int id;

    public DishModelWithId(int id, String img, String name, String description, String recommendations,
                           boolean hasMeat, String byCourse, List<Ingredient> ingredients) {
        super(img, name, description, recommendations, hasMeat, byCourse, ingredients);
        this.id = id;
    }

    // Getters and setters for the `id` field

    @Override
    public String toString() {
        return "DishModelWithId{" +
                "id=" + id +
                ", img='" + img + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", recommendations='" + recommendations + '\'' +
                ", hasMeat=" + hasMeat +
                ", byCourse='" + byCourse + '\'' +
                ", ingredients=" + ingredients +
                '}';
    }
}
