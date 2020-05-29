import React, { useState } from "react";

import "./style.scss";

const MenuMobile = () => {
  const [displayMenu, setDisplayMenu] = useState(false);

  return (
    <div
      className={`MenuMobile col-12 p-0 ${
        displayMenu ? "MenuMobile__expand" : ""
      }`}
    >
      <div
        className="MenuMobile__header"
        onClick={() => setDisplayMenu(!displayMenu)}
      >
        <div className="MenuMobile__header__img">
          <img src="/images/logo/logo_centre_violet.png" alt="logo" />
        </div>

        <div className="MenuMobile__header__seperator"></div>
      </div>

      {displayMenu && <div className="MenuMobile__items">Show Menu</div>}
    </div>
  );
};

export default MenuMobile;
