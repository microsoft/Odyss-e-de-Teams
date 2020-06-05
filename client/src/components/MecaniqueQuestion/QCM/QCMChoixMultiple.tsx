import React, { Component } from "react";
import { Container, Row, Col, ListGroup, Form } from "react-bootstrap";

import {
  IQCMProps,
  IReponse,
  IMecaniqueQuestionState,
} from "src/models/Question";

class QCMChoixMultiple extends Component<IQCMProps, IMecaniqueQuestionState> {
  private _idMecaniqueImg = 7;

  constructor(props: IQCMProps) {
    super(props);
    let selectedReponseIds: number[] = this.props.isRecap
      ? this.props.question.reponse_saisie
      : [];
    this.state = {
      selectedReponseIds: selectedReponseIds,
    };
  }

  private _onSelect = (item: IReponse) => {
    if (this.props.isRecap) {
      return;
    }
    let selectedReponseIds: number[] = [];
    if (
      this.state.selectedReponseIds &&
      this.state.selectedReponseIds.length > 0
    ) {
      if (this.state.selectedReponseIds.indexOf(item.id_reponse) !== -1) {
        //deja present donc action = décocher
        selectedReponseIds = this.state.selectedReponseIds.filter(
          (id) => id !== item.id_reponse
        );
      } else {
        selectedReponseIds = this.state.selectedReponseIds;
        selectedReponseIds.push(item.id_reponse);
      }
    } else {
      selectedReponseIds = [item.id_reponse];
    }
    this.setState(
      {
        selectedReponseIds: selectedReponseIds,
      },
      () => {
        this.props.onSelect(this.state.selectedReponseIds);
      }
    );
  };

  render() {
    const { isRecap } = this.props;

    return this.props.question.id_mecanique === this._idMecaniqueImg ? (
      <Container fluid className={"conteneur-reponse-img"}>
        <Row className={"justify-content-md-center"}>
          {this.props.question?.listReponse?.map(
            (item: IReponse, i: number) => {
              return (
                <Col
                  xs={6}
                  md={3}
                  key={`col-${item.id_reponse}`}
                  className={"mb-4"}
                >
                  <div className={"m-0 p-0 position-relative conteneur-img"}>
                    {isRecap ? (
                      <span></span>
                    ) : (
                      <Form.Check
                        checked={
                          this.state.selectedReponseIds?.indexOf(
                            item.id_reponse
                          ) !== -1
                        }
                        type={"checkbox"}
                        id={`cb-reponse-${item.id_reponse}`}
                        aria-label={`Check réponse`}
                        className={"position-absolute check-img"}
                        onClick={() => this._onSelect(item)}
                        onChange={() => {}}
                      />
                    )}
                    <img
                      src={`${process.env.PUBLIC_URL}/upload/quizz${item.asset}`}
                      alt={item.nom}
                      className={`item-reponse mw-100${
                        isRecap ? "" : " pointer"
                      }
                      ${
                        this.state.selectedReponseIds?.indexOf(
                          item.id_reponse
                        ) !== -1
                          ? " active"
                          : ""
                      }
                      ${
                        isRecap &&
                        this.props.question.reponse?.indexOf(
                          item.id_reponse
                        ) !== -1
                          ? " active-reponse-ok"
                          : ""
                      }`}
                      onClick={() => this._onSelect(item)}
                    />
                  </div>
                </Col>
              );
            }
          )}
        </Row>
      </Container>
    ) : (
      <ListGroup>
        {this.props.question?.listReponse?.map((item: IReponse, i: number) => {
          return (
            <ListGroup.Item
              key={item.id_reponse}
              className={`my-2 d-flex align-items-center${
                isRecap ? "" : " pointer"
              }
              ${
                this.state.selectedReponseIds?.indexOf(item.id_reponse) !== -1
                  ? " active"
                  : ""
              }
              ${
                isRecap &&
                this.props.question.reponse?.indexOf(item.id_reponse) !== -1
                  ? " active-reponse-ok"
                  : ""
              }`}
              onClick={() => this._onSelect(item)}
            >
              {isRecap ? (
                <span></span>
              ) : (
                <Form.Check
                  checked={
                    this.state.selectedReponseIds?.indexOf(item.id_reponse) !==
                    -1
                  }
                  type={"checkbox"}
                  id={`cb-reponse-${item.id_reponse}`}
                  aria-label={`Check réponse`}
                  onClick={() => this._onSelect(item)}
                  onChange={() => {}}
                />
              )}
              <p className={"mb-0 num_reponse"}>
                <img
                  alt={`Reponse ${i + 1}`}
                  src={`${
                    process.env.PUBLIC_URL
                  }/images/question/reponse/reponse${i + 1}.png`}
                />
              </p>
              <p className={"mb-0 pl-2"}>{item.nom}</p>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

export default QCMChoixMultiple;
