export default interface IButton {
  text: string;
  onClickAction?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  className?: string;
}
