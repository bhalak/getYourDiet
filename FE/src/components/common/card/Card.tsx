import React, { ReactNode } from "react";
import cardStyles from "./Card.module.css";

export const Card: React.FC<{ children: ReactNode; className?: string }> = (
  props
) => {
  const classes: string = props.className + " " + cardStyles.card;
  return <div className={classes}>{props.children}</div>;
};
