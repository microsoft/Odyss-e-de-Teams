import * as microsoftTeams from "@microsoft/teams-js";
import TeamsAuthService from "./teams.auth.service";
import * as ajax from 'ajax';

// An authentication that will only request an access token for the logged in user.
// This token can then be used to request other resources.
class SSOAuthService {
  constructor() {
    // Initialize the Teams SDK
    microsoftTeams.initialize();

    this.authToken = null;
  }

  isCallback() {
    if (!this.teamsAuthService) {
      this.teamsAuthService = new TeamsAuthService();
    }
    return this.teamsAuthService.isCallback();
  }

  login() {
    if (!this.teamsAuthService) {
      this.teamsAuthService = new TeamsAuthService();
    }
    return this.teamsAuthService.login();
  }

  parseTokenToUser(token) {
    // parse JWT token to object
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var parsedToken = JSON.parse(window.atob(base64));
    return {
      name: parsedToken.name,
      userName: parsedToken.upn,
      upn: parsedToken.upn,
      idToken: parsedToken
    };
  }

  getUser() {
    return new Promise((resolve, reject) => {
      if (this.authToken) {
        console.log('token already exist')
        console.log(this.authToken)
        resolve(this.parseTokenToUser(this.authToken));
      } else {
        this.getToken()
          .resolve(token => {
            resolve(this.parseTokenToUser(token));
          })
          .reject(reason => {
            reject(reason);
          });
      }
    });
  }

  getToken() {
    return new Promise((resolve, reject) => {
      console.log('get token /////////////////////////////////////')
      if (this.authToken) {
        console.log('5555555555555555555555555555555555555555555555555555555555555555')
        resolve(this.authToken);
      } else {
        console.log('66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666')
        console.log('get auth token')
        microsoftTeams.authentication.getAuthToken({
          successCallback: result => {
            this.authToken = result;
            console.log('first token: ', result)
            ajax({
              url: process.env.REACT_APP_API_URL + '/token',
              headers: {
                'Authorization': 'bearer ' + this.authToken
              },
              type: "get",
              success: function (result, status) {
                console.log('second token: ', result)
                console.log(result);
              },
              error: function (result, status, error) {
                console.log(error)
              }
            })
            resolve(result);
          },
          failureCallback: reason => {
            reject(reason);
          }
        });
      }
    });
  }
}

export default SSOAuthService;
