import React, { Component } from "react";
import { WithTranslation, withTranslation, Trans } from "react-i18next";

import { Row, Col } from "react-bootstrap";

import "./Cockpit.scss";

import LaunchFollowWidget from "components/molecules/Widgets/CampaignFollow";

import BonusEXPMobile from "components/molecules/MobileWidgets/BonusExp";
import CampaignFollowMobile from "components/molecules/MobileWidgets/CampaignFollow";
import GameLauncherMobile from "components/molecules/MobileWidgets/GameLauncher";
import LinksMobile from "components/molecules/MobileWidgets/Links";

import UserAPI from "api/User";
import { Link } from "react-router-dom";

interface ICockpit {
  isMobile: boolean;
}

class Cockpit extends Component<WithTranslation & ICockpit, {}> {
  state = {
    campaign: {
      name: "",
      date_end: "",
    },
    loading: true,
  };

  async componentDidMount() {
    try {
      const campainInfo = await UserAPI.getCurrentCampaignInfo();
      this.setState({
        campaign: {
          name: campainInfo.results.mission_name,
          date_end: campainInfo.results.mission_end.replace("T", " "),
        },
        loading: false,
      });
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    const { t, tReady, isMobile } = this.props;
    const { loading, campaign } = this.state;

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
              translationDescKey="player.cockpit.campain_desc"
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

            <div className="Cockpit__exp col-3 p-4">
              <div className="Cockpit__exp__container">
                <div className="Cockpit__exp__container__icon">
                  <img src="/images/icone/exp-bonus.png" alt="exp-bonus" />
                </div>
                <div className="Cockpit__exp__container__title">
                  +150 {tReady && t("player.cockpit.exp_points_desc")}
                </div>
              </div>
              <div className="Cockpit__exp__container__text">
                {tReady && t("player.cockpit.exp_daily_bonus")}
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
        </div>
      );
    else
      return (
        <div className="Cockpit pb-4">
          <h1 className="color-primary Cockpit__title mt-4 col-12">
            {tReady && t("player.cockpit.title")}
          </h1>

          <BonusEXPMobile className="col-12 mt-4" bonus={150} />

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
        </div>
      );
  }
}

export default withTranslation()(Cockpit);

// <LaunchFollowWidget
//   className="col-12 p-4 Mobile_launchFollowWidget"
//   campaign_name={campaign.name}
//   campaign_end={campaign.date_end}
//   translationDescKey="player.cockpit.campain_desc"
// />

// <Row className="col-12">
//   <div className="Cockpit__mission">
//     <div className="Cockpit__mission__title">
//       Mission : « {campaign.name} !» en cours !
//               </div>

//     <div className="Cockpit__mission__desc">
//       <Trans i18nKey="player.cockpit.campaign_desc">
//         Cumulez des points au classement en répondant chaque semaine
//         aux nouveaux modules de questions Teams et tentez de remporter
//                   un <strong>Surface Headphone</strong> d'une valeur de 300,00
//                   euros et de nombreux cadeaux ! "
//                 </Trans>
//     </div>
//   </div>
// </Row>
