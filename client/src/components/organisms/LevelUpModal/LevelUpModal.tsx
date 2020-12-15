import React from "react";
import { Modal, Button } from "react-bootstrap";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
//@ts-ignore
import { fadeIn, fadeOut } from "react-animations";

import UserAvatar from "components/UserAvatar/UserAvatar";
import LevelBar from "components/molecules/LevelBar/LevelBar";

import { ILevelUp, IUser, IReward } from "models/User";
import IStore from "store/IStore";

import "./LevelUpModal.scss";

const fadeInAnimation = keyframes`${fadeIn}`;
const fadeOutAnimation = keyframes`${fadeOut}`;

const FadeInCoffre = styled.div`
  opacity: 0;
  animation-duration: 0.75s;
  animation-delay: 0s;
  animation-name: ${fadeInAnimation};
  animation-fill-mode: forwards;
`;
const FadeOutImgCoffre = styled.div`
  opacity: 1;
  animation-duration: 0.25s;
  animation-delay: 2s;
  animation-name: ${fadeOutAnimation};
  animation-fill-mode: forwards;
`;
const FadeInRewards = styled.div`
  opacity: 0;
  animation-duration: 1.25s;
  animation-delay: 0s;
  animation-name: ${fadeInAnimation};
  animation-fill-mode: forwards;
`;
const FadeButtonCollect = styled.div`
  display: none;
  opacity: 0;
  animation-duration: 1.25s;
  animation-delay: 0s;
  animation-name: ${fadeInAnimation};
  animation-fill-mode: forwards;
`;

interface LevelUpModalProps extends WithTranslation {
  currentUser: IUser;
  dataLevelUp: ILevelUp;
  setLevelUpChecked: any;
  show: boolean;
}

interface LevelUpModalState {
  rewardCollected: boolean;
}

class LevelUpModal extends React.Component<
  LevelUpModalProps,
  LevelUpModalState
  > {
  constructor(props: LevelUpModalProps) {
    super(props);
    this.state = {
      rewardCollected: false,
    };
  }

  componentDidUpdate() {
    if (this.props.show) {
      const e = document.getElementById("div_niveau");
      if (e && document.getElementById("div_coffre")) {
        e.addEventListener(
          "animationend",
          (ev) => {
            if (ev.type === "animationend") {
              e.style.display = "none";
              document.getElementById("div_coffre").style.display = "block";
              const divImg = document.getElementById("div_coffre_img");
              divImg.addEventListener("animationend", (evImg) => {
                if (evImg.type === "animationend") {
                  divImg.style.display = "none";
                  document.getElementById("div_coffre_rewards").style.display =
                    "block";
                  document.getElementById("div_btn_footer").style.display =
                    "block";
                }
              });
            }
          },
          false
        );
      } else {
        if (document.getElementById("div_btn_footer")) {
          document.getElementById("div_btn_footer").style.display = "block";
        }
      }
    }
  }

  private _collectReward = () => {
    this.setState({
      rewardCollected: true,
    });
  };

  private _setLevelUpChecked = () => {
    this.setState({
      rewardCollected: false,
    }, () => {
      this.props.setLevelUpChecked();
    });
  }

  private _renderImgReward(reward: IReward) {
    switch (reward.type) {
      case "MEDAL":
        return (
          <img
            src={
              process.env.PUBLIC_URL +
              "/images/medaille/reward_" +
              this.props.dataLevelUp?.medaille?.image
            }
            alt="Médaille"
            className={"img-reward"}
          />
        );
      case "EXP":
        return (
          <img
            src={process.env.PUBLIC_URL + "/images/icone/coin_xp_brillance.png"}
            alt="EXP"
            className={"img-reward"}
          />
        );
      case "PTS":
        return (
          <img
            src={process.env.PUBLIC_URL + "/images/icone/coin_brillance.png"}
            alt="Points"
            className={"img-reward"}
          />
        );
    }
  }

  render() {
    const {
      t,
      tReady,
      dataLevelUp,
      currentUser,
      show,
    } = this.props;

    let FadeOutNiveau = styled.div`
      opacity: 1;
      animation-duration: 0.75s;
      animation-delay: 2s;
      animation-name: ${fadeOutAnimation};
      animation-fill-mode: forwards;
    `;
    if (!dataLevelUp?.rewards) {
      // pas animation si pas reward
      FadeOutNiveau = styled.div`
        opacity: 1;
      `;
    }
    return (
      <Modal
        show={show}
        onHide={() => this._setLevelUpChecked()}
        dialogClassName="modal-level-up"
        centered
      >
        <Modal.Body>
          <div
            className={`LevelUpModal${dataLevelUp?.rewards ? " has-reward" : ""
              }`}
          >
            <h2 className={"color-primary text-center mb-4"}>
            {tReady && t("modal.reward_levelup.rewards")}
            </h2>
            {this.state.rewardCollected &&
              dataLevelUp?.rewards &&
              dataLevelUp?.rewards.find((r) => r.type === "EXP") ? (
                <FadeInCoffre>
                  <div
                    className={`content-avatar reward reward-exp mx-auto text-center`}
                  >
                    <UserAvatar user={currentUser} />
                    <h1 className={`titre-reward mt-2 mb-0 color-primary-light`}>
                      +{dataLevelUp?.rewards.find((r) => r.type === "EXP")?.value}{" "}
                    EXP
                  </h1>
                    <p className={"color-primary-light mb-0"}>
                      <small>
                        {tReady && t("modal.reward_levelup.desc_exp")}
                      </small>
                    </p>
                    <LevelBar
                      currentXP={currentUser.nb_xp}
                      nextXP={dataLevelUp?.nextLevel?.nb_xp}
                      nextLevel={dataLevelUp?.nextLevel?.level}
                      src={"levelup"}
                    />
                  </div>
                </FadeInCoffre>
              ) : (
                <div>
                  <FadeOutNiveau
                    className={"LevelUpModal__Niveau"}
                    id="div_niveau"
                  >
                    <div className="LevelUpModal__Niveau__body">
                      <div
                        className={
                          "LevelUpModal__Niveau__body__Avatar mx-auto content-avatar"
                        }
                      >
                        <UserAvatar user={currentUser} withoutName={true} />
                      </div>
                      <h2 className={"color-primary-light text-center pt-2"}>
                      {tReady && t("modal.reward_levelup.congrat")}
                    </h2>
                      <h4 className={"color-primary-light text-center"}>
                      {tReady && t("modal.reward_levelup.level_up")} {dataLevelUp?.level} !
                    </h4>
                    </div>
                  </FadeOutNiveau>
                  {dataLevelUp?.rewards && (
                    <FadeInCoffre
                      className={"LevelUpModal__Coffre"}
                      id="div_coffre"
                    >
                      <FadeOutImgCoffre
                        className={
                          "LevelUpModal__Coffre__Img mx-auto text-center"
                        }
                        id="div_coffre_img"
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/rewards/coffre_niveau.png"
                          }
                          alt="Coffre"
                        />
                      </FadeOutImgCoffre>
                      <FadeInRewards
                        className={"LevelUpModal__Coffre__Rewards mt-2"}
                        id="div_coffre_rewards"
                      >
                        <div
                          className={
                            "d-flex flex-column flex-md-row justify-content-md-center"
                          }
                        >
                          {dataLevelUp?.rewards.map((reward, index) => (
                            <div
                              className={`reward reward-${reward.type?.toLowerCase()} text-center mt-2`}
                              key={`reward${index}`}
                            >
                              <p className={"mb-0 text-center"}>
                                {this._renderImgReward(reward)}
                              </p>
                              {reward.type === "MEDAL" && (
                                <div>
                                  <h3
                                    className={`titre-reward mt-2 mb-0 color-primary-light`}
                                  >
                                     {tReady && t("modal.reward_levelup.medal")}
                                </h3>
                                  <p className={"color-primary-light"}>
                                    <small>
                                      {tReady &&
                                        t("modal.reward_levelup.desc_medal")}
                                    </small>
                                  </p>
                                </div>
                              )}
                              {reward.type === "EXP" && (
                                <div>
                                  <h3
                                    className={`titre-reward mt-2 mb-0 color-primary-light`}
                                  >
                                    +{reward.value} EXP
                                </h3>
                                  <p className={"color-primary-light"}>
                                    <small>
                                      {tReady &&
                                        t("modal.reward_levelup.desc_exp")}
                                    </small>
                                  </p>
                                </div>
                              )}
                              {reward.type === "PTS" && (
                                <div>
                                  <h3
                                    className={`titre-reward mt-2 mb-0 color-primary-light`}
                                  >
                                    +{reward.value} PTS
                                </h3>
                                  <p className={"color-primary-light"}>
                                    <small>
                                      {tReady &&
                                        t("modal.reward_levelup.desc_pts")}
                                    </small>
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </FadeInRewards>
                      <h2 className={"color-primary-light text-center pt-2"}>
                        {tReady && t("modal.reward_levelup.incredible")}
                      </h2>
                      <h4 className={"color-primary-light text-center"}>
                        {tReady && t("modal.reward_levelup.discoverd")}
                        <br />
                        {tReady && t("modal.reward_levelup.chest")}
                      </h4>
                    </FadeInCoffre>
                  )}
                </div>
              )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <FadeButtonCollect id={"div_btn_footer"}>
            {dataLevelUp?.rewards && !this.state.rewardCollected ? (
              <Button variant="primary" onClick={() => this._collectReward()}>
                {tReady && t("modal.reward_levelup.collect_reward")}
              </Button>
            ) : (
                <Button variant="primary" onClick={() => this._setLevelUpChecked()}>
                  {tReady && t("modal.reward_levelup.confirm_reward")}
                </Button>
              )}
          </FadeButtonCollect>
        </Modal.Footer>
      </Modal>
    );
  }
}
const mapStateToProps = (state: IStore) => {
  return {
    currentUser: state.user.currentUser,
  };
};
export default withTranslation()(connect(mapStateToProps)(LevelUpModal));
