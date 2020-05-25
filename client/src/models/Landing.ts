import { IAvatar } from "./Avatar";

export interface ILandingProps {
  onCompleteLanding: any;
  isMobile: boolean;
}

export interface ILandingState {
  curStep: number;
  avatars: IAvatar[];
  selectedAvatarId: number;
  loading: boolean;
}
