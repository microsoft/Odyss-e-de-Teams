import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";
import { withTranslation, WithTranslation } from "react-i18next";

interface IPlanningWidget {
  notificationsCount: number;
  redirectLink: string;
  className?: string;
}

const PlanningWidget = (props: IPlanningWidget & WithTranslation) => {
  const { notificationsCount, redirectLink, className, t } = props;

  return (
    <Link to={redirectLink} className={`${className} no-hover`}>
      <div className={"Planning"}>
        <div className="Planning__container d-flex flex-row py-3 col-12 no-gutters">
          <div className="Planning__container__icon  col-3 d-flex justify-content-center">
            <img src="/images/menu/planning.png" alt="planning" />
          </div>

          <div className="Planning__container__content col-9 d-flex flex-column py-3 justify-content-center">
            <div className="Planning__container__content__title">
              {t("menu.planning")}
              <div className="Planning__container__content__title__notif">
                {notificationsCount}
              </div>
            </div>
            <div className="Planning__container__content__description">
              {t("admin.planning_desc")}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default withTranslation()(PlanningWidget);
