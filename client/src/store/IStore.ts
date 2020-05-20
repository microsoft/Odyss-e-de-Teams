import { IQuestionState } from "../models/Question";
import { IUserState } from "../models/User";

export default interface IStore {
  question: IQuestionState;
  user: IUserState;
}
