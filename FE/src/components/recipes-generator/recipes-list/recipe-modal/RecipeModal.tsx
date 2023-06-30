import React, { MouseEventHandler } from "react";
import recipeModalClasses from "./RecipeModal.module.css";
import { Backdrop } from "../../../common/backdrop/Backdrop";
import { RecipeModel } from "../../../../utils/models/RecipeModel";

export const RecipeModal: React.FC<{
  recipe: RecipeModel;
  onClose: MouseEventHandler;
  onDownloadIngredients: MouseEventHandler;
}> = (props) => {
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        onClick={props.onClose}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className={recipeModalClasses.header + " modal-header"}>
              <h2>Recipe Info</h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className={recipeModalClasses["img-wrapper"]}>
                <img src={props.recipe.img} alt="Recipe img" />
              </div>
              <h3 className={recipeModalClasses["recipe-name"]}>{props.recipe.name}</h3>
              <p>{props.recipe.description}</p>
              <p>{props.recipe.recommendations}</p>
              <ul>
                {props.recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.ingredientName}>
                    {ingredient.ingredientName}{" — "}
                    <em>
                      weight:{ingredient.weight}g or quantity:
                      {ingredient.quantity}
                    </em>
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={props.onDownloadIngredients}
                type="button"
                className="btn btn-primary"
              >
                Download ingredients
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
