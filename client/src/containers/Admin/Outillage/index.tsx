import React, { Component } from "react";
import { withTranslation, WithTranslation } from "react-i18next";

import "./style.scss";
import { Form, Button } from "react-bootstrap";

// api
import AdminAPI from "api/Admin";

interface IOutillageState {
  fileSelected: boolean;
  currentLogo: string;
  newLogo: string;
  loading: boolean;
  formData: FormData;
}

class Outillage extends Component<WithTranslation, IOutillageState> {
  state = {
    loading: true,
    fileSelected: false,
    currentLogo: null,
    newLogo: null,
    formData: null,
  };

  async componentDidMount() {
    try {
      const data = await AdminAPI.getCurrentCompanyInfo();
      this.setState({
        loading: false,
        currentLogo: data.results.logo
          ? process.env.REACT_APP_STATIC_URL + "/" + data.results.logo
          : null,
      });
    } catch (e) {
      console.error(e);
    }
  }

  uploadImage = async (e: any) => {
    await AdminAPI.uploadCompanyLogo(this.state.formData);
    window.location.reload(); // maybe to fix with something better
  };

  toggleFileInput = (e) => {
    document.getElementById("outillage_form_input").click();
  };

  resetImg = (e) => {
    this.setState({ currentLogo: null, formData: null, fileSelected: false });
  };

  onChangeLogo = (e: any) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    this.setState({
      newLogo: URL.createObjectURL(e.target.files[0]),
      formData: data,
      fileSelected: true,
    });
  };

  render() {
    const { t, tReady } = this.props;

    const { loading, fileSelected, currentLogo, newLogo } = this.state;

    if (loading) return <div>Loading</div>;
    else
      return (
        <div className="Outillage col-12 p-4">
          <div className="Outillage__subtitle">
            <h1>{tReady && t("admin.outillage.subtitle")}</h1>
          </div>

          <div className="Outillage__subtitle__desc">
            <h5>{tReady && t("admin.outillage.subtitle_desc")}</h5>
          </div>

          <div className="Outillage__currentLogo">
            <h2>{tReady && t("admin.outillage.current_logo_title")}</h2>
            <h5>{tReady && t("admin.outillage.current_logo_desc")}</h5>
          </div>

          <div className="Outillage__form">
            <div className="Outillage__form__item">
              <div className="Outillage__form__logo col-4">
                {!(currentLogo || newLogo) && (
                  <p> {tReady && t("admin.outillage.no_logo_text")} </p>
                )}
                {(currentLogo || newLogo) && (
                  <img src={newLogo ? newLogo : currentLogo} alt="logo" />
                )}
              </div>
              <div className="Outillage__form__input">
                <input
                  type="file"
                  className="Outillage__form__input__file"
                  id="outillage_form_input"
                  accept="image/*"
                  onChange={this.onChangeLogo}
                />
                <Button
                  variant="primary"
                  type="button"
                  onClick={this.toggleFileInput}
                  className="Outillage__form__input__button"
                >
                  {tReady && t("admin.outillage.logoChangeButtonLabel")}
                </Button>
              </div>
            </div>
            <Form className="col-12">
              <div className="Outillage__form__action offset-6">
                <Button
                  type="button"
                  variant="dark"
                  onClick={this.resetImg}
                  className="Outillage__form__input__reset"
                >
                  {tReady && t("admin.outillage.logoChangeButtonReset")}
                </Button>
                <Button
                  type="button"
                  onClick={this.uploadImage}
                  className="Outillage__form__input__button"
                  disabled={!fileSelected}
                >
                  {tReady && t("admin.outillage.logoChangeButtonSave")}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      );
  }
}

export default withTranslation()(Outillage);
