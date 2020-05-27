import AuthenticationContext from "adal-angular/lib/adal";

// An authentication service that uses the ADAL.js library to sign in users with
// an AAD account. This leverages the AAD v1 endpoint.
class AdalAuthService {
  constructor() {
    console.log('adal', window.location.origin);
    const scopes = encodeURIComponent(
      "email openid profile offline_access User.Read"
    );

    this.applicationConfig = {
      clientId: "5830a2dd-c958-47bd-b6e8-676341fc5faf",
      endpoints: {
        api: "5830a2dd-c958-47bd-b6e8-676341fc5faf"
      },
      extraQueryParameter: `prompt=consent&scope=${scopes}`,
      redirectUri: `${window.location.origin}/callback/v1`,
      cacheLocation: "localStorage",
      callback: this.loginCallback,
      popUp: !window.navigator.standalone
    };

    this.authContext = new AuthenticationContext(this.applicationConfig);
  }

  loginCallback = (reason, token, error) => {
    if (this.loginPromise) {
      if (!error) {
        this.getUser()
          .then(user => this.loginPromiseResolve(user))
          .catch(error => {
            this.loginPromiseReject(error);
            this.loginPromise = undefined;
          });
      } else {
        this.loginPromiseReject(`${error}: ${reason}`);
        this.loginPromise = undefined;
      }
    }
  };

  isCallback() {
    return this.authContext.isCallback(window.location.hash);
  }

  login() {
    if (!this.loginPromise) {
      this.loginPromise = new Promise((resolve, reject) => {
        // Allow the promise to be resolved/rejected from the loginCallback above
        this.loginPromiseResolve = resolve;
        this.loginPromiseReject = reject;

        // Start the login flow
        this.authContext.login();
      });
    }
    return this.loginPromise;
  }

  logout() {
    this.authContext.logOut();
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.authContext.getUser((error, user) => {
        console.log(user);
        if (!error) {
          resolve(user.profile);
        } else {
          reject(error);
        }
      });
    });
  }

  getToken() {
    return new Promise((resolve, reject) => {
      this.authContext.acquireToken(
        this.applicationConfig.endpoints.api,
        (reason, token, error) => {
          if (!error) {
            resolve(token);
          } else {
            reject({ error, reason });
          }
        }
      );
    });
  }
}

export default AdalAuthService;
