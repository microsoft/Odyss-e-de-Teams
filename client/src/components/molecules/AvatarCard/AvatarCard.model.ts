export interface IAvatarCard {
  id: number;
  title: string;
  image: string;
  description: string;
  onClickActionText: string;
  className?: string;
  onClickAvatarAction: any;
  selected: boolean;
}
