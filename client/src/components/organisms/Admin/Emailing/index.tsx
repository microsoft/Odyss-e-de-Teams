import React from "react";

import { withTranslation, WithTranslation } from "react-i18next";

import { Dropdown } from "react-bootstrap";

import "./style.scss";

class AdminEmailing extends React.Component<WithTranslation, {}> {
  render() {
    const { tReady, t } = this.props;

    return (
      <div className="Emailing">
        <div className="Emailing__header">
          <h1 className="Emailing__header__title">
            {tReady && t("admin.emailing.title")}
          </h1>

          <p className="Emailing__header__desc">
            {tReady && t("admin.emailing.desc")}
          </p>
        </div>

        <div className="Emailing__body">
          <div className="Emailing__body__selector">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {tReady && t("admin.emailing.email_launch")}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1"></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(AdminEmailing);
