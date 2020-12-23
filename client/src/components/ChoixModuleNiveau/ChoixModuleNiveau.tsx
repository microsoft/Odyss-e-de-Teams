import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { WithTranslation, withTranslation } from "react-i18next";
import i18n from '../../config/i18n';
import { FaRegEye } from "react-icons/fa";
import { forkJoin } from "rxjs";
import styled, { keyframes } from "styled-components";
//@ts-ignore
import { fadeInUpBig } from "react-animations";

import QuestionAPI from "api/Question";

import {
  IModule,
  INiveau,
  IChoixModuleNiveauState,
  IChoixModuleNiveauProps,
} from "src/models/Question";

import "./ChoixModuleNiveau.scss";
import IStore from "store/IStore";
import { connect } from "react-redux";

const fadeInUpBigAnimation = keyframes`${fadeInUpBig}`;

const FadeInUpModule = styled.div`
  opacity: 0;
  animation-duration: 0.5s;
  animation-delay: 0.25s;
  animation-name: ${fadeInUpBigAnimation};
  animation-fill-mode: forwards;
`;

class ChoixModuleNiveau extends Component<
  IChoixModuleNiveauProps & WithTranslation,
  IChoixModuleNiveauState
> {
  constructor(props: IChoixModuleNiveauProps & WithTranslation) {
    super(props);
    this.state = {
      listNiveau: [],
      listModule: [],
    };
  }

  componentDidMount() {
    this._loadDataLancementJeu();
  }

  private _loadDataLancementJeu = () => {
    forkJoin([
      QuestionAPI.getModule(i18n.language),
      QuestionAPI.getNiveau(i18n.language),
      QuestionAPI.getHistoQuestionnaireComplete(),
    ])
      .toPromise()
      .then((data) => {
        this.setState({
          listModule: data[0].results ? data[0].results : [],
          listNiveau: data[1].results ? data[1].results : [],
          listHistoQuestionnaireComplete: data[2].results
            ? data[2].results
            : [],
        });
      });
  };

  private _onSelect = (module: IModule, niveau: INiveau) => {
    this.props.onSelect(module, niveau);
  };

  render() {
    const {
      t,
      tReady,
    } = this.props;
    return (
      <div className={"main-choix-module mb-0"}>
        <h2 className={"d-none d-md-block color-primary-light mb-2"}>
          &laquo; {this.props.currentCampaign?.mission_name} &raquo;{" : "}{tReady && t("choix_module.title1")}
        </h2>
        <h2 className={"d-block d-md-none mb-2"}>{tReady && t("choix_module.title2")} &laquo; {this.props.currentCampaign?.mission_name} &raquo;</h2>
        <p className={"d-none d-md-block mb-2"}>
        {t("choix_module.first_mission_intro")}
        </p>
        <h4 className={"mt-2 mt-md-3 mb-2"}>{t("choix_module.subtitle")}</h4>
        <FadeInUpModule>
          <div className={"d-flex flex-column flex-md-row mt-4"}>
            {this.state.listModule?.map((item: IModule) => {
              return (
                <div
                  key={item.id_module}
                  className={`mx-1 module module${item.id_module}`}
                >
                  <div
                    className={
                      "content d-flex flex-column justify-content-between h-100 p-2"
                    }
                  >
                    <p className={"text-center mb-0"}>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/question/module/" +
                          item.image
                        }
                        alt={`Illustration module ${item.nom}`}
                        className={"illustration-module"}
                      />
                    </p>
                    <h4
                      className={
                        "d-flex align-items-center justify-content-center text-center color-primary-light mb-2"
                      }
                    >
                      {item.nom}
                    </h4>
                    <div className={"d-flex flex-column align-items-end px-4 px-md-0"}>
                      {this.state.listNiveau?.map((itemNiv: INiveau) => {
                        const alreadyComplete =
                          this.state.listHistoQuestionnaireComplete.filter(
                            (h) =>
                              h.id_module === item.id_module &&
                              h.id_niveau === itemNiv.id_niveau
                          ).length > 0;
                        return alreadyComplete ? (
                          <div
                            className={"d-flex w-100 mt-2 "}
                            key={"done" + itemNiv.id_niveau}
                          >
                            <Button
                              variant={"dark"}
                              className={`w-100 mr-2 niveau niveau${itemNiv.id_niveau}`}
                            >
                              {tReady && t("choix_module.end")}
                            </Button>
                            <Button
                              variant={"dark"}
                              className={`niveau px-2 niveau${itemNiv.id_niveau}`}
                              href={`#/Jouer/RecapQuizz/${item.id_module}/${itemNiv.id_niveau}`}
                            >
                              <FaRegEye />
                            </Button>
                          </div>
                        ) : (
                          <div
                            className={"d-flex w-100 mt-2 "}
                            key={"todo" + itemNiv.id_niveau}
                          >
                            <Button
                              variant={"primary"}
                              className={`w-100 bleu niveau niveau${itemNiv.id_niveau}`}
                              onClick={() => this._onSelect(item, itemNiv)}
                            >
                              {tReady && t("utils.level")} {itemNiv.nom}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeInUpModule>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => {
  return {
    currentCampaign: state.user.currentCampaign
  };
};
export default withTranslation()(connect(mapStateToProps)(ChoixModuleNiveau));
