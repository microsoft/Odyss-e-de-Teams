import React from "react";

import "./style.scss";

interface IExplorerWidgetProps {
  count: number;
  className?: string;
}

const ExplorerWidget = (props: IExplorerWidgetProps) => {
  const { count, className } = props;

  return (
    <div className={`ExplorerWidget ${className}`}>
      <div className="ExplorerWidget__tree">
        <img alt="tree" src="/images/icone/tree.png" />
      </div>
      <div className="ExplorerWidget__container">
        <div className="ExplorerWidget__container__count col-12">{count}</div>
        <div className="ExplorerWidget__container__message col-12">
          Explorateurs ont rejoint le voyage depuis le lancement
        </div>
      </div>
    </div>
  );
};

export default ExplorerWidget;
