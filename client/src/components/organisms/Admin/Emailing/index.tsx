import React from "react";

import domtoimage from "dom-to-image";

import { withTranslation, WithTranslation } from "react-i18next";

import { Dropdown, Button } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";

import "./style.scss";

class AdminEmailing extends React.Component<WithTranslation, {}> {
  componentDidMount() {
    setTimeout(() => {
      let node = document.getElementsByClassName("mce-content-body ")[0];
      // @ts-ignore
      node.style.backgroundImage =
        "url('http://localhost:8080/static-server/company-assets/1/test.png')";
      // @ts-ignore
      node.style.backgroundSize = "cover";
      // @ts-ignore
      node.style.backgroundRepeat = "no-repeat";
    }, 1000);
  }

  copyClipBoard = async (e) => {
    let node = document.getElementsByClassName("mce-content-body ")[0];

    domtoimage
      .toBlob(node)
      .then(function (dataUrl) {
        try {
          // @ts-ignore
          navigator.clipboard.write([
            new ClipboardItem({
              "image/png": dataUrl,
            }),
          ]);
        } catch (error) {
          console.error(error);
        }
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

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

          <div className="Emailing__body__content">
            <Editor
              initialValue="<p>This is the initial content of the editor</p>"
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                body_class: "Emailing__body__editor",
                id: "text_editor",
                inline: true,
              }}
            />
          </div>
        </div>

        <div className="Emailing__actions">
          <Button onClick={this.copyClipBoard}>Copier dans le cache</Button>
        </div>
      </div>
    );
  }
}

export default withTranslation()(AdminEmailing);
