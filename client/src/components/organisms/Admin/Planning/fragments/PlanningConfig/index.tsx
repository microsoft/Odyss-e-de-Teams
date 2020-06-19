import React, { memo, useState, useRef } from "react";

import "./style.scss";
import { withTranslation, WithTranslation } from "react-i18next";
import { Button } from "react-bootstrap";

import useThemes from "./hooks/useThemes";

export type IPlanningConfigProps = {
  close: Function;
};

function whichTransitionEvent() {
  var t;
  var el = document.createElement("fakeelement");
  var transitions = {
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    MSTransition: "msTransitionEnd",
    OTransition: "oTransitionEnd",
    transition: "transitionEnd",
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

const PlanningConfig = memo((props: WithTranslation & IPlanningConfigProps) => {
  // STATE
  const { items, toggle, reset, save } = useThemes();

  const { t, tReady, close } = props;
  const [saving, setSaving] = useState(false);
  const [closing, setClosing] = useState(false);
  const configRef = useRef(null);

  const closeConfig = () => {
    const event = whichTransitionEvent();

    if (!event) {
      close();
      return;
    }

    setClosing(true);
    const closeComponent = () => {
      configRef.current.removeEventListener(event, closeComponent);
      close();
    };
    configRef.current.addEventListener(event, closeComponent);
  };

  const cancelHandler = () => {
    reset();
    closeConfig();
  };

  const saveHandler = async () => {
    setSaving(true);
    const response = await save();
    setSaving(false);
    if (response) {
      closeConfig();
    } else {
      console.error("error when submitting");
    }
  };

  return (
    <div
      className={["PlanningConfig", closing && "PlanningConfig--closing"]
        .filter((x) => x)
        .join(" ")}
      ref={configRef}
    >
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
        <Button
          variant="secondary"
          className="m-1"
          onClick={cancelHandler}
          disabled={saving || closing}
        >
          {tReady && t("utils.button.cancel")}
        </Button>
        <Button
          variant="primary"
          className="m-1"
          onClick={saveHandler}
          disabled={saving || closing}
        >
          {tReady && saving ? t("utils.button.saving") : t("utils.button.save")}
        </Button>
      </div>
    </div>
  );
});

export default withTranslation()(PlanningConfig);
