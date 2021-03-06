// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import MockAuthService from "./mock.auth.service";
import MsalAuthService from "./msal.auth.service";
import SSOAuthService from "./sso.auth.service";

class AuthService {
  constructor() {
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);
    const inTeamsStorage = +localStorage.getItem("inTeams") || 0;

    if (params.get("useTest")) {
      this.authService = new MockAuthService();
    }
    else if (params.get("inTeamsSSO") || inTeamsStorage === 1) {
      this.authService = new SSOAuthService();
      if (inTeamsStorage === 0) {
        localStorage.setItem("inTeams", 1);
      }
    } else {
      this.authService = new MsalAuthService();
    }
  }

  isCallback() {
    return this.authService.isCallback(window.location.hash);
  }

  login() {
    return this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  getToken() {
    return this.authService.getToken();
  }

  getUser() {
    return this.authService.getUser();
  }

  // Does an authenticated fetch by acquiring and appending the Bearer token for our backend
  fetch(url, options) {
    return this.getToken().then(token => {
      options = options || {};
      options.headers = options.headers || {};
      options.headers.Authorization = `Bearer ${token}`;
      return fetch(url, options);
    });
  }
}

export default new AuthService();
