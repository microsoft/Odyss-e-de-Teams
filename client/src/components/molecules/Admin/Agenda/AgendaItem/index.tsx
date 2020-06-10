import React, { useState } from "react";

import { Button } from "react-bootstrap";

import { withTranslation, WithTranslation } from "react-i18next";
import "./style.scss";

export interface IAgendaItem {
  name: string;
  desc: string;
  done: boolean;
  date: string;
  id: number;
  className?: string;
  onItemClick: any;
}

const AgendaItem = (props: IAgendaItem & WithTranslation) => {
  const {
    id,
    date,
    name,
    desc,
    done,
    onItemClick,
    className,
    tReady,
    t,
  } = props;

  const [itemDone, setItemDone] = useState(done);

  return (
    <div
      className={`AgendaItem ${itemDone ? "AgendaItem__done" : ""} ${
        className || ""
      }`}
    >
      <div className="AgendaItem__date">{date}</div>
      <div className="AgendaItem__name">{name}</div>

      <div className="AgendaItem__desc">{desc}</div>
      <div className="AgendaItem__actions">
        <Button
          onClick={() => {
            setItemDone(!itemDone);
            onItemClick({ id: id, status: !itemDone });
          }}
        >
          {tReady &&
            (itemDone
              ? t("admin.agenda.item_done")
              : t("admin.agenda.item_pending"))}
        </Button>
      </div>
    </div>
  );
};

export default withTranslation()(AgendaItem);
