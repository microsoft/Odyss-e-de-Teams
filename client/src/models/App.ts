import { RouteComponentProps } from "react-router-dom";

export interface IAppProps extends RouteComponentProps {
  dispatch: any;
}

export interface IAppState {
  is_admin: boolean;
  loading: boolean;
  userAD?: any;
  error?: any;
  logged?: boolean;
}
