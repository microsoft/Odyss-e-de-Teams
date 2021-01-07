import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import i18n from '../../../../config/i18n';
import { Dropdown, Button } from "react-bootstrap";
import { forkJoin } from "rxjs";
import domtoimage from "dom-to-image";
import { Editor } from "@tinymce/tinymce-react";

import AdminAPI from "api/Admin";
import ClassementAPI from "api/Classement";

import { IClassement } from "models/Classement";
import { IAsset } from "../Social/hooks/useDropDown";

import "./style.scss";

interface ITemplate extends IAsset {
  template?: string;
  width?: number;
  height?: number;
}
interface IAdminEmailingState {
  currentTemplate: ITemplate;
  listAssets: IAsset[];
  listUserClassementPoint: IClassement[];
  listUserClassementXp: IClassement[];
}

class AdminEmailing extends React.Component<
  WithTranslation,
  IAdminEmailingState
  > {
  constructor(props: WithTranslation) {
    super(props);
    this.state = {
      currentTemplate: null,
      listAssets: [],
      listUserClassementPoint: [],
      listUserClassementXp: [],
    };
  }
  componentDidMount() {
    this._loadAssets();
  }

  private _loadAssets = () => {
    forkJoin([
      AdminAPI.getListAsset(1, i18n.language),
      ClassementAPI.getClassement(i18n.language, "xp", { limit: 3 }),
      ClassementAPI.getClassement(i18n.language, "point", { limit: 10 }),
    ])
      .toPromise()
      .then((result: any) => {
        this.setState(
          {
            listAssets: result[0],
            currentTemplate: result[0] ? result[0][0] : null,
            listUserClassementXp: result[1] ? result[1] : [],
            listUserClassementPoint: result[2] ? result[2] : [],
          },
          () => {
            if (this.state.currentTemplate) {
              this._loadTemplate();
            }
          }
        );
      });
  };

  private _loadTemplate = () => {
    AdminAPI.getTemplate(
      this.state.currentTemplate.id_asset_communication,
      i18n.language
    ).then((data) => {
      let currentTemplate = this.state.currentTemplate;
      currentTemplate.template = data.template;
      currentTemplate.width = data.width;
      currentTemplate.height = data.height;
      this.setState(
        {
          currentTemplate: currentTemplate,
        },
        () => {
          setTimeout(() => {
            this._handleEditorInit();
          }, 500);
        }
      );
    });
  };

  private _handleEditorInit = () => {
    let node: any = document.getElementById("bodyContent");
    if (
      node &&
      this.state.currentTemplate &&
      this.state.currentTemplate.template
    ) {
      node.style.backgroundImage =
        "url('" +
        process.env.REACT_APP_STATIC_URL +
        this.state.currentTemplate.template +
        "')";
      node.style.backgroundSize = "cover";
      node.style.backgroundRepeat = "no-repeat";
      node.style.width = this.state.currentTemplate.width + "px";
      node.style.height = this.state.currentTemplate.height + "px";
    }
  };

  private _onChangeAsset = (item: IAsset) => {
    this.setState(
      {
        currentTemplate: item,
      },
      () => {
        this._loadTemplate();
      }
    );
  };

  copyClipBoard = async (e) => {
    let node = document.getElementById("bodyContent");

    try {
      domtoimage
        .toBlob(node)
        .then(function (dataUrl) {
          // @ts-ignore
          navigator.clipboard.write([
            new ClipboardItem({
              "image/png": dataUrl,
            }),
          ]);
        })
        .catch(function (error) {
          domtoimage
            .toPng(node)
            .then(function (dataUrl) {
              var img = document.createElement("img");
              img.src = dataUrl;
              document.getElementById("cache-clipboard").appendChild(img);

              var r = document.createRange();
              r.setStartBefore(img);
              r.setEndAfter(img);
              r.selectNode(img);
              var sel = window.getSelection();
              sel.removeAllRanges();
              sel.addRange(r);
              document.execCommand("copy");
              window.setTimeout(() => {
                document
                  .getElementById("data-content")
                  .removeChild(document.getElementById("cache-clipboard"));
                var cache = document.createElement("div");
                cache.id = "cache-clipboard";
                document.getElementById("data-content").appendChild(cache);
              }, 100);
            })
            .catch(function (error) {
              console.error("oops, something went wrong!", error);
            });
        });
    } catch (err) {
      console.log(err);
    }
  };

  private _renderClassement = (type: string) => {
    let items: IClassement[] = [];
    let clePoint: string = "",
      top: number = 0;
    switch (type) {
      case "xp":
        items = this.state.listUserClassementXp;
        clePoint = "nb_xp";
        top = 1285;
        break;
      case "pts":
        items = this.state.listUserClassementPoint;
        clePoint = "nb_point";
        top = 950;
        break;
    }
    let styleFirst = ` style="font-weight: bold; color:#f1b446;"`;
    let styleSecond = ` style="font-weight: bold; color:#818181;"`;
    let styleThird = ` style="font-weight: bold; color:#a85150;"`;
    let content: string = "";
    content += `
      <div style="top: ${top}px; height: 410px; position: relative; padding: 0 100px; font-size: 18pt; line-height: 22pt; font-family: 'Segoe UI'; ">
      <table style="width:100%; border:none" border="0"><thead style="background: #7b83eb; color: #fff;"><tr>`;
    content +=
      '<th style="padding:10px">#</th><th style="padding:10px">Explorateur.trice</th><th style="padding:10px">Points</th></tr></thead>';
    content += "<tbody>";
    let styleTr: string;
    items?.forEach((item: IClassement) => {
      styleTr = "";
      if (item.rang === 1) {
        styleTr = styleFirst;
      }
      if (item.rang === 2) {
        styleTr = styleSecond;
      }
      if (item.rang === 3) {
        styleTr = styleThird;
      }
      content += "<tr" + styleTr + ">";
      content += `<td style="padding:10px">${item.rang}</td>`;
      content += `<td style="padding:10px">${item.nom}</td>`;
      content += `<td style="padding:10px">${item[clePoint]}</td>`;
      content += "</tr>";
    });
    content += "</tbody></table></div>";
    return content;
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
            <Dropdown className="d-inline-block mb-3">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {this.state.currentTemplate?.nom}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.state.listAssets?.map((item: IAsset) => {
                  return (
                    <Dropdown.Item
                      key={item.id_asset_communication}
                      onClick={() => this._onChangeAsset(item)}
                    >
                      {item.nom}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="Emailing__body__content" id="data-content">
            <Editor
              value={`
                <div id="bodyContent">
                  ${this.state.currentTemplate?.contenu &&
                  this.state.currentTemplate?.contenu[0]
                  ? this.state.currentTemplate?.contenu[0]
                  : ""
                }
                  ${this.state.currentTemplate?.contenu &&
                  this.state.currentTemplate?.contenu[1]
                  ? this.state.currentTemplate?.contenu[1]
                  : ""
                }
                  ${this.state.currentTemplate?.contenu &&
                  this.state.currentTemplate?.contenu[2]
                  ? this.state.currentTemplate?.contenu[2]
                  : ""
                }
                  ${this.state.currentTemplate?.id_asset_communication === 5
                  ? this._renderClassement("pts")
                  : ""
                }
                  ${this.state.currentTemplate?.id_asset_communication === 5
                  ? this._renderClassement("xp")
                  : ""
                }
                </div>`}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "lists link print preview",
                  "searchreplace fullscreen",
                  "insertdatetime paste",
                ],
                toolbar:
                  "undo redo | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent",
                body_class: "Emailing__body__editor",
                id: "text_editor",
                inline: true,
              }}
            />
            <div id="cache-clipboard"></div>
          </div>
        </div>

        <div className="Emailing__actions text-right mt-3">
          <Button onClick={this.copyClipBoard}>{tReady && t("utils.cache_copy")}</Button>
        </div>
      </div>
    );
  }
}

export default withTranslation()(AdminEmailing);
