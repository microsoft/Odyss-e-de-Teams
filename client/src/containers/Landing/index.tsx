import React, { Component, Suspense } from "react";

import "./Landing.scss";

import Loader from "components/atoms/Loader/Loader";

import Welcome from "components/organisms/Landing/Welcome";
import Description from "components/organisms/Landing/Description";
import CGU from "components/organisms/Landing/CGU";
import Avatars from "components/organisms/Landing/Avatars";

import { getAvatars } from "../../api/Api";

class LandingComponent extends Component<any, any> {
  state = {
    curStep: 1,
    avatars: [],
    selectedAvatarId: null,
    loading: true,
  };

  componentDidMount() {
    getAvatars().then((data) => {
      // add a selected property
      data.results.forEach((avatar) => {
        avatar.selected = false;
      });

      this.setState({
        loading: false,
        avatars: data.results,
      });
    });
  }

  changeStep = () => {
    this.setState((state, props) => ({
      curStep: ++state.curStep,
    }));
  };

  selectAvatar = (avatarId: number) => {
    let avatars = this.state.avatars;
    avatars.forEach((e) => {
      e.selected = e.id_avatar === avatarId ? true : false;
    });

    this.setState(
      {
        selectedAvatarId: avatarId,
        avatars: avatars,
      },
      () => console.log(this.state, avatarId)
    );
  };

  render() {
    return (
      <div className="Landing">
        <div className="Landing__withbackground">
          {this.state.curStep === 1 && (
            <Welcome onClickNext={this.changeStep} />
          )}

          {this.state.curStep === 2 && (
            <Description onClickNext={this.changeStep} />
          )}
        </div>
        {this.state.curStep === 3 && <CGU onClickNext={this.changeStep} />}

        {this.state.curStep === 4 && (
          <Avatars
            onClickNext={this.changeStep}
            avatars={this.state.avatars}
            onSelectAvatar={this.selectAvatar}
          />
        )}
      </div>
    );
  }
}

export default function Landing() {
  return (
    <Suspense fallback={<Loader />}>
      <LandingComponent />
    </Suspense>
  );
}
