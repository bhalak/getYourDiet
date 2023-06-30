import React, { ReactNode } from "react";
import filterButtonStyles from "./FilterButton.module.css";

export const FilterButton: React.FC<{
  children: ReactNode;
  onSelect: Function;
  id: number;
  isSelected: boolean;
}> = (props) => {
  const classes: string = `${filterButtonStyles.button} ${
    props.isSelected ? filterButtonStyles.selected : ""
  }`;

  const clickHandler = () => {
    props.onSelect(props.id);
  };

  return (
    <li>
      <button className={classes} type="button" onClick={clickHandler}>
        {props.children}
      </button>
    </li>
  );
};
