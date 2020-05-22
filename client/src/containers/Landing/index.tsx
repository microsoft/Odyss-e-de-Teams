import React, { Component, Suspense } from "react";

import "./Landing.scss";

import Loader from "components/atoms/Loader/Loader";

import Welcome from "components/organisms/Landing/Welcome";
import Description from "components/organisms/Landing/Description";
import CGU from "components/organisms/Landing/CGU";
import Avatars from "components/organisms/Landing/Avatars";

import { getAvatars } from "../../api/Api";

import { ILandingState, ILandingProps } from "./../../models/Landing";
import { IAvatar } from "./../../models/Avatar";

class LandingComponent extends Component<ILandingProps, ILandingState> {
  state = {
    curStep: 1,
    avatars: [],
    selectedAvatarId: null,
    loading: true,
  };

  componentDidMount() {
    getAvatars().then((data) => {
      // add a selected property
      data.results.forEach((avatar: IAvatar) => {
        avatar.selected = false;
      });

      this.setState({
        loading: false,
        avatars: data.results,
      });
    });

    // don't display the second background
    document.getElementById("landing_step2").style.display = "none";
  }

  changeStep = () => {
    let step = this.state.curStep;
    this.setState(
      (state, props) => ({
        curStep: ++step,
      }),
      () => {
        // hide first div and show the second background
        if (this.state.curStep > 1) {
          document.getElementById("landing_step1").style.display = "none";
          document.getElementById("landing_step2").style.display = "block";
        }

        if (this.state.curStep > 2) {
          document.getElementById("landing_step2").style.display = "none";
        }
      }
    );
  };

  selectAvatar = (avatarId: number) => {
    let avatars = this.state.avatars;
    avatars.forEach((e) => {
      e.selected = e.id_avatar === avatarId ? true : false;
    });

    this.setState({
      selectedAvatarId: avatarId,
      avatars: avatars,
    });
  };

  onCompleteProfile = () => {
    this.props.onCompleteLanding({
      avatarSelected: this.state.selectedAvatarId,
    });
  };

  render() {
    const { isMobile } = this.props;
    return (
      <div className="Landing">
        <div
          className={`Landing__withbackground ${
            isMobile ? "Landing__background-mobile-0" : "Landing__background-0"
          }`}
          id="landing_step1"
        >
          {this.state.curStep === 1 && (
            <Welcome onClickNext={this.changeStep} isMobile={isMobile} />
          )}
        </div>
        <div
          className={`Landing__withbackground ${
            isMobile ? "Landing__background-mobile-1" : "Landing__background-1"
          }`}
          id="landing_step2"
        >
          {this.state.curStep === 2 && (
            <Description onClickNext={this.changeStep} isMobile={isMobile} />
          )}
        </div>
      </div>
    );
  }
}

export default function Landing(props: ILandingProps) {
  return (
    <Suspense fallback={<Loader />}>
      <LandingComponent
        onCompleteLanding={props.onCompleteLanding}
        isMobile={props.isMobile}
      />
    </Suspense>
  );
}

// {this.state.curStep === 3 && <CGU onClickNext={this.changeStep} />}

// {this.state.curStep === 4 && (
//   <Avatars
//     onClickNext={this.onCompleteProfile}
//     avatars={this.state.avatars}
//     onSelectAvatar={this.selectAvatar}
//   />
// )}
