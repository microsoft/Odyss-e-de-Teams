import React, {Component, Suspense} from 'react';

import './Landing.scss'


import Loader from 'components/atoms/Loader/Loader';

import Welcome from 'components/organisms/Landing/Welcome'
import Description from 'components/organisms/Landing/Description'
import CGU from 'components/organisms/Landing/CGU'
import Avatars from 'components/organisms/Landing/Avatars'


class LandingComponent extends Component<any, any>{

  state = {
    curStep: 0
  }

  changeStep = () => {
    this.setState((state, props) => ({
      curStep: ++state.curStep
    }));
  }

  render() {


    return (
      <div className="Landing">
        {
          (this.state.curStep === 0) && <Welcome onClickNext={this.changeStep}/>
        }        
        
        {
          (this.state.curStep === 1) && <Description onClickNext={this.changeStep}/>
        }

        {
          (this.state.curStep === 2) && <CGU onClickNext={this.changeStep}/>
        }

        {
          (this.state.curStep === 3) && <Avatars onClickNext={this.changeStep}/>
        }
      </div>
    )
  }
}

// const LandingRendered = withTranslation()(LandingComponent);

export default function Landing() {
  return (
    <Suspense fallback={<Loader/>}>
      <LandingComponent />
    </Suspense>
  )
}