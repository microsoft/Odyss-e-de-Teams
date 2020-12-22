import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { withTranslation, WithTranslation } from "react-i18next";

import { IMedaille } from "models/Medaille";

import "./NewMedalModal.scss";

interface NewMedalModalProps extends WithTranslation {
  listNewMedal: IMedaille[];
  setNewMedalChecked: any;
  show: boolean;
}

class NewMedalModal extends React.Component<NewMedalModalProps, {}> {
  render() {
    const { t, tReady, listNewMedal, show } = this.props;
    const nbMedal: number = listNewMedal ? listNewMedal.length : 0;
    let colBootstrap = 12;
    if (nbMedal < 4) {
      colBootstrap = colBootstrap / nbMedal;
    } else if (nbMedal >= 4) {
      colBootstrap = 3;
    }

    return (
      <Modal
        show={show}
        onHide={() => this.props.setNewMedalChecked()}
        dialogClassName={`modal-new-medal modal-new-medal${nbMedal}`}
        centered
      >
        <Modal.Body>
          <div className={`NewMedalModal`}>
            <h2 className={"color-primary text-center mb-4"}>
            {tReady && t("modal.new_medal.new_medals")}
            </h2>
            <Row>
              {listNewMedal?.map((item: IMedaille, i: number) => {
                return (
                  <Col xs={12} md={colBootstrap} key={item.id_medaille}>
                    <p className={"text-center mb-0"}>
                      <img
                        className={`medaille`}
                        src={
                          process.env.PUBLIC_URL +
                          "/images/medaille/" +
                          item.image
                        }
                        alt={"Médaille " + item.nom}
                      />
                    </p>
                    <h3 className={"color-primary text-center"}>{item.nom}</h3>
                    <div className={"description text-center"}>{item.description}</div>
                  </Col>
                );
              })}
            </Row>
            <p className={"p-sep"}></p>
            <div className={"profil text-center color-black2"}>{tReady && t("modal.new_medal.find_medals")}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => this.props.setNewMedalChecked()}
          >
            {tReady && t("modal.confirm_reward")}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default withTranslation()(NewMedalModal);
