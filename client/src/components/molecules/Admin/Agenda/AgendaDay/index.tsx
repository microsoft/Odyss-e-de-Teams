import React from "react";

import AgendaItem from "components/molecules/Admin/Agenda/AgendaItem/index";

const AgendaDay = (props) => {
  const { items } = props;

  return (
    <div className="AgendaDay">
      <div className="AgendaDay__header">Jour Agenda</div>

      <div className="AgendaDay__body">
        {items.map((item, index) => (
          <AgendaItem
            name={item.name}
            desc={item.desc}
            date={item.date}
            done={item.done}
          />
        ))}
      </div>
    </div>
  );
};

export default AgendaDay;
