import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { FaPause, FaStop, FaPlay } from "react-icons/fa";

import { IStopWatchProps, IStopWatchState } from "src/models/Question";

import "./StopWatch.scss";

class StopWatch extends Component<IStopWatchProps, IStopWatchState> {
  timer: number;
  constructor(props: IStopWatchProps) {
    super(props);
    this.state = {
      timerOn: props.done ? true : false,
      timerStart: props.initTimer ? props.initTimer : 0,
      timerTime: props.initTimer ? props.initTimer : 0,
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  public getCurrentTime = () => {
    return this.state.timerTime;
  };

  public startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });
    this.props.onStartTimer();
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
    }, 10);
  };

  public stopTimer = (actionClick = false) => {
    if (this.props.canStopTimer || !actionClick) {
      this.setState({ timerOn: false });
      clearInterval(this.timer);
      this.props.onStopTimer(actionClick);
    }
  };

  public restartTimer = () => {
    clearInterval(this.timer);
    this.setState(
      {
        timerStart: 0,
        timerTime: 0,
      },
      () => {
        this.startTimer();
      }
    );
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    return (
      <div className={"chrono"}>
        <p className={"text-center mb-0 d-none d-md-block"}>
          <img
            src={process.env.PUBLIC_URL + "/images/question/chronometre.png"}
            alt={`Illustration Chronometre`}
            className={"illustration-chronometre my-3"}
          />
        </p>
        <div className="stopwatch">
          <h3 className={"text-center d-none d-md-block"}>
            {minutes} : {seconds} : {centiseconds}
          </h3>
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <Button variant="primary" onClick={this.startTimer}>
              <span className={"d-none d-md-inline"}>Reprendre la mission</span>
              <span className={"d-inline d-md-none"}>
                <FaPlay />
              </span>
            </Button>
          )}
          {this.state.timerOn === true && (
            <Button
              variant={this.props.done ? "dark" : "primary"}
              disabled={!this.props.canStopTimer}
              onClick={() => this.stopTimer(true)}
            >
              <span
                className={this.props.done ? "d-none" : "d-none d-md-inline"}
              >
                Suspendre la mission
              </span>
              <span
                className={this.props.done ? "d-none" : "d-inline d-md-none"}
              >
                <FaPause />
              </span>
              <span
                className={this.props.done ? "d-none d-md-inline" : "d-none"}
              >
                Mission terminée
              </span>
              <span
                className={this.props.done ? "d-inline d-md-none" : "d-none"}
              >
                <FaStop />
              </span>
            </Button>
          )}
          {/* {this.state.timerOn === false && this.state.timerTime === 0 && (
                <button onClick={this._startTimer}>Start</button>
              )}
              {this.state.timerOn === true && (
                <button onClick={this._stopTimer}>Stop</button>
              )}
              {this.state.timerOn === false && this.state.timerTime > 0 && (
                <button onClick={this._startTimer}>Resume</button>
              )}
              {this.state.timerOn === false && this.state.timerTime > 0 && (
                <button onClick={this._resetTimer}>Reset</button>
              )} */}
        </div>
      </div>
    );
  }
}

export default StopWatch;
