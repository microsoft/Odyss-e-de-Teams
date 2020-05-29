import React, { Component } from "react";
import { Button } from "react-bootstrap";

import { IStopWatchState } from "src/models/Question";

class Stopwatch extends Component<{}, IStopWatchState> {
  timer: number;
  constructor(props: any) {
    super(props);
    this.state = {
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
    };
  }

  componentDidMount() {
      this._startTimer();
  }

  private _startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
    }, 10);
  };

  private _stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  private _resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
    });
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    return (
      <div className="Stopwatch">
        <h3 className={"text-center"}>
          {minutes} : {seconds} : {centiseconds}
        </h3>
        {this.state.timerOn === false && this.state.timerTime > 0 && (
            <Button variant="primary" onClick={this._stopTimer}>Reprendre la mission</Button>
        )}
        {this.state.timerOn === true && (
            <Button variant="primary" onClick={this._stopTimer}>Suspendre la mission</Button>
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
    );
  }
}

export default Stopwatch;
