import React, { memo, useRef } from "react";
import { withTranslation, WithTranslation } from "react-i18next";

import "./style.scss";
import { Dropdown, Button } from "react-bootstrap";

import useDropDown from "./hooks/useDropDown";
import copyDom from "./hooks/copyDom";

export type AdminSocialProps = {
  missions: any;
};

const AdminSocial = memo((props: WithTranslation & AdminSocialProps) => {
  const { t, tReady, missions } = props;
  const activeMissionIndex = missions.findIndex((m) => m.actif === true);

  // GET STATE
  const { items, selected, bannerPath, changeSelection } = useDropDown();

  // REF FOR COPY
  const domRef = useRef(null);

  return (
    <div className="Social">
      <div className="Social__header">
        <h1 className="Social__header__title">
          {tReady &&
            `${t("admin.social.title")} - ${t("admin.planning.title_week")} ${
              activeMissionIndex + 1
            } : « ${missions[activeMissionIndex].nom}	! »`}
        </h1>
        <p className="Social__header__desc">
          {tReady && t("admin.social.description")}
        </p>
      </div>

      <div className="Social__body">
        <div className="Social__body__selector">
          <Dropdown className="d-inline-block mb-3">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selected
                ? selected.name
                : "what should i put there for yammer ?"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {items.map((item) => (
                <Dropdown.Item
                  key={item.id}
                  onClick={() => changeSelection(item)}
                >
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="Social__body__content" ref={domRef}>
          {bannerPath && <img src={bannerPath} alt="banner" />}
        </div>
      </div>
      <div className="text-right mt-3">
        <Button onClick={copyDom(domRef)}>Copier dans le cache</Button>
      </div>
    </div>
  );
});

export default withTranslation()(AdminSocial);