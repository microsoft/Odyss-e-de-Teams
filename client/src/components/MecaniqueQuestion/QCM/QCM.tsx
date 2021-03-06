import React, { Component } from "react";

import QCMChoixMultiple from "./QCMChoixMultiple";
import QCMChoixUnique from "./QCMChoixUnique";

import {
  IQCMProps,
  IMecaniqueQuestionState,
} from "models/Question";

import "./QCM.scss";

class QCM extends Component<IQCMProps, IMecaniqueQuestionState> {
  constructor(props: IQCMProps) {
    super(props);
    this.state = {
      selectedReponseIds: [],
    };
  }

  private _onSelect = (selectedReponseIds: number[]) => {
    this.props.onSelect(this.props.question, selectedReponseIds);
  };

  render() {
    return (
      <div className={"conteneur-reponse"}>
        {
          this.props.multiple ? (
            <QCMChoixMultiple onSelect={this._onSelect} question={this.props.question} isRecap={this.props.isRecap} />
          ) : (
            <QCMChoixUnique onSelect={this._onSelect} question={this.props.question} isRecap={this.props.isRecap} />
          )
        }
      </div>
    );
  }
}

export default QCM;
