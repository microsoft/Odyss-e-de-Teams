import { IQuestionState } from "../models/Question";
import { IUserState } from "../models/User";
import { IAvatarState } from "../models/Avatar";

export default interface IStore {
  question: IQuestionState;
  user: IUserState;
  avatars: IAvatarState;
}
