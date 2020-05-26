import React from "react";
import { withTranslation } from "react-i18next";

import { Form, Button } from "react-bootstrap";

import "./style.scss";

const CGU = (props) => {
  const { t, onClickNext } = props;

  const isMobile = window.innerWidth < 768;

  return (
    <div className="CGU d-flex flex-column align-items-center justify-content-center h-100 mx-auto">
      {isMobile && (
        <div className="CGU__logo">
          <img src="/images/logo/logo_gauche_blanc.png" alt="logo" />
        </div>
      )}
      <div className="CGU__container p-4 m-2 m-md-0">
        <div className="CGU__container__title mb-4">{t("landing.CGU.title")}</div>

        <div className="CGU__container__body mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          tempus at eros id porttitor. Integer tellus felis, rhoncus sed nulla
          sed, sodales tempus sapien. Quisque convallis in nunc vel laoreet.
          Nunc faucibus ligula vel lectus tempor, a tristique augue tempus. In
          quis finibus erat. In posuere, tortor quis lobortis euismod, neque
          urna commodo erat, vel fermentum arcu ex in erat. Fusce iaculis libero
          malesuada cursus vestibulum. Vivamus suscipit orci diam, sit amet
          vulputate libero congue in. Fusce non ultricies lorem, a maximus est.
          Curabitur convallis pharetra tristique. Cras semper diam odio, vel
          vestibulum orci porttitor ut. Donec pellentesque eros quam, rhoncus
          fermentum ligula laoreet in. Quisque tincidunt turpis vel sagittis
          consectetur. Nunc tincidunt, lacus accumsan posuere luctus, velit erat
          tempor lorem, quis sodales turpis tellus at magna. Vivamus ullamcorper
          sapien eu purus efficitur commodo. Mauris sed urna ut sem elementum
          condimentum non quis lacus. Ut lacinia ligula mi, ut tempus urna
          varius sit amet. Phasellus ac augue luctus, efficitur quam nec,
          venenatis lacus. Donec ante tortor, tristique egestas erat sed,
          pulvinar rutrum nisi. Praesent efficitur, lacus eget euismod iaculis,
          arcu lectus sollicitudin ex, vel bibendum orci sem vel ante.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos. Integer accumsan ante
          erat, vitae volutpat felis lobortis eu. Cras blandit libero eu nulla
          tempor, eu posuere felis finibus. Aenean augue nisi, facilisis ut
          eleifend a, tristique eu dolor. Nullam mi nibh, luctus nec quam non,
          dictum fermentum metus. Morbi ut aliquet sem. Donec laoreet enim leo.
          Quisque posuere massa sem, elementum maximus turpis porta in. Sed
          placerat posuere pulvinar. Pellentesque ornare, dui vel tempor
          blandit, mi nunc molestie diam, vel eleifend tellus elit ac diam.
          Vestibulum hendrerit sed mauris gravida consequat. Cras ac odio sit
          amet urna dapibus blandit. Nulla auctor et sem et finibus. Quisque
          fringilla nunc id mauris consectetur ullamcorper. In risus nisl,
          euismod vitae faucibus sit amet, aliquet a nisl. Sed egestas convallis
          lorem a efficitur. Vivamus malesuada vitae lacus vel mattis. Quisque
          auctor mauris ipsum, in feugiat diam vulputate eu. Sed at mattis
          risus. Aenean lacinia dolor ac gravida pulvinar. Sed blandit dapibus
          ex, efficitur vehicula felis semper quis. Donec fringilla tempus
          congue. Nulla blandit tempus elit, eu elementum eros tincidunt quis.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Nulla facilisi. Phasellus placerat, metus sit
          amet rutrum scelerisque, justo quam tempus nisl, sit amet gravida arcu
          felis id lacus. In viverra mi sed quam mattis bibendum. Nullam egestas
          bibendum commodo. Sed pulvinar nibh nulla, quis suscipit enim accumsan
          et. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Nam nec massa gravida, volutpat metus
          nec, porttitor sem. Donec ac pretium orci. Fusce euismod justo eros,
          lobortis fringilla justo fringilla vitae. Morbi vitae neque malesuada
          dolor lacinia convallis non ut ex. Suspendisse convallis nec metus sed
          imperdiet. Nullam in massa vel risus sodales pulvinar. Aliquam in quam
          diam. Integer sit amet sagittis turpis.
        </div>

        <div className="CG__container__form">
          <Form className="CGU__container__form mb-0">
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label={t("landing.CGU.acknowledge")}
              />
            </Form.Group>

            {!isMobile && (
              <Button
                variant="light"
                className="py-3 py-md-2"
                onClick={onClickNext}
              >
                {t("landing.CGU.buttonText")}
              </Button>
            )}
          </Form>
        </div>
      </div>
      {isMobile && (
        <div className="CGU__container__mobile--actions">
          <Button
            variant="primary"
            className="btn__orange-gradiant py-3 py-md-2 w-100"
            onClick={onClickNext}
          >
            {t("landing.CGU.buttonText")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default withTranslation()(CGU);
