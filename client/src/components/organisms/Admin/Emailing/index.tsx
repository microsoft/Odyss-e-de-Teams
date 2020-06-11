import React from "react";

import html2canvas from "html2canvas";

import { withTranslation, WithTranslation } from "react-i18next";

import { Dropdown, Button } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";

import "./style.scss";

class AdminEmailing extends React.Component<WithTranslation, {}> {
  copyClipBoard = async (e) => {
    // let elem = document
    //   .getElementsByTagName("iframe")[0]
    //   .contentWindow.document.getElementById("tinymce");

    let elem = document.getElementById("test");

    html2canvas(elem, {
      allowTaint: true,
      logging: true,
      useCORS: true,
      // height: 1000,
      // width: 1000,
      x: 0,
      y: 0,
    }).then((canvas) => {
      document.getElementById("result").appendChild(canvas);
      // canvas.toBlob((blob) => {
      //   try {
      //     // @ts-ignore
      //     navigator.clipboard.write([
      //       new ClipboardItem({
      //         "image/png": blob,
      //       }),
      //     ]);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // });
    });
  };

  // try {
  //   const img = await fetch(
  //     "http://localhost:8080/static-server/company-assets/1/module_manager.png"
  //   );
  //   console.log("img", img);
  //   const b = await img.blob();
  //   console.log("img", b);
  //   navigator.clipboard["write"]([
  //     new ClipboardItem({
  //       "image/png": b,
  //     }),
  //   ]);
  // } catch (error) {
  //   console.error(error);
  // }

  //     try {
  //     navigator.clipboard.write([
  //         new ClipboardItem({
  //             'image/png': blob
  //         })
  //     ]);
  // } catch (error) {
  //     console.error(error);
  // }

  // html2canvas(c).then((canvas) => {
  //   canvas.toBlob( (blob) => {
  //     navigator.clipboard.write([
  //       new ClipboardItem({
  //         [blob.type]:  blob
  //       })
  //     ])
  // });
  // });

  render() {
    const { tReady, t } = this.props;

    // @ts-ignore
    window.html2canvas = html2canvas;

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
              }}
            />
          </div>

          <div id="test" className="Emailing__body__editor2">
            kdozadzaokdpazokdza
          </div>

          <div id="result"></div>
        </div>

        <div className="Emailing__actions">
          <Button onClick={this.copyClipBoard}>Copier dans le cache</Button>
        </div>
      </div>
    );
  }
}

export default withTranslation()(AdminEmailing);
