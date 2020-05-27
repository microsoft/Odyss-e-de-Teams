import { RouteComponentProps } from "react-router-dom";

export interface IAppProps extends RouteComponentProps {
  dispatch: any;
}

export interface IAppState {
  logged: boolean;
  is_admin: boolean;
}
