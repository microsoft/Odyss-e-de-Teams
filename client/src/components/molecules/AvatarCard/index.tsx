import React from "react";
import { Button } from "react-bootstrap";

import { IAvatarCard } from "./AvatarCard.model";


import "./style.scss";

const AvatarCard = (props: IAvatarCard) => {
  const {
    title,
    image,
    description,
    onClickActionText,
    className,
    onClickAvatarAction,
    id,
    selected,
  } = props;

  return (
    <div
      className={`AvatarCard text-center px-4 ${className} ${
        selected ? "AvatarCard--selected" : ""
      }`}
    >
      <div className="AvatarCard__title">{title}</div>
      <div className="AvatarCard__container mx-auto">
        <div className="AvatarCard__container__image">
          <img src={image} alt={title} />
        </div>
      </div>

      <div className="AvatarCard__description mt-1">{description}</div>

      <div className="AvatarCard__actions mt-2">
        <Button
          variant="light"
          onClick={onClickAvatarAction.bind(this, id)}
        >
          {onClickActionText}
        </Button>
      </div>
    </div>
  );
};

const AvatarCardMobile = (props: IAvatarCard) => {
  const {
    title,
    image,
    description,
    className,
    onClickAvatarAction,
    id,
    selected,
  } = props;

  return (
    <div
      className={`AvatarCard ${className} ${
        selected ? "AvatarCard--selected" : ""
      }`}
      onClick={onClickAvatarAction.bind(this, id)}
    >
      <div className="AvatarCard__container">
        <div className="AvatarCard__container__image">
          <img src={image} alt={title} />
        </div>
      </div>
      <div className="AvatarCard__body">
        <div className="AvatarCard__body__title">{title}</div>
        <div className="AvatarCard__body__description">{description}</div>
      </div>
    </div>
  );
};

export { AvatarCard, AvatarCardMobile };
