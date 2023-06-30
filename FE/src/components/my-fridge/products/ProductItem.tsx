import React, { useState } from "react";
import productStyles from "./ProductItem.module.css";
import { ProductModel } from "../../../utils/models/ProductModel";
import { PruductWrapper } from "./product-wrapper/ProductWrapper";

export const ProductItem: React.FC<{
  product: ProductModel;
  onItemClick: Function;
}> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const itemClickHandler = () => {
    props.onItemClick(props.product.id);
  };

  const imgLoadHandler = () => {
    setIsLoaded(true);
  };

  return (
    <li>
      <PruductWrapper
        onItemClick={itemClickHandler}
        className={productStyles.product}
        toBeSpoiled={props.product.expiresSoon}
        isSpoiled={props.product.isExpired}
      >
        <div className={!isLoaded ? productStyles["img-loader"] : ""}>
          {isLoaded || <div />}
          <img
            src={props.product.imgSrc}
            alt="Product"
            onLoad={imgLoadHandler}
          ></img>
        </div>
        <div className={productStyles["product-description"]}>
          <p className="product-name">{props.product.name}</p>
          {props.product.shouldShowDate && (
            <p className="expiration-date">
              <span>Expiration date:</span>
              {`${props.product.expirationDateStr}`}
            </p>
          )}
        </div>
      </PruductWrapper>
    </li>
  );
};
