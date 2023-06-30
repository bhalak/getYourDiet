import React, {ChangeEventHandler} from "react";
import radioClasses from "./RadioButton.module.css";

export const RadioButton: React.FC<{
  label: string;
  id: string;
  isChecked: boolean;
  name: string;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>
}> = (props) => {
  const classes: string = [props.className, "form-check", radioClasses.radio].join(" ");
  return (
    <div className={classes}>
      <input
        onChange={props.onChange}
        className="form-check-input"
        type="radio"
        name={props.name}
        id={props.id}
        checked={props.isChecked}
      />
      <label className="form-check-label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
};
