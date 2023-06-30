package model;

import lombok.Data;

@Data
public class Ingredient {
    private String ingredientName;
    private float weight;
    private int quantity;

    public Ingredient(){}
    public Ingredient(String ingredientName, float weight, int quantity) {
        this.ingredientName = ingredientName;
        this.weight = weight;
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Ingredient{" +
                "ingredientName='" + ingredientName + '\'' +
                ", weight=" + weight +
                ", quantity=" + quantity +
                '}';
    }
}
