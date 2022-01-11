const GraphApi = {};
const https = require('https');
var querystring = require('querystring');
const msal = require('@azure/msal-node');

GraphApi.getGraphToken = async () => {
    const data = querystring.stringify(
        {
            'grant_type': 'client_credentials',
            'client_id': process.env.AZUREAD_APPLICATION_ID,
            'client_secret': process.env.AZUREAD_APP_SECRET,
            'scope': 'https://graph.microsoft.com/.default',
        });
    const options = {
        hostname: 'login.microsoftonline.com',
        port: 443,
        path: '/' + process.env.AZUREAD_ANNUAIRE_ID + '/oauth2/v2.0/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            res.on('data', d => {
                d = d.toString('utf8');
                d = JSON.parse(d);
                resolve(d)
            });
        });

        req.on('error', error => {
            console.error(error)
            reject(error)
        });

        req.write(data);
        req.end();
    });
};

GraphApi.getUsefullToken = async (tokenClient) => {
    const config = {
        auth: {
            clientId: process.env.AZUREAD_APPLICATION_ID, //Le client ID de l'application enregistrée sur Azure Active Directory 
            authority: "https://login.microsoftonline.com/" + process.env.AZUREAD_ANNUAIRE_ID, //Le Tenant ID de votre domaine Azure ACtive Directory
            clientSecret: process.env.AZUREAD_APP_SECRET,
        }
    };
    const cca = new msal.ConfidentialClientApplication(config);
    const oboRequest = {
        oboAssertion: tokenClient,
        scopes: ["email", "openid", "profile", "offline_access", "User.Read", "TeamsActivity.Send"],
    }
    return cca.acquireTokenOnBehalfOf(oboRequest).then((response) => {
        return response;
    }).catch((error) => {
        return { error: error }
    });
}

GraphApi.getOdysseeInternalId = async (token) => {
    const options = {
        hostname: 'graph.microsoft.com',
        port: 443,
        path: "/v1.0/appCatalogs/teamsApps?$filter=externalId%20eq%20'" + process.env.AZUREAD_APPLICATION_ID + "'",
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    };
    return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            res.on('data', d => {
                d = d.toString('utf8');
                d = JSON.parse(d)
                if (!d.error) { // si il n'y a pas d'erreur on renvoit l'id de l'application
                    d = d.value[0].id;
                }
                resolve(d)
            });
        });

        req.on('error', error => {
            console.error(error)
            reject(error)
        });

        req.end();
    });
};

GraphApi.getListUser = async (token, letter) => {
    const options = {
        hostname: 'graph.microsoft.com',
        port: 443,
        path: "/v1.0/users?$filter=startswith(givenName,'" + letter + "')",
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            let result = '';
            res.on('data', d => {
                d = d.toString('utf8');
                result += d;
            });
            res.on('end', () => {
                result = JSON.parse(result);
                resolve(result.value)
            });
        });

        req.on('error', error => {
            console.error(error)
            reject(error)
        });

        req.end();
    });
};

GraphApi.sendNotificationToAllUser = (token, ttUser, body) => {
    for (let i = 0; i < ttUser.length; i++) {
        let options = {
            hostname: 'graph.microsoft.com',
            port: 443,
            path: '/v1.0/users/' + ttUser[i].id + '/teamwork/sendActivityNotification',
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        };
        const req = https.request(options, res => {
            res.on('data', (d) => {
                d = JSON.parse(d.toString('utf8'))
                if (d.error) {
                    console.log('Erreur lors de l\'envoi à ' + ttUser[i].displayName);
                    console.log(d)
                }
            })
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log('Notification envoyée à ' + ttUser[i].displayName)
                }
            });
        });

        req.on('error', error => {
            console.error(error)
        });
        req.write(JSON.stringify(body))
        req.end();
    }
};

module.exports = GraphApi;