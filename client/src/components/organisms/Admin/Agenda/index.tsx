import React from "react";

import moment from "moment";

import { withTranslation, WithTranslation } from "react-i18next";

import AgendaWeekSwitcher from "components/molecules/Admin/AgendaWeekSwitcher";
import AgendaDay from "components/molecules/Admin/Agenda/AgendaDay";

import AdminAPI from "api/Admin";

import "./style.scss";

import { getFullMonth } from "utils/dates";

class AdminAgenda extends React.Component<WithTranslation, {}> {
  state = {
    result: [],

    currentWeek: 0,
    loading: true,
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

  async componentDidMount() {
    await this.fetchData();
  }

  async fetchData() {
    const res = await AdminAPI.getAgenda();

    let currentWeek = 0;
    if (res) {
      res.forEach((elem, index) => {
        if (moment().isBetween(moment(elem.date_start), moment(elem.date_end))) {
          currentWeek = index;
        }
      });
    }

    this.setState({
      result: res,
      loading: false,
      currentWeek: currentWeek,
    });
  }

  onAgendaItemClick = async (elem) => {
    await AdminAPI.setAgendaItemStatus({
      id_item: elem.id,
      item_status: elem.status,
    });

    await this.fetchData();
  };

  render() {
    const { tReady, t } = this.props;

    const { loading, currentWeek } = this.state;

    const curMonthTranslation = getFullMonth(new Date());
    window.moment = moment;

    if (loading) return <> Loading ... </>;
    else {
      const semaines = this.state.result.map((r) => {
        return {
          id_semaine: r.id_semaine,
          name: r.name,
        };
      });

      const curWeekAgenda = this.state.result[this.state.currentWeek].agenda;
      return (
        <div className="AdminAgenda">
          <div className="AdminAgenda__header">
            <div className="AdminAgenda__header__title">
              {tReady && t("admin.agenda.title")}{" "}
              {tReady && t(curMonthTranslation)} {new Date().getFullYear()}
            </div>
            <div className="AdminAgenda__header__actions">
              <AgendaWeekSwitcher
                semaines={semaines}
                onClickPreviousWeek={this.goPreviousWeek}
                onClickNextWeek={this.goNextWeek}
                currentWeek={this.state.currentWeek}
                previousAvailable={currentWeek > 0}
                nextAvailable={currentWeek < this.state.result.length}
              />
            </div>
          </div>

          <div className="AdminAgenda__body">
            {Object.keys(curWeekAgenda).map((dayAgenda, index) => (
              <AgendaDay
                className="AdminAgenda__body__item p-0"
                key={`agenda-${index}`}
                items={curWeekAgenda[dayAgenda]}
                day={dayAgenda}
                onAgendaItemClick={this.onAgendaItemClick}
              />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default withTranslation()(AdminAgenda);
