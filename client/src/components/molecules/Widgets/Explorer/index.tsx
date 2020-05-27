import React from "react";

import "./style.scss";
import { withTranslation, WithTranslation } from "react-i18next";

interface IExplorerWidgetProps {
  count: number;
  className?: string;
}

const ExplorerWidget = (props: IExplorerWidgetProps & WithTranslation) => {
  const { count, className, t, tReady } = props;

  return (
    <div className={`ExplorerWidget ${className}`}>
      <div className="ExplorerWidget__tree">
        <img alt="tree" src="/images/icone/tree.png" />
      </div>
      <div className="ExplorerWidget__container">
        <div className="ExplorerWidget__container__count col-12">{count}</div>
        <div className="ExplorerWidget__container__message col-12">
          {tReady && t("admin.explorers_desc")}
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(ExplorerWidget);
