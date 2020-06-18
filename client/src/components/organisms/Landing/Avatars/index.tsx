import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Button } from "react-bootstrap";

import { AvatarCard, AvatarCardMobile } from "components/molecules/AvatarCard";

import "./style.scss";

const Avatars = (props) => {
  const { t, onSelectAvatar, avatars, onClickNext } = props;

  const isMobile = window.innerWidth < 768;

  const [avatarSelected, setAvatarSelected] = useState(false);

  const onSelect = (id, event) => {
    event.preventDefault();
    onSelectAvatar(id);
    setAvatarSelected(true);
  };

  const avatarsRender = avatars.map((avatar, index) =>
    !isMobile ? (
      <AvatarCard
        className="Avatars__body__list__item m-1 d-flex justify-content-center"
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
        className="Avatars__body__list__item m-1 d-flex justify-content-center"
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
    <div className="Avatars d-flex h-100 flex-column justify-content-start px-5 py-4">
      {isMobile && (
        <div className="Avatars__logo">
          <img src="/images/logo/logo_gauche_blanc.png" alt="logo" />
        </div>
      )}
      <div className="Avatars__container p-4 m-2 m-md-0">
        <h1 className="Avatars__title color-white1">
          {t("landing.Avatars.title")}
        </h1>
        <h4 className="Avatars__subtitle color-white1">
          {isMobile
            ? t("landing.Avatars.subtitle-mobile")
            : t("landing.Avatars.subtitle")}
        </h4>
        <div className="Avatars__body color-white1 mt-4">
          {!isMobile && (
            <>
              <h2 className="Avatars__body__title text-center color-white1 my-2">
                {t("landing.Avatars.body.title")}
              </h2>

              <div className="Avatars__body__subtitle text-center color-white1 mx-auto mb-2 w-75">
                {t("landing.Avatars.body.description")}
              </div>
            </>
          )}

          <div className="Avatars__body__list d-flex justify-space-between">
            {avatarsRender}
          </div>

          <div className="Avatars__actions mt-2">
            <Button
              variant="primary"
              onClick={onClickNext}
              className={"d-none d-md-block"}
              disabled={avatarSelected === false}
            >
              {t("landing.Avatars.buttonText")}
            </Button>
            <Button
              variant="primary"
              onClick={onClickNext}
              className={"d-block d-md-none"}
              disabled={avatarSelected === false}
            >
              {t("landing.Avatars.buttonText")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Avatars);
