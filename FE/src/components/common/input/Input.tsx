import React, { ChangeEventHandler } from "react";
import inputStyles from "./Input.module.css";

export const Input: React.FC<{
  label: string;
  isValid: boolean;
  type: string;
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  errorMessage: string;
  className?: string;
  isProducNameInput: boolean;
  productNameList?: string[];
}> = (props) => {
  const componentWrapperClasses = [
    props.className,
    inputStyles.control,
    props.isValid === false ? inputStyles.invalid : "",
  ].join(" ");

  return (
    <div className={componentWrapperClasses}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        list={props.id}
        name={props.id}
      />
      {props.isProducNameInput && (
        <datalist id={props.id}>
          {props.productNameList?.map((item, key) => (
            <option key={key} value={item} />
          ))}
        </datalist>
      )}
      <span className={inputStyles["error-message"]}>{(props.isValid) ? " " : props.errorMessage}</span>
    </div>
  );
};
