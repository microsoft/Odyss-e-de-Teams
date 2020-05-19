import React from 'react';
import { withTranslation } from 'react-i18next';

import Button from 'components/atoms/Button/Button';

import './style.scss';

const Welcome = (props) => {
  const { t } = props;

  return (
    <div className="Welcome col-12">
      <span className="Welcome__heading">{t('landing.welcome_text')}</span>
      <div className="Welcome__logo">
        <img src="/images/logo/logo_gauche_blanc.png" alt="logo" />
      </div>
      <span className="Welcome__body">{t('landing.body')}</span>
      <Button text={t('landing.buttonText')}  className="Welcome__button Button__white col-3" onClickAction={props.onClickNext}/>
  </div>
  )
}

export default withTranslation()(Welcome);