import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

import { IMecaniqueQuestionProps, IReponse, IMecaniqueQuestionState } from "src/models/Question";

import "./QCMUnique.scss";

class QCMUnique extends Component<IMecaniqueQuestionProps, IMecaniqueQuestionState> {
  constructor(props: IMecaniqueQuestionProps) {
    super(props);
    this.state = {
      selectedReponseIds: [],
    };
  }

  private _onSelect = (item: IReponse) => {
    this.setState({
      selectedReponseIds: [item.id_reponse],
    }, () => {
      this.props.onSelect(item, this.state.selectedReponseIds);
    });
  }
  render() {
    return (
      <ListGroup className={"conteneur-reponse"}>
        {this.props.question?.listReponse?.map((item: IReponse, i: number) => {
          return (
            <ListGroup.Item key={item.id_reponse} className={`my-2 d-flex align-items-center pointer${this.state.selectedReponseIds?.indexOf(item.id_reponse) !== -1 ? ' active' : ''}`} onClick={() => this._onSelect(item)}>
              <p className={"mb-0 num_reponse"}>
                <img alt={`Reponse ${i+1}`} src={`${process.env.PUBLIC_URL}/images/question/reponse/reponse${i+1}.png`} />
              </p>
              <p className={"mb-0 pl-2"}>
                {item.nom}
              </p>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

export default QCMUnique;
