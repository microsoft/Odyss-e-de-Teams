import React from "react";

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

class AgendaItem extends React.Component<
IAgendaItem & WithTranslation,
  {}
> {

  render() {
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
    } = this.props;
  
    return (
      <div
        className={`AgendaItem ${done ? "AgendaItem__done" : ""} ${
          className || ""
        }`}
      >
        <div className="AgendaItem__date">{date}</div>
        <div className="AgendaItem__name">{name}</div>

        <div className="AgendaItem__desc">{desc}</div>
        <div className="AgendaItem__actions">
          <Button
            onClick={() => {
              onItemClick({ id: id, status: !done });
            }}
            className="bleu"
            variant={!done ? 'primary' : 'light'}
          >
            {tReady &&
              (done
                ? t("admin.agenda.item_done")
                : t("admin.agenda.item_pending"))}
          </Button>
        </div>
      </div>
    );
              }
};

export default withTranslation()(AgendaItem);
