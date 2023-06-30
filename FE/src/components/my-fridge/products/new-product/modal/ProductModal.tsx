import React, { MouseEventHandler, useEffect, useState } from "react";
import productModalStyles from "./ProductModal.module.css";
import { ProductModalOverlay } from "./modal-overlay/ProductModalOverlay";
import { RequestApiUtils } from "../../../../../utils/api/RequestApiUtils";
import { ProductEntity } from "../../../../../utils/entities/ProductEntity";
import { ProductModel } from "../../../../../utils/models/ProductModel";
import { Backdrop } from "../../../../common/backdrop/Backdrop";



export const ProductModal: React.FC<{
  onCloseModal: Function;
  addProductActionFlag: boolean;
  selectedProduct: ProductModel;
  onAddProduct: Function;
  onDeleteProduct: Function;
  onEditProduct: Function;
}> = (props) => {
  const [productEntityList, setProductEntityList] = useState<ProductEntity[]>(
    []
  );

  const closeModanHandler = () => {
    props.onCloseModal();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const loadedProducts: ProductEntity[] =
        await RequestApiUtils.getProductsEntities();
      setProductEntityList(loadedProducts);
    };

    fetchProducts().catch((error: any) => {});
  }, []);

  const deleteProductHandler = (productId: number) => {
    props.onDeleteProduct(productId);
  };
  const editProductHandler = (newProduct: ProductModel) => {
    props.onEditProduct(newProduct);
  };
  const addProductHandler = (newProduct: ProductModel) => {
    props.onAddProduct(newProduct);
  };

  return (
    <>
      <Backdrop onClick={closeModanHandler} />
      <ProductModalOverlay
        onCloseModal={closeModanHandler}
        addProductActionFlag={props.addProductActionFlag}
        onAddProduct={addProductHandler}
        onDeleteProduct={deleteProductHandler}
        onEditProduct={editProductHandler}
        selectedProduct={props.selectedProduct}
        productEntityList={productEntityList}
      />
    </>
  );
};
