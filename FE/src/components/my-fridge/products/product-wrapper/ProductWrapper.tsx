import React, { ReactNode } from "react";
import wrapperStyles from "./ProductWrapper.module.css";

export const PruductWrapper: React.FC<{
  children: ReactNode;
  isSpoiled: boolean;
  toBeSpoiled: boolean;
  className: string;
  onItemClick: Function;
}> = (props) => {
  const classes =
    props.className +
    " " +
    wrapperStyles.wrapper +
    " " +
    getBorderColorClass(props.toBeSpoiled, props.isSpoiled);

  const clickHandler = () => {
    props.onItemClick();
  };

  return (
    <div onClick={clickHandler} className={classes}>
      {props.children}
    </div>
  );
};

const getBorderColorClass = (toBeSpoiled: boolean, isSpoiled: boolean): string => {
  let borderColorClass: string = "";

  if (isSpoiled) {
    borderColorClass = wrapperStyles.spoiled;
  } else if (toBeSpoiled) {
    borderColorClass = wrapperStyles["to-be-spoiled"];
  }

  return borderColorClass;
};
