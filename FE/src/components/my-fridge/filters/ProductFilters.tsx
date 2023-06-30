import React, { useState } from "react";
import productFiltersStyles from "./ProductFilters.module.css";
import { FilterButton } from "./FilterButton";
import { Filters } from "../../../utils/enums/filters";

export const ProductFilters: React.FC<{onSelectFilter: Function}> = (props) => {

  const [isAllProductsSelected, setIsAllProductsSelected] = useState(true);
  const [isFreshSelected, setIsFreshSelected] = useState(false);
  const [isToBeSpoiledSelected, setIsToBeSpoiledSelected] = useState(false);
  const [isSpoiledSelected, setIsSpoiledSelected] = useState(false);
  const [selectedBtnId, setSelectedBtnId] = useState(Filters.AllProducts);
  
  const selectHandler = (btnId: number) => {
    if (btnId === selectedBtnId) {
      return;
    }

    setIsAllProductsSelected(false);
    setIsFreshSelected(false);
    setIsToBeSpoiledSelected(false);
    setIsSpoiledSelected(false);

    if (btnId === Filters.AllProducts) {
      setIsAllProductsSelected(true);
    } else if (btnId === Filters.Fresh) {
      setIsFreshSelected(true);
    } else if (btnId === Filters.ToBeSpoiled) {
      setIsToBeSpoiledSelected(true);
    } else {
      setIsSpoiledSelected(true);
    }

    setSelectedBtnId(btnId);
    props.onSelectFilter(btnId);
  };

  return (
    <ul className={productFiltersStyles["product-filters"]}>
      <FilterButton
        key={Filters.AllProducts}
        id={Filters.AllProducts}
        isSelected={isAllProductsSelected}
        onSelect={selectHandler}
      >
        All Products
      </FilterButton>
      <FilterButton
        key={Filters.Fresh}
        id={Filters.Fresh}
        isSelected={isFreshSelected}
        onSelect={selectHandler}
      >
        Fresh
      </FilterButton>
      <FilterButton
        key={Filters.ToBeSpoiled}
        id={Filters.ToBeSpoiled}
        isSelected={isToBeSpoiledSelected}
        onSelect={selectHandler}
      >
        To Be Spoiled
      </FilterButton>
      <FilterButton
        key={Filters.Spoiled}
        id={Filters.Spoiled}
        isSelected={isSpoiledSelected}
        onSelect={selectHandler}
      >
        Spoiled
      </FilterButton>
    </ul>
  );
};
