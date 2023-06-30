import { useEffect, useState } from "react";
import { Card } from "../common/card/Card";
import {
  ByMeatContent,
  Categories,
  IngredientsFilters,
} from "./ingredients-filters/IngredientsFilters";
import { IngredientsForm } from "./ingredients-form/IngredientsForm";
import recipesGeneratorClasses from "./RecipesGenerator.module.css";
import { RequestApiUtils } from "../../utils/api/RequestApiUtils";
import { RecipeModel } from "../../utils/models/RecipeModel";
import { ByMeatFilters } from "../../utils/enums/ByMeatFilters";
import { ByCourse } from "./ingredients-filters/IngredientsFilters";
import { RecipesList } from "./recipes-list/RecipesList";
import { SpinnerLoading } from "../common/spinner/SpinnerLoading";

export const RecipesGenerator = () => {
  const [recipesList, setRecipesList] = useState<RecipeModel[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [filtersByMeat, setFiltersByMeat] = useState<ByMeatContent[]>([]);
  const [filtersByCourse, setFiltersByCourse] = useState<ByCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  // const clickHandler = async () => {
  //   await RequestApiUtils.addRecipesFromDataSets();
  // }

  const ingredinetsFormGenerateHandler = (ingredients: string[]) => {
    setSelectedIngredients(ingredients);
  };

  const selectFilterHandler = (
    filtersByMeat: ByMeatContent[],
    filtersByCourse: ByCourse[]
  ) => {
    setFiltersByMeat(filtersByMeat);
    setFiltersByCourse(filtersByCourse);
  };

  useEffect(() => {
    const getRecipes = async () => {
      const loadedRecipes: RecipeModel[] =
        await RequestApiUtils.getRecipesModels();
      setRecipesList(loadedRecipes);
      setIsLoading(false);
    };

    getRecipes().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <Card className={recipesGeneratorClasses["recipes-generator"]}>
      <div className={recipesGeneratorClasses["ingredients-and-filters"]}>
        <IngredientsForm onGenerate={ingredinetsFormGenerateHandler} />
        <IngredientsFilters onSelectFilter={selectFilterHandler} />
      </div>
      <div className={recipesGeneratorClasses["title-and-list"]}>
        <h2 className={recipesGeneratorClasses.title}>Recipes Generator</h2>
        <RecipesList
          recipesList={recipesList}
          selectedIngredients={selectedIngredients}
          filtersByCourse={filtersByCourse}
          filtersByMeat={filtersByMeat}
        />
      </div>
    </Card>
  );
};
