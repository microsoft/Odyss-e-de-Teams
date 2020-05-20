import React from "react";

import { withTranslation } from "react-i18next";

import Button from "components/atoms/Button/Button";
import AvatarCard from "components/molecules/AvatarCard";

import "./style.scss";

const Avatars = (props) => {
  console.log("props", props);
  const { t, onSelectAvatar, avatars, onClickNext } = props;

  const onSelect = (id, event) => {
    event.preventDefault();
    onSelectAvatar(id);
  };
  return (
    <div className="Avatars">
      <div className="Avatars__title">{t("landing.Avatars.title")}</div>
      <div className="Avatars__subtitle">{t("landing.Avatars.subtitle")}</div>
      <div className="Avatars__body">
        <div className="Avatars__body__title">
          {t("landing.Avatars.body.title")}
        </div>

        <div className="Avatars__body__subtitle">
          {t("landing.Avatars.body.description")}
        </div>

        <div className="Avatars__body__list">
          {avatars.map((avatar, index) => (
            <AvatarCard
              className="Avatars__body__list"
              key={index}
              id={avatar.id_avatar}
              title={avatar.nom}
              description={avatar.description}
              image={`/images/avatar/${avatar.image}`}
              onClickActionText={t("landing.Avatars.body.selectAvatar")}
              selected={avatar.selected}
              onClickAvatarAction={onSelect}
            />
          ))}
        </div>

        <div className="Avatars__actions">
          <Button
            text={t("landing.Avatars.buttonText")}
            className="Button__white col-3"
            onClickAction={onClickNext}
          />
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Avatars);
