import { IAvatar } from "./Avatar";

export interface ILandingProps {
  onCompleteLanding: any;
}

export interface ILandingState {
  curStep: number;
  avatars: IAvatar[];
  selectedAvatarId: number;
  loading: boolean;
}
