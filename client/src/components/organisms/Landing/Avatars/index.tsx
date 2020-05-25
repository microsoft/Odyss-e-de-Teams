import React from "react";

import { withTranslation } from "react-i18next";

import Button from "components/atoms/Button/Button";
import { AvatarCard, AvatarCardMobile } from "components/molecules/AvatarCard";

import "./style.scss";

const Avatars = (props) => {
  console.log("props", props);
  const { t, onSelectAvatar, avatars, onClickNext } = props;

  const isMobile = window.innerWidth < 768;

  const onSelect = (id, event) => {
    event.preventDefault();
    onSelectAvatar(id);
  };

  const avatarsRender = avatars.map((avatar, index) =>
    !isMobile ? (
      <AvatarCard
        className="Avatars__body__list__item col-12 col-sm-2 m-1 justify-content-center"
        key={index}
        id={avatar.id_avatar}
        title={avatar.nom}
        description={avatar.description}
        image={`/images/avatar/${avatar.image}`}
        onClickActionText={t("landing.Avatars.body.selectAvatar")}
        selected={avatar.selected}
        onClickAvatarAction={onSelect}
      />
    ) : (
      <AvatarCardMobile
        className="Avatars__body__list__item col-12 col-sm-2 m-1 justify-content-center"
        key={index}
        id={avatar.id_avatar}
        title={avatar.nom}
        description={avatar.description}
        image={`/images/avatar/${avatar.image}`}
        onClickActionText={t("landing.Avatars.body.selectAvatar")}
        selected={avatar.selected}
        onClickAvatarAction={onSelect}
      />
    )
  );

  return (
    <div className="Avatars">
      {isMobile && (
        <div className="Avatars__logo">
          <img src="/images/logo/logo_gauche_blanc.png" alt="logo" />
        </div>
      )}
      <div className="Avatars__title">{t("landing.Avatars.title")}</div>
      <div className="Avatars__subtitle">
        {isMobile
          ? t("landing.Avatars.subtitle-mobile")
          : t("landing.Avatars.subtitle")}
      </div>
      <div className="Avatars__body">
        {!isMobile && (
          <>
            <div className="Avatars__body__title">
              {t("landing.Avatars.body.title")}
            </div>

            <div className="Avatars__body__subtitle">
              {t("landing.Avatars.body.description")}
            </div>
          </>
        )}

        <div className="Avatars__body__list col-12">{avatarsRender}</div>

        <div className="Avatars__actions">
          <Button
            text={t("landing.Avatars.buttonText")}
            className="Button__orange-gradiant col-12 col-sm-3"
            onClickAction={onClickNext}
          />
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Avatars);
