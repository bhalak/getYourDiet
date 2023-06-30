import React, { useEffect, useState } from "react";
import checkboxClasses from "./Checkbox.module.css";

export const Checkbox: React.FC<{
  label: string;
  onChange: Function;
}> = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    props.onChange(isChecked, props.label);
  }, [isChecked]);

  const changeHandler = () => {
    setIsChecked(prevState => !prevState);
  }

  return (
    <div className={checkboxClasses.checkbox + " form-check"}>
      <input
        onChange={changeHandler}
        className="form-check-input"
        type="checkbox"
        value=""
        id={props.label}
      />
      <label className="form-check-label" htmlFor={props.label}>
        {props.label}
      </label>
    </div>
  );
};
