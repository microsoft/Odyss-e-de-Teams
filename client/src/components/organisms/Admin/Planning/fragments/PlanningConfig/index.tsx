import React, { memo } from "react";

import "./style.scss";
import { withTranslation, WithTranslation } from "react-i18next";
import { Button } from "react-bootstrap";

import useThemes from "./hooks/useThemes";

const PlanningConfig = memo((props: WithTranslation) => {
  // STATE
  const { items, toggle, reset, save } = useThemes();

  const { t, tReady } = props;

  return (
    <div className="PlanningConfig">
      <div className="PlanningConfig__title">
        {tReady && `${t("admin.planning.config.title")}`}
      </div>
      <div className="PlanningConfig__subtitle">
        {tReady && t("admin.planning.config.description")}
      </div>

      <div className="PlanningConfig__items col-12 pt-4 d-flex flex-wrap">
        {items.map((item) => (
          <div
            key={item.id_thematique}
            className="PlanningConfig__item-container col-6 p-2"
          >
            <div
              className={[
                "PlanningConfig__item p-3",
                !item.activated && "PlanningConfig__item--disabled",
              ]
                .filter((x) => x)
                .join(" ")}
              onClick={() => toggle(item)}
            >
              <input
                type="checkbox"
                checked={item.activated}
                readOnly
                className="mr-3"
              />
              {item.nom}
            </div>
          </div>
        ))}
      </div>

      <div className="PlanningConfig__buttons">
        <Button variant="secondary" className="m-1" onClick={reset}>
          {tReady && t("utils.button.cancel")}
        </Button>
        <Button variant="primary" className="m-1" onClick={save}>
          {tReady && t("utils.button.save")}
        </Button>
      </div>
    </div>
  );
});

export default withTranslation()(PlanningConfig);
