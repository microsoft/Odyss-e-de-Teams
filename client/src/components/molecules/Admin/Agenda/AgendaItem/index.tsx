import React from "react";

interface AgendaItem {
  name: string;
  desc: string;
  done: boolean;
  date: string;
}

const AgendaItem = (props: AgendaItem) => {
  return <div className="AgendaItem">{props.name}</div>;
};

export default AgendaItem;
