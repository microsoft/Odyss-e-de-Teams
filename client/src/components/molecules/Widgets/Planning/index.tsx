import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

interface IPlanningWidget {
  notificationsCount: number;
  redirectLink: string;
  className?: string;
}

const PlanningWidget = (props: IPlanningWidget) => {
  const { notificationsCount, redirectLink, className } = props;

  return (
    <Link to={redirectLink} className={`${className} no-hover`}>
      <div className={"Planning"}>
        <div className="Planning__container d-flex flex-row col-12 no-gutters">
          <div className="Planning__container__icon  col-4 d-flex justify-content-center">
            <img src="/images/menu/planning.svg" alt="planning" />
          </div>

          <div className="Planning__container__content col-8 d-flex flex-column py-3 justify-content-center">
            <div className="Planning__container__content__title">
              Planning
              <div className="Planning__container__content__title__notif">
                {notificationsCount}
              </div>
            </div>
            <div className="Planning__container__content__description">
              Communication aux Explorateurs, événements galactiques et
              programme de modules de questions
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlanningWidget;
