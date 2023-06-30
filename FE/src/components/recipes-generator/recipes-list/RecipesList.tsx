import React, { useState } from "react";
import recipesListClasses from "./RecipesList.module.css";
import { ByMeatFilters } from "../../../utils/enums/ByMeatFilters";
import {
  ByCourse,
  ByMeatContent,
} from "../ingredients-filters/IngredientsFilters";
import { Ingredient, RecipeModel } from "../../../utils/models/RecipeModel";
import filterCategories from "../../../utils/data-sets/ingredients-filters.json";
import { RecipeItem } from "./RecipeItem";

const filterByMeat = (
  recipes: RecipeModel[],
  filtersByMeat: ByMeatContent[]
): RecipeModel[] => {
  const byMeatContent: ByMeatContent[] = [
    "vegan" as ByMeatContent,
    "meat" as ByMeatContent,
  ];

  if (
    filtersByMeat.length === 0 ||
    byMeatContent.every((filter) => filtersByMeat.includes(filter))
  ) {
    return recipes;
  } else if (filtersByMeat.includes("vegan" as ByMeatContent)) {
    return recipes.filter((recipe) => !recipe.hasMeat);
  } else {
    return recipes.filter((recipe) => recipe.hasMeat);
  }
};

const filterByCourse = (
  recipes: RecipeModel[],
  filtersByCourse: ByCourse[]
): RecipeModel[] => {
  if (filtersByCourse.length === 0) {
    return recipes;
  }

  return recipes.filter((recipe) =>
    filtersByCourse.includes(recipe.courseType as ByCourse)
  );
};

const filterByIngredients = (
  recipes: RecipeModel[],
  selectedIngredients: string[]
): RecipeModel[] => {
  return recipes.filter((recipe) => {
    const recipeIngredients: string[] = recipe.ingredients.map(
      (ingredient) => ingredient.ingredientName
    );
    return selectedIngredients.every((selectedIngredient) =>
      recipeIngredients.includes(selectedIngredient)
    );
  });
};

const getFilteredRecipesList = (
  recipes: RecipeModel[],
  filtersByCourse: ByCourse[],
  selectedIngredients: string[],
  filtersByMeat: ByMeatContent[]
): RecipeModel[] => {
  const filtered1: RecipeModel[] = filterByMeat(recipes, filtersByMeat);
  const filtered2: RecipeModel[] = filterByIngredients(
    filtered1,
    selectedIngredients
  );
  const filtered3: RecipeModel[] = filterByCourse(filtered2, filtersByCourse);
  return filtered3;
};

export const RecipesList: React.FC<{
  recipesList: RecipeModel[];
  selectedIngredients: string[];
  filtersByMeat: ByMeatContent[];
  filtersByCourse: ByCourse[];
}> = (props) => {
  const filteredRecipesList: RecipeModel[] = getFilteredRecipesList(
    props.recipesList,
    props.filtersByCourse,
    props.selectedIngredients,
    props.filtersByMeat
  );
  
  return <>
    {(filteredRecipesList.length === 0) ? <p>There is no recipes with such ingredient</p> :
    filteredRecipesList.map(recipe => <RecipeItem key={recipe.id} recipe={recipe} />)}
  </>;
};
