import React, { MouseEventHandler, ReactNode } from "react";
import buttonStyles from "./Button.module.css";

const Button: React.FC<{
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
}> = (props) => {
  const classes: string = ["btn btn-primary btn-rounded", buttonStyles.button, props.className].join(" "); 

  return (
    <button
      className={classes}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
