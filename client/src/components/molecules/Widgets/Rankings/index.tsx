import React from "react";

import "./style.scss";

import { IUser } from "models/User";

interface IRankingProps {
  className?: string;
  expRanks: IUser[];
  ptsRanks: IUser[];
}

const Rankings = (props: IRankingProps) => {
  const { className, expRanks, ptsRanks } = props;
  console.log(props);

  return (
    <div className={`Rankings ${className}`}>
      <div className="Rankings__header">
        <div className="Rankings__header__icon">
          <img alt="cup" src="/images/icone/cup.png" />
        </div>

        <div className="Rankings__header__info">
          <div className="Rankings__header__info__title">Classements</div>

          <div className="Rankings__header__info__subtitle">
            Classements et statistiques
          </div>
        </div>
      </div>
      <div className="Rankings__body">
        <span className="Rankings__body__title">Classement général</span>
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
                {user.nb_point} Points
              </div>
            </div>
          ))}
        </div>
        <div className="Rankings__body__separator"></div>

        <span className="Rankings__body__title">Classement XP</span>
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

export default Rankings;
