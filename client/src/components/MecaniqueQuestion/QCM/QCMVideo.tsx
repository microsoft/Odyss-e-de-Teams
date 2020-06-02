import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import videojs from "video.js";

import QCMChoixMultiple from "./QCMChoixMultiple";
import QCMChoixUnique from "./QCMChoixUnique";

import { IQCMProps, IMecaniqueQuestionState } from "src/models/Question";

import "./QCMVideo.scss";

class QCMVideo extends Component<IQCMProps, IMecaniqueQuestionState> {
  videoNode: any;
  player: any;

  constructor(props: IQCMProps) {
    super(props);
    this.state = {
      selectedReponseIds: [],
    };
  }

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(
      this.videoNode,
      {
        autoplay: false,
        controls: true,
        muted: true,
        fluid: true,
        width: "100%",
        height: "100%",
        sources: [
          {
            src:
              process.env.PUBLIC_URL +
              "/upload/quizz" + this.props.question.asset,
            type: "video/mp4",
          },
        ]
      },
      () => {
        console.log("onPlayerReady", this.player);
        this.player.on('playing', function() {
          console.log('BONUS');
        });
      }
    );
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  private _onSelect = (selectedReponseIds: number[]) => {
    this.props.onSelect(this.props.question, selectedReponseIds);
  };

  render() {
    return (
      <Container fluid className={"conteneur-reponse"}>
        <Row>
          <Col xs={12} md={6}>
            <div data-vjs-player>
              <video
                ref={(node) => (this.videoNode = node)}
                className="video-js"
              ></video>
            </div>
          </Col>
          <Col xs={12} md={6}>
            {this.props.multiple ? (
              <QCMChoixMultiple
                onSelect={this._onSelect}
                question={this.props.question}
              />
            ) : (
              <QCMChoixUnique
                onSelect={this._onSelect}
                question={this.props.question}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default QCMVideo;
