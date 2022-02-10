import React from "react";
import { withTranslation, Trans } from "react-i18next";
import { Button } from "react-bootstrap";
import i18n from '../../../../config/i18n';

import "./style.scss";

const Description = (props) => {
  const { t } = props;

  return (
    <div className="Description d-flex h-100 flex-column justify-content-center px-5 px-md-0 mx-auto">
      <div className="Description__logo mt-4 mb-5">
        <img src={"/images/logo/" + i18n.language + "/logo_gauche_blanc.png"} alt="logo" className={"teams_logo"}/>
      </div>
      <div className="Description__body mb-4 mt-3">
        <div className="Description__body__elt">
          <div className="Description__body__elt__img">
            <img
              src="images/rewards/greenlantern-planet-10x.png"
              alt="greenlantern-planet-10x"
            />
          </div>
          <div className="Description__body__elt__text">
            <Trans i18nKey="landing.description.medals">
              25 <strong>médailles</strong> à collectionner pour exhiber votre talent
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
              200 <strong>questions</strong> pour vous propulser sur Microsoft Teams
            </Trans>
          </div>
        </div>

        <div className="Description__body__elt">
          <div className="Description__body__elt__img">
            <img src="images/rewards/gummystars-10x.png" alt="gummystars-10x" />
          </div>
          <div className="Description__body__elt__text">
            <Trans i18nKey="landing.description.reward">
              Une <strong> récompense d'honneur </strong> pour le meilleur explorateur"
            </Trans>
          </div>
        </div>

        <div className="Description__body__elt">
          <div className="Description__body__elt__img">
            <img src="images/rewards/chest-10x.png" alt="chest-10x" />
          </div>
          <div className="Description__body__elt__text">
            <strong>{t("landing.description.gifts_1")}</strong>
            {t("landing.description.gifts_2")}
          </div>
        </div>
      </div>
      <div className="Description__button">
        <Button
          variant="primary"
          className={`d-inline-block py-3 py-md-2 mt-4 mt-md-2`}
          onClick={props.onClickNext}>
          {t("landing.description.buttonText")}
        </Button>
      </div>
    </div>
  );
};

export default withTranslation()(Description);
