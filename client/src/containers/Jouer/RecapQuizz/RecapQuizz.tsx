import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { forkJoin } from "rxjs";

import QuestionAPI from "api/Question";
import UserAPI from "api/User";

import QCM from "components/MecaniqueQuestion/QCM/QCM";
import QCMVideo from "components/MecaniqueQuestion/QCM/QCMVideo";
import RemettreOrdre from "components/MecaniqueQuestion/RemettreOrdre/RemettreOrdre";
import StopWatch from "components/StopWatch/StopWatch";

import {
  IRecapQuizzProps,
  IRecapQuizzState,
  IQuestion,
} from "src/models/Question";

import "./RecapQuizz.scss";

class RecapQuizz extends Component<IRecapQuizzProps, IRecapQuizzState> {
  constructor(props: IRecapQuizzProps) {
    super(props);
    this.state = {
      isLoading: true,
      tempsTotal: 0,
    };
  }

  componentDidMount() {
    this._loadRecapQuizz();
  }

  private _loadRecapQuizz = () => {
    const {
      match: { params },
    }: any = this.props;

    forkJoin([
      QuestionAPI.getModule("fr", params.moduleId),
      QuestionAPI.getNiveau("fr", params.niveauId),
      QuestionAPI.getRecapQuizz("fr", {
        id_module: params.moduleId,
        id_niveau: params.niveauId,
      }),
      UserAPI.checkLevelUp(),
      UserAPI.checkNewMedal(),
    ])
      .toPromise()
      .then((data) => {
        const reducer = (accumulator: number, currentValue: number) =>
          accumulator + currentValue;
        let listQuestion: IQuestion[] = data[2].results ? data[2].results : [];
        let tempsTotal: number = 0,
          nbPointTotal: number = 0,
          nbXpTotal: number = 0;
        if (listQuestion && listQuestion.length > 0) {
          tempsTotal = listQuestion
            .map((q) => parseInt(q.temps_reponse.toString()))
            .reduce(reducer);
          nbXpTotal = listQuestion.map((q) => q.nb_xp).reduce(reducer);
          nbPointTotal = listQuestion.map((q) => q.nb_point).reduce(reducer);
        }
        this.setState(
          {
            currentModule: data[0].results,
            currentNiveau: data[1].results,
            listQuestion: listQuestion,
            isLoading: false,
            tempsTotal: tempsTotal,
            nbXpTotal: nbXpTotal,
            nbPointTotal: nbPointTotal,
          },
          () => {
            if (data[4] && data[4].length > 0) {
              const action_medal = {
                type: "NEW_MEDAL",
                value: data[4],
              };
              this.props.dispatch(action_medal);
            }
            if (data[3] && data[3].hasLevelUp) {
              UserAPI.getUser("fr", "current").then((user) => {
                const action_liste_user = {
                  type: "SET_CURRENT_USER",
                  value: user,
                };
                this.props.dispatch(action_liste_user);
                const action_liste = {
                  type: "LEVEL_UP",
                  value: data[3],
                };
                this.props.dispatch(action_liste);
              });
            }
          }
        );
      });
  };
  private _renderMecanique(item: IQuestion) {
    switch (item.id_mecanique) {
      case 1: // QCM - Choix unique
        return (
          <div>
            <QCM question={item} isRecap={true} />
          </div>
        );
      case 2: // QCM - Choix multiple
        return (
          <div>
            <QCM question={item} multiple={true} isRecap={true} />
          </div>
        );
      case 3: // QCM avec vidéo - Choix unique
        return (
          <div>
            <QCMVideo question={item} isRecap={true} />
          </div>
        );
      case 4: // QCM avec vidéo - Choix multiple
        return (
          <div>
            <QCMVideo question={item} multiple={true} isRecap={true} />
          </div>
        );
      case 5: // Remettre dans l'ordre
        return (
          <div>
            <RemettreOrdre question={item} isRecap={true} />
          </div>
        );
      case 6: // QCM avec pictos réponses - Choix unique
        return (
          <div>
            <QCM question={item} isRecap={true} />
          </div>
        );
      case 7: // QCM avec pictos réponses - Choix multiple
        return (
          <div>
            <QCM question={item} multiple={true} isRecap={true} />
          </div>
        );
    }
  }

  render() {
    let secondeTotal = (
      "0" +
      (Math.floor(this.state.tempsTotal / 1000) % 60)
    ).slice(-2);
    let minuteTotal = (
      "0" +
      (Math.floor(this.state.tempsTotal / 60000) % 60)
    ).slice(-2);
    return (
      <div className={"d-flex flex-column flex-md-row"}>
        <div className={"main-recap-quizz w-100"}>
          <h1 className={"color-white d-flex d-md-none justify-content-center"}>
            <img
              src={
                process.env.PUBLIC_URL +
                "/images/question/module/" +
                this.state.currentModule?.image
              }
              alt={`Illustration module ${this.state.currentModule?.nom}`}
              className={"ico-titre"}
            />
            {this.state.currentModule?.nom} - {this.state.currentNiveau?.nom}
          </h1>
          <div className={"main-encart nobg-mobile main-entete"}>
            <div className={"d-flex flex-column flex-md-row"}>
              <div>
                <div
                  className={"d-none d-md-flex mb-2 titre align-items-center"}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/question/module/" +
                      this.state.currentModule?.image
                    }
                    alt={`Illustration module ${this.state.currentModule?.nom}`}
                  />
                  <div className={"ml-2"}>
                    <h2 className={"color-primary-light mb-1"}>
                      {this.state.currentModule?.nom}{" "}
                      <strong className={"color-primary"}>
                        - {this.state.currentNiveau?.nom}
                      </strong>
                    </h2>
                    <p className={"mb-0 d-none d-md-block"}>
                      Résultat de ton exploration
                    </p>
                  </div>
                </div>
                <h3 className={"mb-0 d-block d-md-none color-white1"}>
                  Résultat de ton exploration
                </h3>
                <div className={"mt-4"}>
                  <h5
                    className={
                      "d-block d-md-flex flex-md-row align-items-center"
                    }
                  >
                    <span className={"d-block d-md-inline-block"}>
                      Score obtenu :{" "}
                    </span>
                    <span
                      className={
                        "color-primary-light h4 mb-0 ml-md-2 d-block d-md-inline-block span-result"
                      }
                    >
                      {this.state.listQuestion
                        ? this.state.listQuestion.filter((q) => q.valid).length
                        : 0}
                      /{this.state.listQuestion?.length} bonnes réponses !
                    </span>
                  </h5>
                  <h5
                    className={
                      "mt-3 d-block d-md-flex flex-md-row align-items-center"
                    }
                  >
                    <span className={"d-block d-md-inline-block"}>
                      Temps de l'exploration :{" "}
                    </span>
                    <span
                      className={
                        "color-primary-light h4 mb-0 ml-md-2 d-block d-md-inline-block span-result"
                      }
                    >
                      {minuteTotal}min et {secondeTotal}sec
                    </span>
                  </h5>
                </div>
              </div>
              <div
                className={
                  "sep d-none d-md-flex flex-column mx-4 justify-content-center"
                }
              >
                <p></p>
              </div>
              <div className={"pl-md-1"}>
                <h5 className={"d-none d-md-block"}>Tes récompenses :</h5>
                <div className={"color-primary-light"}>
                  <h5 className={"d-block d-md-none color-black1 mt-2"}>
                    Points d’EXP remportés
                  </h5>
                  <h2 className={"total-xp mb-0"}>
                    + {this.state.nbXpTotal} EXP
                  </h2>
                  <p className={"mb-4 d-none d-md-block"}>
                    <small>Points d’expérience remportés</small>
                  </p>
                  <h5 className={"d-block d-md-none color-black1 mt-2"}>
                    Points de jeu remportés
                  </h5>
                  <h2 className={"total-point mb-0"}>
                    + {this.state.nbPointTotal} Points
                  </h2>
                  <p className={"mb-0 d-none d-md-block"}>
                    <small>Points de jeu remportés</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={"main-encart nobg-mobile"}>
            <h2 className={"color-primary-light mb-1 d-none d-md-block"}>
              Récapitulatif des réponses
            </h2>
            <p>
              Tu trouveras ci-dessous les réponses aux questions de ce module.
              Lis-les attentivement car il se peut que des astuces y soient
              cachées.
            </p>
            {this.state.listQuestion?.map((item: IQuestion, i: number) => {
              return (
                <div
                  key={item.id_question}
                  className={`recap question${
                    item.valid ? " valid" : " invalid"
                  }`}
                >
                  <div className={"mt-md-4 intitule"}>
                    <h4
                      className={"mb-3 d-block d-md-none color-primary-light"}
                    >
                      Question {i + 1}/{this.state.listQuestion?.length}
                    </h4>
                    <h5>{item.nom}</h5>
                    <p className={"mb-0 d-none d-md-block"}>
                      Question {i + 1}/{this.state.listQuestion?.length}
                    </p>
                  </div>
                  {item.valid ? (
                    <p className={"p-result pl-md-3 mt-3"}>
                      Tu as sélectionné la bonne réponse, bravo !
                    </p>
                  ) : (
                    <p className={"p-result pl-md-3 mt-3"}>
                      Malheureusement, tu n’as pas sélectionné la bonne réponse
                      ! Regarde la réponse ci-dessous
                    </p>
                  )}
                  <div className={"mt-4"}>{this._renderMecanique(item)}</div>
                  {item.astuce ? (
                    <div className={"mt-4 astuce d-md-flex align-items-center"}>
                      <p className={"mb-0 illustration"}>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/question/module/astro_" +
                            this.state.currentModule?.image
                          }
                          alt={`Illustration module ${this.state.currentModule?.nom}`}
                          className={
                            "illustration-module-done d-none d-md-inline"
                          }
                        />
                      </p>
                      <div className={"ml-3"}>
                        <h3 className={"color-primary-light"}>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/question/module/astro_" +
                              this.state.currentModule?.image
                            }
                            alt={`Illustration module ${this.state.currentModule?.nom}`}
                            className={"ico-titre d-inline d-md-none mr-2"}
                          />
                          Petite astuce Teams !
                        </h3>
                        <p className={"mb-0"}>{item.astuce}</p>
                      </div>
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
              );
            })}
            <p className={"text-right mt-5 d-flex d-md-block"}>
              <Button
                variant="primary"
                className={"d-inline-block mr-3"}
                href={"/#/Jouer"}
              >
                Lancer un autre module !
              </Button>
              <Button
                variant="primary"
                className={"d-inline-block"}
                href={"/#/Cockpit"}
              >
                Retour au cockpit
              </Button>
            </p>
          </div>
        </div>
        <div className={"toolbar-right ml-0 ml-md-5"}>
          {this.state.isLoading ? (
            <span></span>
          ) : (
            <StopWatch done={true} initTimer={this.state.tempsTotal} />
          )}
        </div>
      </div>
    );
  }
}

export default connect()(RecapQuizz);
