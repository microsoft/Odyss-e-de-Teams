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

    return await new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            res.on('data', d => {
                resolve(d)
            })
        });

        req.on('error', error => {
            console.error(error)
            reject(error)
        });

        req.write(data)
        req.end();
    });
};

module.exports = GraphApi;