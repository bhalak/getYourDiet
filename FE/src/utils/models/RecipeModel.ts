export class Ingredient {
  ingredientName: string;
  weight: number;
  quantity: number;

  constructor(ingredientName: string, weight: number, quantity: number) {
    this.ingredientName = ingredientName;
    this.weight = weight;
    this.quantity = quantity;
  }
}

export class RecipeModel {
  id: number;
  img: string;
  name: string;
  description: string;
  recommendations: string;
  hasMeat: boolean;
  courseType: string;
  ingredients: Ingredient[];

  constructor(
    id: number,
    img: string,
    name: string,
    description: string,
    recommendations: string,
    hasMeat: boolean,
    byCourse: string,
    ingredients: Ingredient[]
  ) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.description = description;
    this.recommendations = recommendations;
    this.hasMeat = hasMeat;
    this.courseType = byCourse;
    this.ingredients = ingredients;
  }
}
