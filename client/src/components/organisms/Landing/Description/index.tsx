import React from "react";
import { withTranslation, Trans } from "react-i18next";

import Button from "components/atoms/Button/Button";

import "./style.scss";

const Description = (props) => {
  const { t } = props;

  return (
    <div className="Description">
      <div className="Description__logo">
        <img src="/images/logo/logo_gauche_blanc.png" alt="logo" />
      </div>
      <div className="Description__body">
        <div className="Description__body__elt">
          <div className="Description__body__elt__img">
            <img
              src="images/rewards/greenlantern-planet-10x.png"
              alt="greenlantern-planet-10x"
            />
          </div>
          <div className="Description__body__elt__text">
            <Trans i18nKey="landing.description.medals">
              25 <b>médailles</b> à collectionner pour exhiber votre talent
              d'explorateur de la collaboration !
            </Trans>
          </div>
        </div>
        <div className="Description__body__elt">
          <div className="Description__body__elt__img">
            <img src="images/rewards/cup-10x.png" alt="cup-10x" />
          </div>
          <div className="Description__body__elt__text">
            <Trans i18nKey="landing.description.questions">
              200 <b>quesstions</b> pour vous propulser sur Microsoft Teams
            </Trans>
          </div>
        </div>

        <div className="Description__body__elt">
          <div className="Description__body__elt__img">
            <img src="images/rewards/gummystars-10x.png" alt="gummystars-10x" />
          </div>
          <div className="Description__body__elt__text">
            <Trans i18nKey="landing.description.reward">
              Une <b> récompense d'honneur </b> pour le meilleur explorateur"
            </Trans>
          </div>
        </div>

        <div className="Description__body__elt">
          <div className="Description__body__elt__img">
            <img src="images/rewards/chest-10x.png" alt="chest-10x" />
          </div>
          <div className="Description__body__elt__text">
            {t("landing.description.gifts")}
          </div>
        </div>
      </div>
      <Button
        text={t("landing.description.buttonText")}
        className="Button__white col-4"
        onClickAction={props.onClickNext}
      />
    </div>
  );
};

export default withTranslation()(Description);
