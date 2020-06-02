import { IQuizzState } from "../models/Question";
import { IUserState } from "../models/User";

export default interface IStore {
  quizz: IQuizzState;
  user: IUserState;
}
