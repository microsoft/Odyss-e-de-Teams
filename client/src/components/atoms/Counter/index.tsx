import React, { Component } from "react";
import moment from "moment";

import { withTranslation, WithTranslation } from "react-i18next";
import i18n from '../../../config/i18n';

interface ICountdownProps {
  timeTillDate: string;
  timeFormat: string;
  className?: string;
}

interface ICountdownState {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

class Countdown extends Component<ICountdownProps & WithTranslation, ICountdownState> {
  state = {
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
  };

  interval = null;

  componentDidMount() {
    this.interval = setInterval(() => {
      const { timeTillDate } = this.props;

      const then = moment.utc(timeTillDate);
      const now = moment.utc();
      //const countdown = moment(Number(then) - Number(now));
      const countdown = then.diff(now);
      const duration = moment.duration(countdown);

      if (duration.as('milliseconds') < 0) {
        this.setState({ days: '0', hours: null, minutes: null, seconds: null });
        clearInterval(this.interval);
        return;
      }

      const days = duration.get('days').toString();
      const hours = (duration.get('hours') < 10 ? '0' : '') + duration.get('hours').toString();
      const minutes = (duration.get('hours') < 10 ? '0' : '') + duration.get('hours').toString();
      const seconds = (duration.get('seconds') < 10 ? '0' : '') + duration.get('seconds').toString();

      this.setState({ days, hours, minutes, seconds });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;
    const { className, tReady, t } = this.props;

    return (
      <div className={className}>
        {
          (days > 0 && hours) ? (
            <>{days}{(i18n.language === 'fr' ? 'j' : 'd')}, {hours}:{minutes}:{seconds}</>
          ) : (
            <>{tReady && t("counter.info")}</>
          )
        }
      </div>
    );
  }
}

export default withTranslation()(Countdown);
