import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Spinner, Modal } from "react-bootstrap";
import { FaQuestion } from "react-icons/fa";

import QuestionAPI from "api/Question";

import QCM from "components/MecaniqueQuestion/QCM/QCM";
import RemettreOrdre from "components/MecaniqueQuestion/RemettreOrdre/RemettreOrdre";
import QCMVideo from "components/MecaniqueQuestion/QCM/QCMVideo";
import StopWatch from "components/StopWatch/StopWatch";

import IStore from "src/store/IStore";
import { IQuizzProps, IQuizzState, IQuestion } from "src/models/Question";

import "./Quizz.scss";

class Quizz extends Component<IQuizzProps, IQuizzState> {
  chronoComponent: any;

  constructor(props: IQuizzProps) {
    super(props);
    this.chronoComponent = React.createRef();
    this.state = {
      isLoading: true,
      step: 1,
      hasReponse: false,
      isPaused: false,
      hasAlreadyPaused: props.dataInitQuizz.hasAlreadyPaused ? true : false,
      listQuestion:
        props.dataInitQuizz.listQuestion &&
        props.dataInitQuizz.listQuestion.length > 0
          ? props.dataInitQuizz.listQuestion
          : [],
    };
  }

  componentDidMount() {
    this._loadQuizz();
  }

  private _loadQuizz = () => {
    QuestionAPI.getQuizz("fr", {
      id_module: this.props.dataInitQuizz.selectedModule.id_module,
      id_niveau: this.props.dataInitQuizz.selectedNiveau.id_niveau,
    }).then((data: any) => {
      this.setState(
        {
          listQuestion: data.results,
          isLoading: false,
        },
        () => {
          this.chronoComponent.current.startTimer();
          const action_liste = {
            type: "SET_LIST_QUESTION",
            value: this.state.listQuestion,
          };
          this.props.dispatch(action_liste);
        }
      );
    });
  };

  private _onSelect = (question: IQuestion, reponseIds: number[]) => {
    question.selectedReponseIds = reponseIds;
    this.setState({
      hasReponse: question.selectedReponseIds.length > 0,
    });
  };

  private _saveReponse(currentQuestion: IQuestion, iQuestion: number) {
    let curStep: number = this.state.step;
    let currentTotalTime: number = this.chronoComponent.current.getCurrentTime();
    let questionTime: number = currentTotalTime;
    for (let i = 0; i < iQuestion; i++) {
      questionTime -= this.state.listQuestion[i].temps_reponse;
    }
    currentQuestion.temps_reponse = questionTime;
    if (this.state.isPaused) {
      this.chronoComponent.current.startTimer();
    }
    this.setState(
      {
        step: ++curStep,
        hasReponse: false,
        isPaused: false,
      },
      () => {
        if (this.state.step > this.state.listQuestion.length) {
          this.chronoComponent.current.stopTimer();
          QuestionAPI.setReponseQuizz({
            listQuestion: this.state.listQuestion,
            selectedModule: this.props.dataInitQuizz.selectedModule,
            selectedNiveau: this.props.dataInitQuizz.selectedNiveau,
          }).then(() => {
            const action_liste = {
              type: "SET_PAUSE_QUIZZ",
              value: false,
            };
            this.props.dispatch(action_liste);
          });
        }
      }
    );
  }

  private _onPlayVideo = (currentQuestion: IQuestion) => {
    currentQuestion.video_ok = true;
    this.chronoComponent.current.stopTimer();
  };

  private _onPauseVideo = () => {
    this.chronoComponent.current.startTimer();
  };

  private _onStartTimer = () => {
    this.setState({
      isPaused: false,
    });
  };

  private _onStopTimer = (actionClick = false) => {
    this.setState(
      {
        isPaused: true,
      },
      () => {
        if (actionClick && this.state.step <= this.state.listQuestion.length) {
          this._setShowModalPause(true);
        }
      }
    );
  };
  private _setShowModalPause = (show: boolean) => {
    const hasAlreadyPaused = this.state.hasAlreadyPaused;
    const firstPaused = !hasAlreadyPaused && show;
    this.setState(
      {
        showModalPause: show,
        hasAlreadyPaused: true,
      },
      () => {
        if (!show) {
          this.chronoComponent.current.startTimer();
        }
        if (firstPaused) {
          const action_liste = {
            type: "SET_PAUSE_QUIZZ",
            value: true,
          };
          this.props.dispatch(action_liste);
        }
      }
    );
  };

  private _setShowModalHelp = (show: boolean) => {
    this.setState(
      {
        showModalHelp: show,
      },
      () => {
        if (show) {
          this.chronoComponent.current.stopTimer();
        } else {
          this.chronoComponent.current.startTimer();
        }
      }
    );
  };

  private _renderMecanique(item: IQuestion) {
    switch (item.id_mecanique) {
      case 1: // QCM - Choix unique
        return (
          <div>
            <p>Choisissez une réponse.</p>
            <QCM question={item} onSelect={this._onSelect} />
          </div>
        );
      case 2: // QCM - Choix multiple
        return (
          <div>
            <p>Cocher les bonnes réponses</p>
            <QCM question={item} onSelect={this._onSelect} multiple={true} />
          </div>
        );
      case 3: // QCM avec vidéo - Choix unique
        return (
          <div>
            <p>Regardez la vidéo et sélectionnez la bonne réponse.</p>
            <QCMVideo
              question={item}
              onSelect={this._onSelect}
              onPlay={this._onPlayVideo}
              onPause={this._onPauseVideo}
            />
          </div>
        );
      case 4: // QCM avec vidéo - Choix multiple
        return (
          <div>
            <p>Regardez la vidéo et sélectionnez les bonnes réponses.</p>
            <QCMVideo
              question={item}
              onSelect={this._onSelect}
              multiple={true}
              onPlay={this._onPlayVideo}
              onPause={this._onPauseVideo}
            />
          </div>
        );
      case 5: // Remettre dans l'ordre
        return (
          <div>
            <p>
              Cliquez sur les listes de numéros à droite pour remettre les
              étapes dans le bon ordre !
            </p>
            <RemettreOrdre question={item} onSelect={this._onSelect} />
          </div>
        );
      case 6: // QCM avec pictos réponses - Choix unique
        return (
          <div>
            <p>Trouvez l’intrus !</p>
            <QCM question={item} onSelect={this._onSelect} />
          </div>
        );
      case 7: // QCM avec pictos réponses - Choix multiple
        return (
          <div>
            <p>Cliquez sur les vignettes.</p>
            <QCM question={item} onSelect={this._onSelect} multiple={true} />
          </div>
        );
    }
  }

  render() {
    return this.state.isLoading ? (
      <div className={"main-encart"}>
        <div className="p-2 d-flex align-items-center">
          <Spinner animation="grow" variant="primary" size="sm" />
          <p className={" ml-2 mb-0"}>Chargement...</p>
        </div>
      </div>
    ) : (
      <div className={"d-flex flex-column flex-md-row quizz-container"}>
        <div className={"main-quizz w-100"}>
          <h1 className={"color-white d-flex d-md-none justify-content-center"}>
            <img
              src={
                process.env.PUBLIC_URL +
                "/images/question/module/" +
                this.props.dataInitQuizz.selectedModule?.image
              }
              alt={`Illustration module ${this.props.dataInitQuizz.selectedModule?.nom}`}
              className={"ico-titre"}
            />
            {this.props.dataInitQuizz.selectedModule?.nom} -{" "}
            {this.props.dataInitQuizz.selectedNiveau?.nom}
          </h1>
          <div className={"main-encart"}>
            <div className={"d-none d-md-flex mb-2 titre align-items-center"}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/question/module/" +
                  this.props.dataInitQuizz.selectedModule?.image
                }
                alt={`Illustration module ${this.props.dataInitQuizz.selectedModule?.nom}`}
              />
              <div className={"ml-2"}>
                <h2 className={"color-primary-light mb-1"}>
                  {this.props.dataInitQuizz.selectedModule?.nom}{" "}
                  <strong className={"color-primary"}>
                    - {this.props.dataInitQuizz.selectedNiveau?.nom}
                  </strong>
                </h2>
                <p className={"mb-0"}>
                  Question{" "}
                  {this.state.step <= this.state.listQuestion?.length
                    ? this.state.step
                    : this.state.listQuestion?.length}{" "}
                  / {this.state.listQuestion?.length}
                </p>
              </div>
            </div>
            {this.state.step <= this.state.listQuestion?.length ? (
              this.state.listQuestion?.map((item: IQuestion, i: number) => {
                return (
                  <div
                    key={item.id_question}
                    className={`question question${item.id_module} step${
                      i + 1
                    }${i + 1 === this.state.step ? " active" : ""}`}
                  >
                    <h3 className={"mb-1"}>{item.nom}</h3>
                    {this._renderMecanique(item)}
                    <p className={"text-right mb-0 mt-4"}>
                      <Button
                        variant="primary"
                        disabled={!this.state.hasReponse}
                        onClick={() => this._saveReponse(item, i)}
                        className={"btn-submit position-relative"}
                      >
                        Valider ma réponse
                        <span
                          className={`time-loader${
                            this.state.isPaused ? " paused" : ""
                          }`}
                        ></span>
                      </Button>
                    </p>
                  </div>
                );
              })
            ) : (
              <div className={"text-center outro mt-4"}>
                <p className={"text-center mb-5"}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/question/module/astro_" +
                      this.props.dataInitQuizz?.selectedModule?.image
                    }
                    alt={`Illustration module ${this.props.dataInitQuizz?.selectedModule?.nom}`}
                    className={"illustration-module-done"}
                  />
                </p>
                <h2 className={"color-primary-light mb-3 text-center"}>
                  Module terminé !
                </h2>
                <p>Félicitations Explorateur.trice !</p>
                <p className={"mb-0"}>
                  Tu vas maintenant accéder à ton score et aux réponses !
                </p>
                <p className={"text-right mb-0 mt-4"}>
                  <Button
                    variant={"primary"}
                    className={"btn-submit"}
                    href={`#/Jouer/RecapQuizz/${this.props.dataInitQuizz?.selectedModule?.id_module}/${this.props.dataInitQuizz.selectedNiveau?.id_niveau}`}
                  >
                    Voir les résultats
                  </Button>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={"toolbar-right ml-0 ml-md-5 d-flex d-md-block"}>
          <StopWatch
            ref={this.chronoComponent}
            onStopTimer={this._onStopTimer}
            onStartTimer={this._onStartTimer}
            canStopTimer={
              !this.state.hasAlreadyPaused &&
              this.state.step <= this.state.listQuestion?.length
            }
          />
          <Button
            variant={"primary"}
            onClick={() => this._setShowModalHelp(true)}
            className={"mt-md-3"}
          >
            <span className={"d-none d-md-inline"}>Note de mission</span>
            <span className={"d-inline d-md-none"}>
              <FaQuestion />
            </span>
          </Button>
        </div>
        <Modal
          show={this.state.showModalPause}
          onHide={() => this._setShowModalPause(false)}
          dialogClassName="modal-pause"
          centered
        >
          <div className={"content"}>
            <Modal.Body>
              <h2 className={"color-primary"}>
                Une pause pour remettre du carburant ?
              </h2>
              <p>Ne perds plus 1 seconde pour gagner des points !</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => this._setShowModalPause(false)}
              >
                Remonter à bord
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
        <Modal
          show={this.state.showModalHelp}
          onHide={() => this._setShowModalHelp(false)}
          dialogClassName="modal-help"
          centered
        >
          <div className={"content"}>
            <Modal.Body>
              <h2 className={"color-primary"}>Houston, on a un problème !</h2>
              <h4 className={"color-primary-light"}>
                Comment répondre aux questions ?
              </h4>
              <div
                className={
                  "mt-2 d-flex align-items-center justify-content-between"
                }
              >
                <div className={"mt-2 mt-md-0"}>
                  <p className={"p-rep p-chrono"}>
                    <strong>1 minute</strong> pour gagner un bonus
                    supplémentaire
                  </p>
                  <p className={"p-rep p-eclair"}>
                    <strong>Plusieurs réponses sont possibles</strong>
                  </p>
                  <p className={"p-rep p-coeur"}>
                    Choisis entre <strong>A, B, C et/ou D</strong>
                  </p>
                  <p className={"p-rep p-flag mb-0"}>
                    Clique sur <strong>« Valider mes réponses »</strong>
                  </p>
                </div>
                <div className={"d-none d-md-block"}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/astronaute/astro_hello.png"
                    }
                    alt={`Illustration Astronaute`}
                    className={"ico-modal mr-5"}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => this._setShowModalHelp(false)}
              >
                Reçu 5 sur 5 !
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => {
  return {
    currentUser: state.user.currentUser,
    dataInitQuizz: state.quizz,
  };
};
export default connect(mapStateToProps)(Quizz);
