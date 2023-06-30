import React, { useEffect, useState } from "react";
import ingredientsFilterClasses from "./IngredientsFilters.module.css";
import filterCategories from "../../../utils/data-sets/ingredients-filters.json";
import { FilterCategory } from "./filter-category/FilterCategory";

export type Categories = keyof typeof filterCategories.categories;
export type ByCourse = keyof typeof filterCategories.categories.byCourse;
export type ByMeatContent = keyof typeof filterCategories.categories.byMeatContent

export const IngredientsFilters: React.FC<{ onSelectFilter: Function }> = (props) => {
  const [filtersByMeat, setFiltersByMeat] = useState<ByMeatContent[]>([]);
  const [filtersByCourse, setFiltersByCourse] = useState<ByCourse[]>([]);

  const categories: Categories[] = Object.keys(
    filterCategories.categories
  ) as Categories[];

  useEffect(() => {
    props.onSelectFilter(filtersByMeat, filtersByCourse);
  }, [filtersByMeat, filtersByCourse])

  const selectFilterHandler = (isChecked: boolean, label: ByCourse | ByMeatContent, categoryName: string) => {
    if (categoryName === filterCategories.categories.byCourse.name) {
      setFiltersByCourse(prevFilters => {
        return (isChecked) ? [...prevFilters, label] : prevFilters.filter(prevFilter => prevFilter !== label);
      })
    } else {
      setFiltersByMeat(prevFilters => {
        return (isChecked) ? [...prevFilters, label] : prevFilters.filter(prevFilter => prevFilter !== label);
      })
    } 
  }

  return (
    <div className={ingredientsFilterClasses.wrapper}>
      {categories.map((category) => (
        <FilterCategory
          onChange={selectFilterHandler}
          key={filterCategories.categories[category].name}
          categoryName={filterCategories.categories[category].name}
          options={filterCategories.categories[category].options}
        />
      ))}
    </div>
  );
};
