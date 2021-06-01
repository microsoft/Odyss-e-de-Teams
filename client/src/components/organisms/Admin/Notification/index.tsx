import React from "react";

import { withTranslation, WithTranslation } from "react-i18next";
import i18n from '../../../../config/i18n';

import AdminAPI from "api/Admin";

import "./style.scss";

import { Button } from "react-bootstrap";

interface IAdminNotificationState {
  inputValue: string;
}

class AdminNotification extends React.Component<
  WithTranslation,
  IAdminNotificationState
> {
  constructor(props: WithTranslation) {
    super(props);
    this.state = {
      inputValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  resetInput() {
    this.setState({ inputValue: '' });
  }

  async sendNotification() {
    await AdminAPI.sendNotification({ value: this.state.inputValue });
  }

  render() {
    const { tReady, t } = this.props;
    return (
      <div className="Notification" >
        <div className="Notification__header">
          <h1 className="Notification__header__title">
            {tReady &&
              t("admin.notification.title")
            }
          </h1>
          <p className="Notification__header__desc">
            {tReady && t("admin.notification.description")}
          </p>
        </div>

        <div className="Notification__body">
          <textarea className="Notification__body__textarea" value={this.state.inputValue} onChange={this.handleChange} />
          <div className="Notification__body__buttons">
            <Button className="Notification__body__buttons__btn-left" variant="secondary" onClick={() => this.resetInput()}>
              {tReady && t("utils.button.reset")}
            </Button>
            <Button variant="primary" onClick={() => this.sendNotification()}>
              {tReady && t("utils.button.send")}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(AdminNotification);
