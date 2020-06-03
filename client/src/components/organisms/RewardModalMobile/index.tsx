import React from "react";

import { withTranslation, WithTranslation } from "react-i18next";

import BonusCardMobile from "components/molecules/BonusCardMobile";
import BonusEXPMobile from "components/molecules/MobileWidgets/BonusExp";

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

interface IRewardModalMobile {
  bonus: IReward[];

  currentBonus: any;
}

const RewardModalMobile = (props: IRewardModalMobile & WithTranslation) => {
  const { t, tReady, bonus, currentBonus } = props;

  return (
    <div className="RewardModalMobile">
      <div className="RewardModalMobile__title">
        <div className="RewardModalMobile__title__icon">
          <div className="RewardModalMobile__title__icon__container">
            <img src="/images/joyaux/module_manager.png" alt="joyaux" />
          </div>
          <div className="RewardModalMobile__title__icon__container">
            <img src="/images/joyaux/module_manager.png" alt="joyaux" />
          </div>
          <div className="RewardModalMobile__title__icon__container">
            <img src="/images/joyaux/module_manager.png" alt="joyaux" />
          </div>
        </div>

        <div className="RewardModalMobile__title__title">
          {tReady && t("player.cockpit.bonus.mobile_title")}
        </div>

        <div className="RewardModalMobile__title__subtitle">
          {tReady && t("player.cockpit.bonus.mobile_desc")}{" "}
          <strong>{tReady && t("player.cockpit.bonus.mobile_day")}</strong>:
        </div>

        <div className="RewardModalMobile__currentbonus col-12">
          <BonusEXPMobile
            className="col-12 mt-4"
            bonus={150}
            bonusDesc={`${currentBonus.type.toLowerCase()}_mobile`}
          />
        </div>

        <div className="RewardModalMobile__separator"></div>

        <div className="RewardModalMobile__bonus">
          <div className="RewardModalMobile__bonus__title">
            {tReady && t("player.cockpit.bonus.mobile_next_bonus")}
          </div>
        </div>

        <div className="RewardModalMobile__body col-12">
          {bonus.map((elem, index) => (
            <BonusCardMobile
              className="col-12 p-0 mt-2 mb-2"
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
    </div>
  );
};

export default withTranslation()(RewardModalMobile);

/**
 *       <div className="RewardModalMobile__body">
        <div className="RewardModalMobile">
          Tes prochains bonus 
        </div>


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
 */
