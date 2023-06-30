import React from "react";
import addNewProductStyles from "./NewProductItem.module.css";
import { PruductWrapper } from "../product-wrapper/ProductWrapper";

export const NewProductItem: React.FC<{ onItemClick: Function }> = (props) => {
  const itemClickHandler = () => {
    props.onItemClick();
  };

  return (
    <li>
      <PruductWrapper
        onItemClick={itemClickHandler}
        className={addNewProductStyles.product}
        isSpoiled={false}
        toBeSpoiled={false}
      >
        <div>
          <img
            alt="Plus icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Circled_plus.svg/800px-Circled_plus.svg.png"
          ></img>
        </div>
      </PruductWrapper>
    </li>
  );
};
