import React from "react";

import "./style.scss";

export interface ITitleProps {
  title: string;
  className?: string;
}

const Title = (props: ITitleProps) => {
  const { title } = props;

  return <div className={`Title ${props.className}`}>{title}</div>;
};

export default Title;
