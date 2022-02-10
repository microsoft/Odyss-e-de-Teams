// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export default interface IButton {
  text: string;
  onClickAction?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  className?: string;
}
