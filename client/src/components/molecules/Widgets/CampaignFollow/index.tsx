import React from "react";

// atoms
import Counter from "components/atoms/Counter";

import "./style.scss";

interface ILaunchFollowWidgetProps {
  campaign_end: string;
  campaign_name: string;
  className?: string;
}

const LaunchFollowWidget = (props: ILaunchFollowWidgetProps) => {
  const { campaign_name, campaign_end, className } = props;

  return (
    <div className={`LaunchFollowWidget ${className}`}>
      <div className="LaunchFollowWidget__background"></div>

      <div className="LaunchFollowWidget__container">
        <div className="LaunchFollowWidget__container__title">
          &laquo; {campaign_name} &raquo; est en cours !
        </div>

        <div className="LaunchFollowWidget__container__description col-8">
          Les explorateurs disposent d'une semaine pour effectuer la nouvelle
          mission &laquo; {campaign_name} &raquo;
        </div>

        <div className="LaunchFollowWidget__container__timeleft col-8">
          <span className="LaunchFollowWidget__container__timeleft__label">
            Temps restant :{" "}
          </span>{" "}
          <Counter
            timeTillDate={campaign_end}
            timeFormat="MM-DD-YYYY h:mm:ss"
            className="LaunchFollowWidget__container__timeleft__timer"
          />
        </div>
      </div>
    </div>
  );
};

export default LaunchFollowWidget;
