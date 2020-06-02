import React, { Component } from "react";
import moment from "moment";

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

class Countdown extends Component<ICountdownProps, ICountdownState> {
  state = {
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
  };

  interval = null;

  componentDidMount() {
    this.interval = setInterval(() => {
      const { timeTillDate, timeFormat } = this.props;
      const then = moment(new Date(timeTillDate));
      const now = moment();
      const countdown = moment(Number(then) - Number(now));
      const days = countdown.format("D");
      const hours = countdown.format("HH");
      const minutes = countdown.format("mm");
      const seconds = countdown.format("ss");

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
    const { className } = this.props;

    return (
      <div className={className}>
        {days}j {hours}:{minutes}:{seconds}
      </div>
    );
  }
}

export default Countdown;
