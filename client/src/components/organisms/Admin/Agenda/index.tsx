import React from "react";
import moment from "moment";
import { withTranslation, WithTranslation } from "react-i18next";

import AgendaWeekSwitcher from "components/molecules/Admin/AgendaWeekSwitcher";
import AgendaDay from "components/molecules/Admin/Agenda/AgendaDay";
import { get5daysInterval } from "utils/dates";

import "./style.scss";

class AdminAgenda extends React.Component<WithTranslation, {}> {
  state = {
    result: [
      {
        id_semaine: 1,
        name: "S1",
        date_start: "2020-06-08T07:36:52.090Z",
        date_end: "2020-06-15T07:36:52.090Z",
        agenda: {
          "2020-06-08T07:36:52.090Z": [
            {
              id: 2,
              name: "Communication : Envoi d'un email de lancement",
              desc: "Email organisation",
              done: false,
              date: "2020-06-08T09:00:00.000Z",
            },
            {
              id: 1,
              name: "Activer la mission « Lancement »",
              desc: "Board Joueurs",
              done: false,
              date: "2020-06-08T09:00:00.000Z",
            },

            {
              id: 3,
              name: "Notification Teams Mission en cours",
              desc: "Team joueurs",
              done: false,
              date: "2020-06-08T14:00:00.000Z",
            },
          ],
          "2020-06-09T07:36:52.090Z": [],
          "2020-06-10T07:36:52.090Z": [
            {
              id: 4,
              name: "Notification Teams Mission en cours",
              desc: "Team joueurs",
              done: false,
              date: "2020-06-10T14:00:00.000Z",
            },
          ],
          "2020-06-11T07:36:52.090Z": [
            {
              id: 5,
              name: "Activer la mission « Lancement »",
              desc: "Board joueur",
              done: false,
              date: "2020-06-11T09:00:00.000Z",
            },
          ],
          "2020-06-12T07:36:52.090Z": [
            {
              id: 6,
              name: "Mission en cours !  « Lancement »",
              desc: "Email organisation",
              done: false,
              date: "2020-06-12T09:00:00.000Z",
            },
          ],
        },
      },
      {
        id_semaine: 2,
        name: "S2",
        date_start: "2020-06-08T07:36:52.090Z",
        date_end: "2020-06-15T07:36:52.090Z",
        agenda: [
          {
            id: 7,
            name: "Notification Teams Mission en cours",
            desc: "Teams joueurs",
            done: false,
            date: "2020-06-14T09:00:00.000Z",
          },
        ],
      },
    ],

    currentWeek: 0, // a changer par rapport à la date
  };

  goPreviousWeek = () => {
    this.setState({
      currentWeek: this.state.currentWeek > 1 ? --this.state.currentWeek : 0,
    });
  };

  goNextWeek = () => {
    let nextValue = ++this.state.currentWeek;

    if (nextValue > this.state.result.length - 1) nextValue--;

    this.setState({
      currentWeek: nextValue,
    });
  };

  render() {
    const { tReady, t } = this.props;

    const semaines = this.state.result.map((r) => {
      return {
        id_semaine: r.id_semaine,
        name: r.name,
      };
    });

    const curWeekAgenda = this.state.result[this.state.currentWeek].agenda;

    console.log(
      Object.entries(curWeekAgenda),
      curWeekAgenda,
      this.state.result[0].agenda
    );

    return (
      <div className="AdminAgenda">
        <div className="AdminAgenda__title">
          {tReady && t("admin.agenda.title")}
        </div>
        <div className="AdminAgenda__actions">
          <AgendaWeekSwitcher
            semaines={semaines}
            onClickPreviousWeek={this.goPreviousWeek}
            onClickNextWeek={this.goNextWeek}
          />
        </div>

        <div className="AdminAgenda__body">
          {Object.keys(curWeekAgenda).map((dayAgenda, index) => (
            <AgendaDay
              className="AdminAgenda__body__item"
              key={`agenda-${index}`}
              items={curWeekAgenda[dayAgenda]}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withTranslation()(AdminAgenda);
