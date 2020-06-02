import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

import "./style.scss";

interface IGameLauncher {
  className?: string;
}

const GameLauncher = (props: IGameLauncher & WithTranslation) => {
  const { t, tReady, className } = props;

  return (
    <div className={`GameLauncher ${className || ""}`}>
      <div className="GameLauncher__container col-12 p-4">
        <div className="GameLauncher__container__icon">
          <img src="/images/icone/fusee.png" alt="rocket" />
        </div>

        <div className="GameLauncher__container__title">
          {tReady && t("player.cockpit.start_game")}
        </div>

        <div className="GameLauncher__container__desc">
          {tReady && t("player.cockpit.start_game_desc")}
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(GameLauncher);
