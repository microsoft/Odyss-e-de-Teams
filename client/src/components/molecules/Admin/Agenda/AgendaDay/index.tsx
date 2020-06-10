import React, { useState } from "react";
import moment from "moment";
import { withTranslation, WithTranslation } from "react-i18next";

import AgendaItem from "components/molecules/Admin/Agenda/AgendaItem/index";

import "./style.scss";

import { IAgendaItem } from "components/molecules/Admin/Agenda/AgendaItem";

import { monthNamesKeys } from "utils/dates";

interface IAgendaDay {
  items: IAgendaItem[];
  className?: string;
  day: string;
  onAgendaItemClick: any;
}

const AgendaDay = (props: IAgendaDay & WithTranslation) => {
  const { items, className, day, onAgendaItemClick, tReady, t } = props;

  const isCurrentDay = moment(day).diff(moment().format("DD-MM-YYYY")) === 0;

  const onItemClick = (e) => {
    onAgendaItemClick(e);
  };

  const curDate = moment(day, "DD-MM-YYYY");

  return (
    <div className={`AgendaDay ${className || ""}`}>
      <div
        className={`AgendaDay__header ${
          isCurrentDay ? "AgendaDay__header__currentday" : ""
        }`}
      >
        <span className="AgendaDay__header__day">{curDate.format("DD")}</span>
        <span className="AgendaDay__header__month">
          {tReady && t(monthNamesKeys[curDate.month()])}
        </span>
      </div>

      <div className="AgendaDay__body">
        {items.map((item, index) => (
          <AgendaItem
            key={`agenda-item-${index}`}
            className="AgendaDay__body__item"
            name={item.name}
            desc={item.desc}
            date={item.date}
            done={item.done}
            id={item.id}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default withTranslation()(AgendaDay);
