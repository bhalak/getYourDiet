import React, { useState, useEffect, FormEvent } from "react";
import ingredientFormClasses from "./IngredientsForm.module.css";
import { Input } from "../../common/input/Input";
import Button from "../../common/button/Button";
import { RequestApiUtils } from "../../../utils/api/RequestApiUtils";
import { Validator } from "../../../utils/validator/Validator";

type IngredientField = {
  value: string;
  isValid: boolean;
};

export const IngredientsForm: React.FC<{ onGenerate: Function }> = (props) => {
  const [ingredientField1, setIngredientField1] = useState({
    value: "",
    isValid: true,
  });
  const [ingredientField2, setIngredientField2] = useState({
    value: "",
    isValid: true,
  });
  const [ingredientField3, setIngredientField3] = useState({
    value: "",
    isValid: true,
  });
  const [areAllFieldsEmpty, setAreAllFieldsEmpty] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [ingredientsNameList, setIngredientsNameList] = useState<string[]>([]);

  useEffect(() => {
    const getIngredientsNameList = async () => {
      const loadedIngredientsNameList: string[] =
        await RequestApiUtils.getAllProductNames();
      setIngredientsNameList(loadedIngredientsNameList);
    };

    getIngredientsNameList();
  }, []);

  useEffect(() => {
    const ingredientFields: IngredientField[] = [ingredientField1, ingredientField2, ingredientField3];
    const areAllValid = ingredientFields.every(field => field.isValid);
    const everyHasEmptyValue = ingredientFields.every(field => field.value === "");
  
    setAreAllFieldsEmpty(everyHasEmptyValue);
    setIsFormValid(areAllValid && !everyHasEmptyValue);
  }, [ingredientField1, ingredientField2, ingredientField3]);

  useEffect(() =>{
    setAreAllFieldsEmpty(false);
  }, [])

  const ingredientField1ChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const currentValue: string = (event.target as HTMLInputElement).value;
    setIngredientField1({
      value: currentValue,
      isValid: Validator.isValidIngredient(currentValue),
    });
  };

  const ingredientField2ChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const currentValue: string = (event.target as HTMLInputElement).value;
    setIngredientField2({
      value: currentValue,
      isValid: Validator.isValidIngredient(currentValue),
    });
  };

  const ingredientField3ChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const currentValue: string = (event.target as HTMLInputElement).value;
    setIngredientField3({
      value: currentValue,
      isValid: Validator.isValidIngredient(currentValue),
    });
  };

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) {
      const selectedIngredients: string[] = 
        [ingredientField1.value, ingredientField2.value, ingredientField3.value]
        .filter(ingredient => ingredient !== "");
        
      props.onGenerate(selectedIngredients);
    } else {
      const ingredientFields: IngredientField[] = [ingredientField1, ingredientField2, ingredientField3];
      const everyHasEmptyValue = ingredientFields.every(field => field.value === ""); 
      setAreAllFieldsEmpty(everyHasEmptyValue);
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className={ingredientFormClasses.form}>
      <Input
        className={ingredientFormClasses.input}
        label="1 ingredient"
        isValid={!areAllFieldsEmpty && ingredientField1.isValid}
        type="search"
        id="product-name"
        value={ingredientField1.value}
        onChange={ingredientField1ChangeHandler}
        errorMessage={!areAllFieldsEmpty ? "Incorrect ingredient" : "Enter at least one ingredient"}
        isProducNameInput={true}
        productNameList={ingredientsNameList}
      />
      <Input
        label="2 ingredient"
        isValid={!areAllFieldsEmpty && ingredientField2.isValid}
        type="search"
        id="product-name"
        value={ingredientField2.value}
        onChange={ingredientField2ChangeHandler}
        errorMessage={!areAllFieldsEmpty ? "Incorrect ingredient" : "Enter at least one ingredient"}
        isProducNameInput={true}
        productNameList={ingredientsNameList}
      />
      <Input
        label="3 ingredient"
        isValid={!areAllFieldsEmpty && ingredientField3.isValid}
        type="search"
        id="product-name"
        value={ingredientField3.value}
        onChange={ingredientField3ChangeHandler}
        errorMessage={!areAllFieldsEmpty ? "Incorrect ingredient" : "Enter at least one ingredient"}
        isProducNameInput={true}
        productNameList={ingredientsNameList}
      />
      <div className={ingredientFormClasses.action}>
      <Button type="submit">
        Generate
      </Button>
      </div>
    </form>
  );
};
