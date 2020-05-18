import React from 'react';
import { withTranslation } from 'react-i18next';

import Button from 'components/atoms/Button/Button';

const Description = (props) => {
  const { t } = props;

  return (
    <div className="Landing__container__body">
      Explaination
    <Button text={t('landing.buttonText')}  className="Button_white" onClickAction={props.onClickNext}/>
  </div>
  )
}

export default withTranslation()(Description);