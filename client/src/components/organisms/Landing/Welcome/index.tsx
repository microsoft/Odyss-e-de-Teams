import React from 'react';
import { withTranslation } from 'react-i18next';

import Button from 'components/atoms/Button/Button';

import './style.scss';

const Welcome = (props) => {
  const { t } = props;

  return (
    <div className="Landing__container__body">
    <h1>{t('landing.welcome_text')}</h1>
    <h1>{t('landing.title')}</h1>
    <h1>{t('landing.subtitle')}</h1>
    <h1>{t('landing.body')}</h1>
    <h1>{t('landing.body')}</h1>
    <Button text={t('landing.buttonText')}  className="Button_white" onClickAction={props.onClickNext}/>
  </div>
  )
}

export default withTranslation()(Welcome);