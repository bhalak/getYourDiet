import React, { MouseEventHandler } from "react";
import backdropClasses from "./Backdrop.module.css";

export const Backdrop: React.FC<{
  onClick: MouseEventHandler<HTMLDivElement>;
}> = (props) => {
  return <div className={backdropClasses.backdrop} onClick={props.onClick} />;
};
