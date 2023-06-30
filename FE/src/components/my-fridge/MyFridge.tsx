import React, { useState, useEffect, useContext } from "react";
import myFridgeStyles from "./MyFridge.module.css";
import { ProductModel } from "../../utils/models/ProductModel";
import { ProductList } from "./products/ProductList";
import { Card } from "../common/card/Card";
import { ProductFilters } from "./filters/ProductFilters";
import { Filters } from "../../utils/enums/filters";
import { SpinnerLoading } from "../common/spinner/SpinnerLoading";
import { RequestApiUtils } from "../../utils/api/RequestApiUtils";
import { AuthContext, AuthContextType } from "../../store/auth-context";

export const MyFridge = () => {
  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState<Filters>(
    Filters.AllProducts
  );
  const [loadProductsFlag, setLoadProductsFlag] = useState(false);

  const authContext: AuthContextType = useContext<AuthContextType>(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const loadedProducts: ProductModel[] =
        await RequestApiUtils.getProductsModels(authContext.userId);

      setProductList(loadedProducts);
      setIsLoading(false);
    };

    fetchProducts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [loadProductsFlag]);

  const filterProductHandler = (selectedFilter: Filters) => {
    setSelectedFilter(selectedFilter);
  };

  const addProductHandler = async (newProduct: ProductModel) => {
    await RequestApiUtils.addUserProductEntity(authContext.userId, newProduct);
    setLoadProductsFlag((prevFlag) => !prevFlag);
  };
  const editProductHandler = async (newProduct: ProductModel) => {
    await RequestApiUtils.updateUserProductEntity(
      authContext.userId,
      newProduct
    );
    setLoadProductsFlag((prevFlag) => !prevFlag);
  };
  const deleteProductHandler = async (productId: number) => {
    await RequestApiUtils.deleteUserProductEntity(productId);
    setLoadProductsFlag((prevFlag) => !prevFlag);
  };

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
    <Card
     className={myFridgeStyles.card}
     >
      <h2 className={myFridgeStyles.title}>My Fridge</h2>
      <ProductFilters onSelectFilter={filterProductHandler} />
      <ProductList
        onAddProduct={addProductHandler}
        onEditProduct={editProductHandler}
        onDeleteProduct={deleteProductHandler}
        selectedFilter={selectedFilter}
        productList={productList}
      />
    </Card>
  );
};
