import React, { useState } from "react";
import recipeItemClasses from "./RecipeItem.module.css";
import { RecipeModel } from "../../../utils/models/RecipeModel";
import { RecipeModal } from "./recipe-modal/RecipeModal";

export const RecipeItem: React.FC<{
  recipe: RecipeModel;
}> = (props) => {
  const [isRecipeModalShown, setIsRecipeModalShown] = useState(false);

  const downloadIngredientsListHandler = () => {
    const ingredinetsList: string = props.recipe.ingredients
      .map((ingredient) => `${ingredient.ingredientName} — weight:${ingredient.weight}g or quantity:${ingredient.quantity}`)
      .join("\n");

    const blob = new Blob([ingredinetsList], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${props.recipe.name}.txt`;
    link.href = url;
    link.click();
  };

  const showMoreClickHandler = () => {
    setIsRecipeModalShown(true);
  };

  const closeModalHandler = () => {
    setIsRecipeModalShown(false);
  };

  return (
    <>
      <div className={recipeItemClasses.recipe}>
        <div className={recipeItemClasses["img-wrapper"]}>
          <img src={props.recipe.img}></img>
        </div>
        <div className={recipeItemClasses["recipe__info"]}>
          <p className={recipeItemClasses["recipe__info-title"]}>
            {props.recipe.name}
          </p>
          <p className={recipeItemClasses["recipe__info-description"]}>
            {props.recipe.description}
          </p>
          <button
            onClick={showMoreClickHandler}
            className={recipeItemClasses["recipe__info-show"]}
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Show more
          </button>
          <button
            type="button"
            onClick={downloadIngredientsListHandler}
            className={recipeItemClasses["recipe__info-download"]}
          >
            Download ingredients
          </button>
          <RecipeModal
            onClose={closeModalHandler}
            onDownloadIngredients={downloadIngredientsListHandler}
            recipe={props.recipe}
          />
        </div>
      </div>
    </>
  );
};
