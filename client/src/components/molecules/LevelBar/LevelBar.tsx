import React from "react";
import styled, { keyframes } from "styled-components";

import "./LevelBar.scss";

interface ILevelBar {
  currentXP: number;
  nextXP: number;
  nextLevel: number;
  src: string;
  currentLevel?: number;
}

const LevelBar = (props: ILevelBar) => {
  const {
    currentXP,
    nextXP,
    nextLevel,
    src
  } = props;
  let translateXEnd: number = 0;
  if (nextXP > 0) {
    let pourcentNextLevel = currentXP * 100 / nextXP;
    translateXEnd = 100 - pourcentNextLevel;
  }
  const progressAnimation = keyframes`
    0% {
      transform:translateX(-100%);
    }
    100% {
      transform:translateX(-${translateXEnd}%);
    }
  `;
  const ProgressLevel = styled.p`
    animation-duration: 1.25s;
    animation-name: ${progressAnimation};
    animation-fill-mode: forwards;
  `;

  return (
    <div className={`d-flex content-next-level align-items-center mt-2 levelbar-${src}`}>
      <div className={"loader-next-level"}>
        <ProgressLevel className={"bg"}></ProgressLevel>
      </div>
      {
        src === 'levelup' && nextLevel && (
          <p className={"next-level mb-0"}><strong>{nextLevel}</strong></p>
        )
      }
      {
        src === 'profil' && nextXP && (
          <p className={"next-xp mb-0 ml-2"}><strong>{currentXP}</strong>/{nextXP}</p>
        )
      }
    </div>
  );
};

export default LevelBar;
