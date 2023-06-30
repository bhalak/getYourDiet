import React, { useState } from "react";
import filterCategoryClasses from "./FilterCategory.module.css";
import { Checkbox } from "../../../common/checkbox/Checkbox";
import { ByMeatFilters } from "../../../../utils/enums/ByMeatFilters";
import { ByCourse } from "../IngredientsFilters";


export const FilterCategory: React.FC<{
  onChange: Function;
  categoryName: string;
  options: string[];
}> = (props) => {

  const changeHandler = (isChecked: boolean, label: string) => {
    props.onChange(isChecked, label, props.categoryName)
  }

  return (
    <div className={filterCategoryClasses.category}>
      <label>{props.categoryName}:</label>
      {props.options.map((label) => (
        <Checkbox key={label} onChange={changeHandler} label={label} />
      ))}
    </div>
  );
};
