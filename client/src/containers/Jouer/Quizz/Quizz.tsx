import React, { Component } from "react";
import { connect } from "react-redux";

import IStore from "src/store/IStore";
import { IQuizzProps } from "src/models/Question";

import "./Quizz.scss";

class Quizz extends Component<IQuizzProps, {}> {
  constructor(props: IQuizzProps) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <h1 className={"color-primary d-none d-md-block"}>QUIZZ</h1>
        <h1 className={"color-white d-flex d-md-none justify-content-center"}>
          <img
            src={process.env.PUBLIC_URL + "/images/icone/cup.png"}
            alt="Ico Classement Général"
            className={"ico-titre"}
          />
          QUIZZ
        </h1>
        <div className={"main-encart nobg-mobile main-quizz"}>GO</div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => {
  return {
    currentUser: state.user.currentUser,
    dataInitQuizz: state.question,
  };
};
export default connect(mapStateToProps)(Quizz);
