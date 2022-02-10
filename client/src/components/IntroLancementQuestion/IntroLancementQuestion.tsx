import React, { Component } from "react";
import { Button } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
//@ts-ignore
import { fadeIn } from "react-animations";

import { withTranslation, WithTranslation } from "react-i18next";

import { IIntroLancementQuestionProps } from "src/models/Question";

import "./IntroLancementQuestion.scss";

const fadeInAnimation = keyframes`${fadeIn}`;

const FadeInIntro = styled.div`
  opacity: 0;
  animation-duration: 0.5s;
  animation-delay: 0.25s;
  animation-name: ${fadeInAnimation};
  animation-fill-mode: forwards;
`;

class IntroLancementQuestion extends Component<
  IIntroLancementQuestionProps & WithTranslation,
  {}
  > {
  private _onClick = () => {
    this.props.onValid();
  };

  render() {
    const {
      t
    } = this.props;
    return (
      <FadeInIntro>
        <div className={"d-flock d-md-none mb-3"}>
          <div className={"d-flex titre align-items-center"}>
            <img
              src={
                process.env.PUBLIC_URL +
                "/images/question/module/" +
                this.props.selectedModule?.image
              }
              alt={`Illustration module ${this.props.selectedModule?.nom}`}
            />
            <div className={"ml-2"}>
              <h2 className={"color-white1"}>
                {this.props.selectedModule?.nom}{" "}
                <strong className={"color-white1"}>
                  - {this.props.selectedNiveau?.nom}
                </strong>
              </h2>
            </div>
          </div>
          <h1 className={"text-center mt-3"}>{t("intro_question.title")}</h1>
        </div>
        <div className={"main-intro m-0 px-4 py-4 px-md-0 pt-md-0 pb-md-2"}>
          <div className={"d-none d-md-flex mb-2 titre align-items-center"}>
            <img
              src={
                process.env.PUBLIC_URL +
                "/images/question/module/" +
                this.props.selectedModule?.image
              }
              alt={`Illustration module ${this.props.selectedModule?.nom}`}
            />
            <div className={"ml-2"}>
              <h2 className={"color-primary-light mb-1"}>
                {this.props.selectedModule?.nom}{" "}
                <strong className={"color-primary"}>
                  - {this.props.selectedNiveau?.nom}
                </strong>
              </h2>
              <p className={"mb-0"}>{t("intro_question.subtitle")}</p>
            </div>
          </div>
          <h4 className={"d-none d-md-block mt-md-3 mb-2"}>
            {t("intro_question.intro")}
          </h4>
          <p className={"text-center mb-0"}>
            <img
              src={process.env.PUBLIC_URL + "/images/question/chronometre.png"}
              alt={`Illustration Chronometre`}
              className={"illustration-chronometre my-3 d-none d-md-inline"}
            />
            <img
              src={
                process.env.PUBLIC_URL +
                "/images/question/chronometre_mobile.png"
              }
              alt={`Illustration Chronometre`}
              className={"illustration-chronometre my-3 d-inline d-md-none"}
            />
          </p>
          <p className={"text-center content mx-auto"}>
          {t("intro_question.explanation_start")}{" "}
            <strong className={"color-primary-light"}>
            {t("intro_question.explanation_middle")}
            </strong>
            .
          </p>
          <p className={"text-center content mx-auto"}>
          {t("intro_question.explanation_end")}
          </p>
        </div>
        <p className={"btn-next pb-md-4"}>
          <Button
            variant="primary"
            className={"d-inline-block"}
            onClick={() => this._onClick()}
          >
            {t("intro_question.start_explore")}
          </Button>
        </p>
      </FadeInIntro>
    );
  }
}

export default withTranslation()(IntroLancementQuestion);
