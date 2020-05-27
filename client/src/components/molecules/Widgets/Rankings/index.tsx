import React from "react";

import "./style.scss";

import { IUser } from "models/User";
import { withTranslation, WithTranslation } from "react-i18next";

interface IRankingProps {
  className?: string;
  expRanks: IUser[];
  ptsRanks: IUser[];
}

const Rankings = (props: IRankingProps & WithTranslation) => {
  const { className, expRanks, ptsRanks, t, tReady } = props;

  return (
    <div className={`Rankings ${className}`}>
      <div className="Rankings__header">
        <div className="Rankings__header__icon">
          <img alt="cup" src="/images/icone/cup.png" />
        </div>

        <div className="Rankings__header__info">
          <div className="Rankings__header__info__title">
            {tReady && t("menu.classement")}
          </div>

          <div className="Rankings__header__info__subtitle">
            {tReady && t("admin.classement_desc")}
          </div>
        </div>
      </div>
      <div className="Rankings__body">
        <span className="Rankings__body__title">
          {tReady && t("admin.classement_general")}
        </span>
        <div className="Rankings__body__exp">
          {ptsRanks.map((user, index) => (
            <div key={index} className="Rankings__body__exp__item">
              <div className="Rankings__body__exp__item__avatar">
                <img
                  src={user.image_avatar}
                  alt="avatar"
                  className="Rankings__body__exp__item__avatar__img"
                />
              </div>
              <div className="Rankings__body__exp__item__user">
                {index + 1}. {user.nom}
              </div>
              <div className="Rankings__body__exp__item__score">
                {user.nb_point} {tReady && t("admin.classement_points")}
              </div>
            </div>
          ))}
        </div>
        <div className="Rankings__body__separator"></div>

        <span className="Rankings__body__title">
          {" "}
          {tReady && t("admin.classement_xp")}
        </span>
        <div className="Rankings__body__exp">
          {expRanks.map((user, index) => (
            <div key={index} className="Rankings__body__exp__item">
              <div className="Rankings__body__exp__item__avatar">
                <img
                  src={user.image_avatar}
                  alt="avatar"
                  className="Rankings__body__exp__item__avatar__img"
                />
              </div>
              <div className="Rankings__body__exp__item__user">
                {index + 1}. {user.nom}
              </div>
              <div className="Rankings__body__exp__item__score">
                {user.nb_xp} XP
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Rankings);
