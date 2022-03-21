import React, { Component } from "react";
import { Container, Row, Col, ListGroup, Form } from "react-bootstrap";

import {
  IQCMProps,
  IReponse,
  IMecaniqueQuestionState,
} from "models/Question";

class QCMChoixUnique extends Component<IQCMProps, IMecaniqueQuestionState> {
  private _idMecaniqueImg = 6;

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
    selectedReponseIds = [item.id_reponse];
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
                  <div
                    className={`m-0 p-0 position-relative conteneur-img${
                      !isRecap &&
                      this.state.selectedReponseIds?.indexOf(
                        item.id_reponse
                      ) !== -1
                        ? " img-active"
                        : ""
                    }`}
                  >
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
                    {isRecap ? (
                      <span></span>
                    ) : (
                      <Form.Check
                        checked={
                          this.state.selectedReponseIds?.indexOf(
                            item.id_reponse
                          ) !== -1
                        }
                        type={"radio"}
                        id={`cb-reponse-${item.id_reponse}`}
                        aria-label={`Check réponse`}
                        className={"position-relative check-img text-center mt-2 w-100 p-0"}
                        onClick={() => this._onSelect(item)}
                        onChange={() => {}}
                      />
                    )}
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

export default QCMChoixUnique;
