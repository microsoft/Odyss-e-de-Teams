import React from "react";

import { withTranslation, WithTranslation } from "react-i18next";

import BonusCard from "components/molecules/BonusCard";

import "./style.scss";

interface IReward {
  type: string;
  day: string;
  value: number;
  text: string;
  iconPath: string;
  current: boolean;
  done: boolean;
}

interface IRewardModal {
  bonus: IReward[];

  currentBonus: any;
}

const RewardModal = (props: IRewardModal & WithTranslation) => {
  const { t, tReady, bonus } = props;

  return (
    <div className="RewardModal">
      <div className="RewardModal__title">
        <div className="RewardModal__title__icon">
          <div className="RewardModal__title__icon__container">
            <img src="/images/joyaux/module_manager.png" alt="joyaux" />
          </div>
          <div className="RewardModal__title__icon__container">
            <img src="/images/joyaux/module_manager.png" alt="joyaux" />
          </div>
          <div className="RewardModal__title__icon__container">
            <img src="/images/joyaux/module_manager.png" alt="joyaux" />
          </div>
        </div>

        <div className="RewardModal__title__title">
          {tReady && t("player.cockpit.bonus.title")}
        </div>

        <div className="RewardModal__title__description">
          {tReady && t("player.cockpit.bonus.desc")}
        </div>
      </div>

      <div className="RewardModal__body">
        {bonus.map((elem, index) => (
          <BonusCard
            className="col-2 p-0"
            key={`bonus-${index}`}
            day={elem.day}
            bonusValue={elem.value}
            iconPath={elem.iconPath}
            locked={elem.done}
            current={elem.current}
            description={elem.text}
          />
        ))}
      </div>
    </div>
  );
};

export default withTranslation()(RewardModal);
