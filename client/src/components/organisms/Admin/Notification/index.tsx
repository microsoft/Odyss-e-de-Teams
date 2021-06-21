import React from "react";

import { withTranslation, WithTranslation } from "react-i18next";

import AdminAPI from "api/Admin";

import "./style.scss";

import { Button } from "react-bootstrap";

interface IAdminNotificationState {
  title: string;
  value: string;
}

class AdminNotification extends React.Component<
  WithTranslation,
  IAdminNotificationState
> {
  constructor(props: WithTranslation) {
    super(props);
    this.state = {
      title: '',
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleChange(event) {
    if (event.target?.value?.length > 32) {
      event.target.value = event.target.value.slice(0, -1);
    }
    this.setState({ value: event.target.value });
  }

  handleTitleChange(event) {
    if (event.target?.value?.length > 32) {
      event.target.value = event.target.value.slice(0, -1);
    }
    this.setState({ title: event.target.value });
  }

  resetInput() {
    this.setState({ value: '', title: '' });
  }

  async sendNotification() {
    if (this.state.title?.trim() !== '' && this.state.value?.trim() !== '') {
      this.resetInput();
      await AdminAPI.sendNotification(this.state).then(res => {
        if (res.response) {
          let confirmation = document.getElementById('confirmation');
          confirmation.style.display = 'block';
          setTimeout(() => {
            confirmation.style.display = 'none';
          }, 10000);
        }
      });
    }
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
          <div className="Notification__body__title">
            {tReady && t("admin.notification.title_message")}
          </div>
          <div>
            {tReady && t("admin.notification.detail_message")}
          </div>
          <input type="text" value={this.state.title} onChange={this.handleTitleChange} className="Notification__body__input" />
          <div className="Notification__body__title">
            {tReady && t("admin.notification.your_message")}
          </div>
          <div>
            {tReady && t("admin.notification.detail_your_message")}
          </div>
          <input type="text" className="Notification__body__input" value={this.state.value} onChange={this.handleChange} />
          <div className="Notification__body__buttons">
            <div className="Notification__body__buttons__confirmation" id="confirmation">
              {tReady && t("admin.notification.notifiation_confirmation")}
            </div>
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
