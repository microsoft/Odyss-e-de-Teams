const GraphApi = {};
const https = require('https');
var querystring = require('querystring')

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