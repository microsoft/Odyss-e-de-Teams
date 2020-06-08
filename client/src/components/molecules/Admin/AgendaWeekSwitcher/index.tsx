import React from "react";

import { Button } from "react-bootstrap";

interface IAgendaWeekSwitcher {
  onClickPreviousWeek: any;
  onClickNextWeek: any;
}

const AgendaWeekSwitcher = (props) => {
  return (
    <div className="AgendaWeekSwitcher">
      <div className="AgendaWeekSwitcher__previous">
        <Button onClick={props.onClickPreviousWeek}> &lt; </Button>
      </div>

      <div className="AgendaWeekSwitcher__current">Semaine 1: Lancement</div>

      <div className="AgendaWeekSwitcher__next">
        <Button onClick={props.onClickNextWeek}> &gt; </Button>
      </div>
    </div>
  );
};

export default AgendaWeekSwitcher;
