import React, {
  FormEvent,
  useState,
  useEffect,
  MouseEventHandler,
} from "react";
import modalOverlayStyles from "./ProductModalOverlay.module.css";
import { Input } from "../../../../../common/input/Input";
import {
  ProductActionFag,
  ProductAtionFlags,
} from "../../../../../../utils/enums/product-action-flag";
import Button from "../../../../../common/button/Button";
import { ImageInput } from "./image-input/ImageInput";
import { ProductModel } from "../../../../../../utils/models/ProductModel";
import { GlobalVariables } from "../../../../../../utils/data-sets/GlobalVariables";
import { ProductEntity } from "../../../../../../utils/entities/ProductEntity";
import { Validator } from "../../../../../../utils/validator/Validator";
import { ProductRadios } from "./product-radios/ProductRadios";

export const ProductModalOverlay: React.FC<{
  onCloseModal: MouseEventHandler;
  productEntityList: ProductEntity[];
  addProductActionFlag: boolean;
  onAddProduct: Function;
  onDeleteProduct: Function;
  onEditProduct: Function;
  selectedProduct: ProductModel;
}> = (props) => {
  const [individually, setIndividually] = useState(
    props.selectedProduct.individually
  );
  const [imgSrc, setImgSrc] = useState(props.selectedProduct.imgSrc);
  let productActionFlag: ProductActionFag | undefined;
  const [isFormValid, setIsFormValid] = useState(!props.addProductActionFlag);
  const [productNameField, setProductNameField] = useState({
    value: props.selectedProduct.name,
    isValid: true,
  });
  const [productWeightField, setProductWeightField] = useState<{
    value: string;
    isValid: boolean;
  }>({
    value: props.selectedProduct.weight
      ? props.selectedProduct.weight.toString()
      : "",
    isValid: true,
  });
  const [productQuantityField, setProductQuantityField] = useState<{
    value: string;
    isValid: boolean;
  }>({
    value: props.selectedProduct.quantity
      ? props.selectedProduct.quantity.toString()
      : "",
    isValid: true,
  });
  const [expirationDateField, setExpiratinDateField] = useState({
    value: props.selectedProduct.expirationDateStr,
    isValid: true,
  });

  const imgChangeHandler = (imgSrc: string) => {
    setImgSrc(imgSrc);
  };

  const productNameChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const currentValue: string = (event.target as HTMLInputElement).value;

    const existentProductEntity: ProductEntity | undefined =
      props.productEntityList.find((product) => product.name === currentValue);
    if (existentProductEntity) {
      setImgSrc(existentProductEntity.img!);
    } else {
      setImgSrc(GlobalVariables.defaultPictureSrc);
    }

    setProductNameField({
      value: currentValue,
      isValid: Validator.isValidName(currentValue),
    });
  };

  const productRadioChangeHandler = () => {
    setIndividually((prevState) => !prevState);
  };

  const productWeightChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const currentValue: string = (event.target as HTMLInputElement).value;
    setProductWeightField({
      value: currentValue,
      isValid: Validator.isValidWeight(currentValue),
    });
  };

  const productQuantityChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const currentValue: string = (event.target as HTMLInputElement).value;
    setProductQuantityField({
      value: currentValue,
      isValid: Validator.isValidQuantity(currentValue),
    });
  };

  const expirationDateChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const currentValue: string = (event.target as HTMLInputElement).value;
    setExpiratinDateField({
      value: currentValue,
      isValid: Validator.isValidExpirationDate(currentValue),
    });
  };

  useEffect(() => {
    const quantityOrWeightValidity: boolean = individually
      ? productQuantityField.isValid
      : productWeightField.isValid;

    setIsFormValid(
      productNameField.isValid &&
        quantityOrWeightValidity &&
        expirationDateField.isValid
    );
  }, [
    productNameField,
    productWeightField.isValid,
    productQuantityField.isValid,
    expirationDateField.isValid,
    individually,
  ]);

  const deleteBtnClickHandler = () => {
    productActionFlag = ProductAtionFlags.Delete;
    executeActionOnProduct();
  };

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) {
      productActionFlag = props.addProductActionFlag
        ? ProductAtionFlags.Add
        : ProductAtionFlags.Edit;

      executeActionOnProduct();
    }
  };

  const executeActionOnProduct = () => {
    if (productActionFlag === ProductAtionFlags.Add) {
      const newProduct: ProductModel = new ProductModel(
        GlobalVariables.JUNK_ID,
        productNameField.value,
        imgSrc,
        individually,
        expirationDateField.value,
        individually ? props.selectedProduct.weight : +productWeightField.value,
        individually
          ? +productQuantityField.value
          : props.selectedProduct.quantity
      );
      props.onAddProduct(newProduct);
    } else if (productActionFlag === ProductAtionFlags.Edit) {
      const newProduct: ProductModel = new ProductModel(
        props.selectedProduct.id,
        productNameField.value,
        imgSrc,
        individually,
        expirationDateField.value,
        individually ? props.selectedProduct.weight : +productWeightField.value,
        individually
          ? +productQuantityField.value
          : props.selectedProduct.quantity
      );
      props.onEditProduct(newProduct);
    } else if (productActionFlag === ProductAtionFlags.Delete) {
      props.onDeleteProduct(props.selectedProduct.id);
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={modalOverlayStyles.modal}>
        <header className={modalOverlayStyles.header}>
          <h2>{(props.addProductActionFlag ? "Add" : "Edit") + " product"}</h2>
          <button
            onClick={props.onCloseModal}
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </header>
        <div className={modalOverlayStyles.content}>
          <div className={modalOverlayStyles["inputs-except-img-wrapper"]}>
            <Input
              label="Name"
              isValid={productNameField.isValid}
              type="search"
              id="product-name"
              value={productNameField.value}
              onChange={productNameChangeHandler}
              errorMessage="Incorrect name"
              isProducNameInput={true}
              productNameList={props.productEntityList.map(
                (product) => product.name
              )}
            />
            <ProductRadios
              onChange={productRadioChangeHandler}
              individually={individually}
            />
            {individually ? (
              <Input
                label="Quantity"
                isValid={productQuantityField.isValid}
                type="number"
                id="product-quantity"
                value={productQuantityField.value}
                onChange={productQuantityChangeHandler}
                errorMessage="Quantity should be an integer > 0 & < 2^8"
                isProducNameInput={false}
              />
            ) : (
              <Input
                label="Weight"
                isValid={productWeightField.isValid}
                type="number"
                id="product-weight"
                value={productWeightField.value}
                onChange={productWeightChangeHandler}
                errorMessage="Weight should be a number > 0 & < 2^8"
                isProducNameInput={false}
              />
            )}
            <Input
              label="Expiration Date"
              isValid={expirationDateField.isValid}
              type="date"
              id="expiration-date"
              value={expirationDateField.value}
              onChange={expirationDateChangeHandler}
              errorMessage="Incorrect date"
              isProducNameInput={false}
            />
          </div>
          <ImageInput imgSrc={imgSrc} onImageUpdate={imgChangeHandler} />
        </div>
        <footer className={modalOverlayStyles.actions}>
          <Button type="submit">Submit</Button>
          {!props.addProductActionFlag && (
            <Button
              onClick={deleteBtnClickHandler}
              className={modalOverlayStyles["delete-button"]}
            >
              Delete
            </Button>
          )}
        </footer>
      </div>
    </form>
  );
};
