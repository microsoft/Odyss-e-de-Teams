import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { WithTranslation, withTranslation } from "react-i18next";

import ChoixModuleNiveau from "components/ChoixModuleNiveau/ChoixModuleNiveau";
import IntroLancementQuestion from "components/IntroLancementQuestion/IntroLancementQuestion";

import {
  IJouerState,
  IJouerProps,
  IModule,
  INiveau,
} from "src/models/Question";

import "./Jouer.scss";
import IStore from "store/IStore";

class Jouer extends Component<IJouerProps & WithTranslation, IJouerState> {
  constructor(props: IJouerProps & WithTranslation) {
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
    const {
      t,
      tReady
    } = this.props;
    {
      if (this.props.currentOrganisation.id_semaine_encours > 0) {
        if (this.state.step === 3) {
          return <Redirect to="/Jouer/Quizz" />;
        }
        return (
          <div className={"main-encart nobg-mobile pb-0 mb-0"}>
            {this.state.step === 1 && (
              <>
                <h1
                  className={
                    "color-white d-flex d-md-none justify-content-center"
                  }
                >
                  <img
                    src={process.env.PUBLIC_URL + "/images/icone/fusee.png"}
                    alt="Ico Jouer"
                    className={"ico-titre"}
                  />
                  {tReady && t("play.launch")}
                </h1>
                <ChoixModuleNiveau onSelect={this._selectModuleNiveau} />
              </>
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
      } else {
        return (
          <div className={"main-encart nobg-mobile"}>
            <h1
              className={"color-white d-flex d-md-none justify-content-center"}
            >
              <img
                src={process.env.PUBLIC_URL + "/images/icone/fusee.png"}
                alt="Ico Jouer"
                className={"ico-titre"}
              />
              {tReady && t("play.no_mission")}
            </h1>
            <h2 className={"d-none d-md-block color-primary-light mb-2"}>
            {tReady && t("play.no_mission")}
            </h2>
              <p className={"mb-0"}>{tReady && t("play.no_ship_1")} &laquo; GO &raquo; {tReady && t("play.no_ship_2")}</p>
          </div>
        );
      }
    }
  }
}
const mapStateToProps = (state: IStore) => {
  return {
    currentOrganisation: state.user.currentOrganisation,
  };
};
export default withTranslation()(connect(mapStateToProps)(Jouer));
