import React, { useState } from "react";

import { Button } from "react-bootstrap";

import { withTranslation, WithTranslation } from "react-i18next";

import "./style.scss";

interface IAgendaWeekSwitcher {
  onClickPreviousWeek: any;
  onClickNextWeek: any;
  previousAvailable: boolean;
  nextAvailable: boolean;
  semaines: any;
  currentWeek: any;
}

const AgendaWeekSwitcher = (props: IAgendaWeekSwitcher & WithTranslation) => {
  const {
    tReady,
    t,
    currentWeek,
    semaines,
    previousAvailable,
    nextAvailable,
  } = props;

  return (
    <div className="AgendaWeekSwitcher">
      <div className={`AgendaWeekSwitcher__previous`}>
        <Button
          onClick={props.onClickPreviousWeek}
          disabled={!previousAvailable}
        >
          {" "}
          &lt;{" "}
        </Button>
      </div>

      <div className="AgendaWeekSwitcher__current">
        {tReady && t("admin.agenda.week")} {currentWeek + 1}{" "}
        {semaines[currentWeek].name}
      </div>

      <div className="AgendaWeekSwitcher__next">
        <Button onClick={props.onClickNextWeek} disabled={!nextAvailable}>
          {" "}
          &gt;{" "}
        </Button>
      </div>
    </div>
  );
};

export default withTranslation()(AgendaWeekSwitcher);
