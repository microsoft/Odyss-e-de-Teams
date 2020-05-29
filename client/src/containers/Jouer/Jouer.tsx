import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import ChoixModuleNiveau from "components/ChoixModuleNiveau/ChoixModuleNiveau";
import IntroLancementQuestion from "components/IntroLancementQuestion/IntroLancementQuestion";

import {
  IJouerState,
  IJouerProps,
  IModule,
  INiveau,
} from "src/models/Question";

import "./Jouer.scss";

class Jouer extends Component<IJouerProps, IJouerState> {
  constructor(props: IJouerProps) {
    super(props);
    this.state = {
      step: 1,
      selectedModule: null,
      selectedNiveau: null,
    };
  }

  private _selectModuleNiveau = (module: IModule, niveau: INiveau) => {
    this.setState({
      step: 2,
      selectedModule: module,
      selectedNiveau: niveau,
    });
  };

  private _start = () => {
    const action_liste = {
      type: "SET_MODULE_NIVEAU",
      value: {
        module: this.state.selectedModule,
        niveau: this.state.selectedNiveau,
      },
    };
    this.props.dispatch(action_liste);
    this.setState({
      step: 3,
    });
  };

  render() {
    if (this.state.step === 3) {
      return <Redirect to="/Jouer/Quizz" />;
    }
    return (
      <div className={"main-encart nobg-mobile pb-0 mb-0"}>
        <h1 className={"color-white d-flex d-md-none justify-content-center"}>
          <img
            src={process.env.PUBLIC_URL + "/images/icone/fusee.png"}
            alt="Ico Jouer"
            className={"ico-titre"}
          />
          Lancement du jeu
        </h1>
        {this.state.step === 1 && (
          <ChoixModuleNiveau onSelect={this._selectModuleNiveau} />
        )}
        {this.state.step === 2 && (
          <IntroLancementQuestion
            onValid={this._start}
            selectedModule={this.state.selectedModule}
            selectedNiveau={this.state.selectedNiveau}
          />
        )}
      </div>
    );
  }
}

export default connect()(Jouer);
