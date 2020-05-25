import React from "react";

import { IAvatarCard } from "./AvatarCard.model";

import Button from "components/atoms/Button/Button";

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
      className={`AvatarCard ${className} ${
        selected ? "AvatarCard--selected" : ""
      }`}
    >
      <div className="AvatarCard__title">{title}</div>
      <div className="AvatarCard__container">
        <div className="AvatarCard__container__image">
          <img src={image} alt={title} />
        </div>
      </div>

      <div className="AvatarCard__description">{description}</div>

      <div className="AvatarCard__actions">
        <Button
          className="Button__white"
          text={onClickActionText}
          onClickAction={onClickAvatarAction.bind(this, id)}
        />
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
