import React, { useState } from "react";
import productListStyles from "./ProductList.module.css";
import { ProductModel } from "../../../utils/models/ProductModel";
import { ProductItem } from "./ProductItem";
import { NewProductItem } from "./new-product/NewProductItem";
import { Filters } from "../../../utils/enums/filters";
import { ProductModal } from "./new-product/modal/ProductModal";
import { GlobalVariables } from "../../../utils/data-sets/GlobalVariables";

export const ProductList: React.FC<{
  onAddProduct: Function;
  onEditProduct: Function;
  onDeleteProduct: Function;
  productList: ProductModel[];
  selectedFilter: Filters;
}> = (props) => {
  const [isProductModalShown, setIsProductModalShown] = useState(false);
  const [addProductActionFlag, setAddProductActionFlag] = useState(false);
  const emptyProduct: ProductModel = new ProductModel(
    GlobalVariables.JUNK_ID,
    "",
    GlobalVariables.defaultPictureSrc,
    false
  );
  const [selectedProduct, setSelectedProduct] =
    useState<ProductModel>(emptyProduct);
  let filteredProductList: ProductModel[];

  if (props.selectedFilter === Filters.AllProducts) {
    filteredProductList = props.productList;
  } else if (props.selectedFilter === Filters.Fresh) {
    filteredProductList = props.productList.filter(
      (product) => !product.isExpired && !product.expiresSoon
    );
  } else if (props.selectedFilter === Filters.ToBeSpoiled) {
    filteredProductList = props.productList.filter(
      (product) => product.expiresSoon
    );
  } else {
    filteredProductList = props.productList.filter(
      (product) => product.isExpired
    );
  }

  const addItemClickHandler = () => {
    setIsProductModalShown(true);
    setAddProductActionFlag(true);
  };

  const itemClickHandler = (selectedProductId: number) => {
    setIsProductModalShown(true);
    setAddProductActionFlag(false);

    const product: ProductModel = props.productList.find(
      (product) => product.id === selectedProductId
    )!;
    setSelectedProduct(product);
  };

  const closeModalHandler = () => {
    setIsProductModalShown(false);
  };

  const deleteProductHandler = (productId: number) => {
    props.onDeleteProduct(productId);
    setIsProductModalShown(false);
  };
  const editProductHandler = (newProduct: ProductModel) => {
    props.onEditProduct(newProduct);
    setIsProductModalShown(false);
  };
  const addProductHandler = (newProduct: ProductModel) => {
    props.onAddProduct(newProduct);
    setIsProductModalShown(false);
  };

  return (
    <>
      {isProductModalShown && (
        <ProductModal
          onCloseModal={closeModalHandler}
          addProductActionFlag={addProductActionFlag}
          onAddProduct={addProductHandler}
          onDeleteProduct={deleteProductHandler}
          onEditProduct={editProductHandler}
          selectedProduct={
            addProductActionFlag ? emptyProduct : selectedProduct
          }
        />
      )}
      <ul className={productListStyles["product-list"]}>
        <NewProductItem onItemClick={addItemClickHandler} />
        {filteredProductList.map((product) => (
          <ProductItem
            onItemClick={itemClickHandler}
            key={product.id}
            product={product}
          />
        ))}
      </ul>
    </>
  );
};
