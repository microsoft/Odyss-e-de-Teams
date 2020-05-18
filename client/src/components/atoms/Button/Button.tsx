import React from 'react';

import IButton from './Button.model';
import './Button.scss';



const Button = (props: IButton) => {
  const { text, onClickAction, className } = props;

  return (
    <div className={`Button ${className}`} onClick={onClickAction}>
      {text}   
    </div>
  )
}

export default Button;