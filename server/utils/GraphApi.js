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
            //requested_token_use: encodeURI('on_behalf_of'),
            //assertion: encodeURI(token) 
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
    /* TODO: attention content-length obligatoire */

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

GraphApi.getUsefullToken = async (token) => {
    const config = {
        auth: {
            clientId: "5830a2dd-c958-47bd-b6e8-676341fc5faf", //Le client ID de l'application enregistrée sur Azure Active Directory 
            authority: "https://login.microsoftonline.com/ef866cb3-5ed9-490c-a761-90c3ddaee64e", //Le Tenant ID de votre domaine Azure ACtive Directory
            clientSecret: "***REMOVED***",
        }
    };
    const cca = new msal.ConfidentialClientApplication(config);
    console.log('token de base: ' + token)
    const oboRequest = {
        oboAssertion: token,
        scopes: ["email", "openid", "profile", "offline_access", "User.Read", "TeamsActivity.Send"],
    }
    return cca.acquireTokenOnBehalfOf(oboRequest).then((response) => {
        console.log(response);
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
                d = d.value[0].id;
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

module.exports = GraphApi;