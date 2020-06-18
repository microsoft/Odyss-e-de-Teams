import React from "react";
import { Modal } from "react-bootstrap";
import { withTranslation, WithTranslation } from "react-i18next";

interface WeekendModalProps extends WithTranslation {
  isWeekend: boolean;
}

class WeekendModal extends React.Component<WeekendModalProps, {}> {
  render() {
    const { t, tReady, isWeekend } = this.props;

    return (
      <Modal show={isWeekend} dialogClassName={`modal-weekend`} centered>
        <Modal.Body>
          <div className={`WeekendModal`}>
            <h2 className={"color-primary text-center mb-4"}>
              {tReady && t("player.modal_weekend.title")}
            </h2>
            <div className={"profil text-center color-black2"}>
              {tReady && t("player.modal_weekend.desc")}
            </div>
            <p className="p-sep"></p>
            <div className={"profil text-center color-black2"}>
              {tReady && t("player.modal_weekend.desc_lundi")}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
export default withTranslation()(WeekendModal);
