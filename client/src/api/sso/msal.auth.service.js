import * as Msal from "msal";

// An authentication service that uses the MSAL.js library to sign in users with
// either an AAD or MSA account. This leverages the AAD v2 endpoint.
class MsalAuthService {
    constructor() {
        this.applicationConfig = {
            auth: {
                clientId: '<your client id>',
                redirectUri: `${window.location.origin}/`
            },
            cache: {
                cacheLocation: "localStorage",
                storeAuthStateInCookie: false
            }
        };

        this.app = new Msal.UserAgentApplication(this.applicationConfig);
        this.app.handleRedirectCallback((error, response) => {
            // handle redirect response or error
        });
    }

    isCallback() {
        return this.app.isCallback(window.location.hash);
    }

    login() {
        const scopes = [
            `api://${this.applicationConfig.auth.clientId}/access_as_user`,
            "https://graph.microsoft.com/User.Read"
        ];

        return (window.navigator.standalone
            ? this.app.loginRedirect(scopes)
            : this.app.loginPopup(scopes)
        ).then(() => {
            return this.app.account;
        });
    }

    logout() {
        this.app.logout();
    }

    getUser() {
        return Promise.resolve(this.app.account);
    }

    getToken() {
        var tokenRequest = {
            scopes: ["email", "openid", "profile", "offline_access", "User.Read", "TeamsActivity.Send"]
        };
        return this.app
            .acquireTokenSilent(tokenRequest)
            .catch(error => {
                return this.app
                    .acquireTokenPopup(tokenRequest)
                    .then(accessToken => {
                        return accessToken;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
    }
}

export default MsalAuthService;
