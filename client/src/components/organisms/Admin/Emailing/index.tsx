import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { Dropdown, Button } from "react-bootstrap";
import domtoimage from "dom-to-image";
import { Editor } from "@tinymce/tinymce-react";

import AdminAPI from "api/Admin";

import "./style.scss";
import Admin from "api/Admin";

interface IAsset {
  id_asset_communication: number;
  nom: string;
  nom_fichier: string;
  contenu1: string;
  contenu2: string;
}
interface ITemplate extends IAsset {
  template?: string;
  width?: number;
  height?: number;
}
interface IAdminEmailingState {
  currentTemplate: ITemplate;
  listAssets: IAsset[];
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
    };
  }
  componentDidMount() {
    this._loadAssets();
  }
  
  private _loadAssets = () => {
    Admin.getListAsset(1).then((result: IAsset[]) => {
      this.setState(
        {
          listAssets: result,
          currentTemplate: result ? result[0] : null,
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
      this.state.currentTemplate.id_asset_communication
    ).then((data) => {
      let currentTemplate = this.state.currentTemplate;
      currentTemplate.template = data.template;
      currentTemplate.width = data.width;
      currentTemplate.height = data.height;
      this.setState({
        currentTemplate: currentTemplate,
      }, () => {
        setTimeout(() => {
          this._handleEditorInit();
        }, 500);
      });
    });
  };

  private _handleEditorInit = () => {
    let node: any = document.getElementById("bodyContent");
    if (node && this.state.currentTemplate && this.state.currentTemplate.template) {
      console.log(this.state.currentTemplate);
      node.style.backgroundImage =
        "url('" + process.env.REACT_APP_STATIC_URL +
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

          <div className="Emailing__body__content">
            <Editor
              value={`
                <div id="bodyContent">
                  ${this.state.currentTemplate?.contenu1 ? this.state.currentTemplate?.contenu1 : ''}
                  ${this.state.currentTemplate?.contenu2 ? this.state.currentTemplate?.contenu2 : ''}
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
          </div>
        </div>

        <div className="Emailing__actions text-right mt-3">
          <Button onClick={this.copyClipBoard}>Copier dans le cache</Button>
        </div>
      </div>
    );
  }
}

export default withTranslation()(AdminEmailing);
