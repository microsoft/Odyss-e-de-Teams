import React, { Component } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Row, Modal, Button } from "react-bootstrap";

import "./Cockpit.scss";

import LaunchFollowWidget from "components/molecules/Widgets/CampaignFollow";

import BonusEXPMobile from "components/molecules/MobileWidgets/BonusExp";
import CampaignFollowMobile from "components/molecules/MobileWidgets/CampaignFollow";
import GameLauncherMobile from "components/molecules/MobileWidgets/GameLauncher";
import LinksMobile from "components/molecules/MobileWidgets/Links";

// modals
import RewardModal from "components/organisms/RewardModal";
import RewardModalMobile from "components/organisms/RewardModalMobile";

import UserAPI from "api/User";
import { Link } from "react-router-dom";
import IStore from "store/IStore";

interface ICockpit {
  isMobile: boolean;
}

class Cockpit extends Component<WithTranslation & ICockpit, {}> {
  state = {
    campaign: {
      name: "",
      date_end: "",
    },
    currentBonus: {
      day: null,
      type: null,
      value: null,
    },
    allRewards: [],
    showModal: false,
    showModalMobile: false,
    loading: true,
  };

  async componentDidMount() {
    try {
      const campainInfo = await UserAPI.getCurrentCampaignInfo();
      const rewardsInfo = await UserAPI.getCurrentReward();

      const rewards = [];

      rewardsInfo.before.forEach((elem) => {
        elem.done = true;
        elem.current = false;

        if (elem.type === "PTS") {
          elem.iconPath = "/images/icone/pts-bonus.png";
          elem.text = "player.cockpit.bonus.pts";
        } else if (elem.type === "EXP") {
          elem.iconPath = "/images/icone/exp-bonus.png";
          elem.text = "player.cockpit.bonus.exp";
        } else {
          // img stockée dans le fichier json côté serveur
          elem.iconPath = "/images/medaille/" + elem.img;
          elem.text = "player.cockpit.bonus.medal";
          elem.value = 1;
        }

        rewards.push(elem);
      });

      if (rewardsInfo.current.type === "PTS") {
        rewardsInfo.current.iconPath = "/images/icone/pts-bonus.png";

        rewardsInfo.current.text = "player.cockpit.bonus.pts";
      } else if (rewardsInfo.current.type === "EXP") {
        rewardsInfo.current.iconPath = "/images/icone/exp-bonus.png";

        rewardsInfo.current.text = "player.cockpit.bonus.exp";
      } else {
        rewardsInfo.current.iconPath =
          "/images/medaille/" + rewardsInfo.current.img;
        rewardsInfo.current.value = 1;

        rewardsInfo.current.text = "player.cockpit.bonus.medal";
      }
      rewardsInfo.current.current = true;
      rewardsInfo.current.done = false;

      rewards.push(rewardsInfo.current);

      //after
      rewardsInfo.after.forEach((elem) => {
        elem.done = false;
        elem.current = false;

        if (elem.type === "PTS") {
          elem.iconPath = "/images/icone/pts-bonus.png";

          elem.text = "player.cockpit.bonus.pts";
        } else if (elem.type === "EXP") {
          elem.iconPath = "/images/icone/exp-bonus.png";

          elem.text = "player.cockpit.bonus.exp";
        } else {
          elem.iconPath = "/images/medaille/" + elem.img;
          elem.value = 1;

          elem.text = "player.cockpit.bonus.medal";
        }

        rewards.push(elem);
      });

      this.setState({
        campaign: {
          name: campainInfo.results.mission_name,
          date_end: campainInfo.results.mission_end.replace("T", " "),
        },
        currentBonus: {
          day: rewardsInfo.current.day,
          type: rewardsInfo.current.type,
          value: rewardsInfo.current.value,
        },
        allRewards: rewards,
        loading: false,
      });
    } catch (e) {
      console.error(e);
    }
  }

  private _setShowModal = (show: boolean) => {
    this.setState({
      showModal: show,
    });
  };

  private _setShowModalMobile = (show: boolean) => {
    this.setState({
      showModalMobile: show,
    });
  };

  render() {
    const { t, tReady, isMobile } = this.props;
    const { loading, campaign, currentBonus } = this.state;

    let bonusDescription = null;
    if (this.state.currentBonus.type === "EXP") {
      bonusDescription = "EXP";
    }

    if (loading) return <> Loading ... </>;
    else if (!isMobile)
      return (
        <div className="Cockpit mt-4">
          <h1 className="color-primary">
            {tReady && t("player.cockpit.title")}
          </h1>

          <Row className="col-12">
            <LaunchFollowWidget
              className="col-12 p-4"
              campaign_name={campaign.name}
              campaign_end={campaign.date_end}
              translationDescKey="player.cockpit.campaign_desc"
            />
          </Row>

          <Row className="row col-12 d-flex align-items-center justify-content-between mt-4">
            <Link to={"/Jouer"} className={`no-hover col-8 p-0`}>
              <div className="Cockpit__game col-12 p-4">
                <div className="Cockpit__game__container">
                  <div className="Cockpit__game__container__name">
                    {tReady && t("player.cockpit.start_game")}
                  </div>
                  <div className="Cockpit__game__container__desc">
                    {tReady && t("player.cockpit.start_game_desc")}
                  </div>
                </div>
                <div className="Cockpit__game__icon">
                  <img src="/images/icone/joyaux.png" alt="joyaux" />
                </div>
              </div>
            </Link>

            <div
              className="Cockpit__exp col-3 p-4"
              onClick={() => this._setShowModal(true)}
            >
              <div className="Cockpit__exp__container">
                <div className="Cockpit__exp__container__icon">
                  <img src="/images/icone/exp-bonus.png" alt="exp-bonus" />
                </div>
                <div className="Cockpit__exp__container__text">
                  <div className="Cockpit__exp__container__text__title">
                    +{currentBonus.value}{" "}
                    {tReady &&
                      t(`player.cockpit.bonus_desc_${currentBonus.type}`)}
                  </div>

                  <div className="Cockpit__exp__container__text__desc">
                    {tReady && t("player.cockpit.exp_daily_bonus")}
                  </div>
                </div>
              </div>
            </div>
          </Row>

          <div className="row col-12 p-0 Cockpit__links mt-4">
            <Link className="no-hover col-4" to="/Classement">
              <div className="Cockpit__links__item col-12 p-4">
                <div className="Cockpit__links__item__icon">
                  <img alt="Cup" src="images/icone/cup.png" />
                </div>

                <div className="Cockpit__links__item__text">
                  <div className="Cockpit__links__item__text__content">
                    {tReady && t("player.cockpit.ranking_title")}
                  </div>
                  <div className="Cockpit__links__item__text__desc">
                    {tReady && t("player.cockpit.ranking_desc")}
                  </div>
                </div>
              </div>
            </Link>

            <Link className="no-hover col-4" to="/Profil">
              <div className="Cockpit__links__item col-12 p-4">
                <div className="Cockpit__links__item__icon">
                  <img alt="Cup" src="images/icone/monde.png" />
                </div>

                <div className="Cockpit__links__item__text">
                  <div className="Cockpit__links__item__text__content">
                    {tReady && t("player.cockpit.profile_title")}
                  </div>
                  <div className="Cockpit__links__item__text__desc">
                    {tReady && t("player.cockpit.profile_desc")}
                  </div>
                </div>
              </div>
            </Link>

            <Link className="no-hover col-4" to="/Regles">
              <div className="Cockpit__links__item col-12 p-4">
                <div className="Cockpit__links__item__icon">
                  <img alt="Cup" src="images/icone/bouclier.png" />
                </div>

                <div className="Cockpit__links__item__text">
                  <div className="Cockpit__links__item__text__content">
                    {tReady && t("player.cockpit.rules_title")}
                  </div>
                  <div className="Cockpit__links__item__text__desc">
                    {tReady && t("player.cockpit.rules_desc")}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <Modal
            show={this.state.showModal}
            onHide={() => this._setShowModal(false)}
            dialogClassName="modal-cockpit"
            centered
          >
            <Modal.Body>
              <RewardModal
                bonus={this.state.allRewards}
                currentBonus={this.state.currentBonus}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => this._setShowModal(false)}
              >
                {tReady && t("modal.confirm_reward")}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    else
      return (
        <div className="Cockpit pb-4">
          <h1 className="color-primary Cockpit__title mt-4 col-12">
            {tReady && t("player.cockpit.title")}
          </h1>

          <div onClick={() => this._setShowModalMobile(true)}>
            <BonusEXPMobile
              className="col-12 mt-4"
              bonus={this.state.currentBonus.value}
              bonusDesc={`${this.state.currentBonus.type.toLowerCase()}_mobile`}
            />
          </div>
          <CampaignFollowMobile
            className="col-12 mt-4"
            timerEnd={campaign.date_end}
            campaignName={campaign.name}
          />

          <Link to="/Jouer" className="no-hover">
            <GameLauncherMobile className="col-12 mt-4" />
          </Link>

          <Link to="/Classement" className="no-hover">
            <LinksMobile
              className="col-12 mt-4 rotate-cup"
              iconPath="/images/icone/cup.png"
              i18nTitleKey="player.cockpit.ranking_title"
              i18nDescriptionKey="player.cockpit.ranking_desc"
            />
          </Link>
          <Link to="/Profil" className="no-hover">
            <LinksMobile
              className="col-12 mt-4"
              iconPath="/images/icone/monde.png"
              i18nTitleKey="player.cockpit.profile_title"
              i18nDescriptionKey="player.cockpit.profile_desc"
            />
          </Link>
          <Link to="/Regles" className="no-hover">
            <LinksMobile
              className="col-12 mt-4 fixheight-mobile"
              iconPath="/images/icone/bouclier.png"
              i18nTitleKey="player.cockpit.rules_title"
              i18nDescriptionKey="player.cockpit.rules_desc"
            />
          </Link>
          <Modal
            show={this.state.showModalMobile}
            onHide={() => this._setShowModalMobile(false)}
            dialogClassName="modal-mobile"
          >
            <Modal.Body>
              <RewardModalMobile
                bonus={this.state.allRewards}
                currentBonus={this.state.currentBonus}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="warning"
                className="mobile-button"
                onClick={() => this._setShowModalMobile(false)}
              >
                {tReady && t("modal.confirm_reward")}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
  }
}

const mapStateToProps = (state: IStore) => {
  return {
    currentUser: state.user.currentUser,
  };
};
export default withTranslation()(connect(mapStateToProps)(Cockpit));

// export default withTranslation()(Cockpit);
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withTranslation()(Component));
