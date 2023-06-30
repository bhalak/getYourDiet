import React, {ChangeEventHandler} from "react";
import productRadiosClasses from "./ProductRadios.module.css"
import { RadioButton } from "../../../../../../common/radios/RadioButton";

export const ProductRadios: React.FC<{
  individually: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = (props) => {
  return (
    <div className={productRadiosClasses["product-radios"]}>
      <RadioButton onChange={props.onChange} name="individually" label="Weight" id="weight" isChecked={!props.individually} />
      <RadioButton onChange={props.onChange} name="individually" label="Quantity" id="quantity" isChecked={props.individually} />
    </div>
  );
};
