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

GraphApi.getUsefullToken = async (tokenClient) => {
    const config = {
        auth: {
            clientId: process.env.AZUREAD_APPLICATION_ID, //Le client ID de l'application enregistrée sur Azure Active Directory 
            authority: "https://login.microsoftonline.com/" + process.env.AZUREAD_ANNUAIRE_ID, //Le Tenant ID de votre domaine Azure ACtive Directory
            clientSecret: process.env.AZUREAD_APP_SECRET,
        }
    };
    console.log("---------------Auth config is :")
    console.log(config.auth.clientId);
    console.log(config.auth.authority);
    console.log(config.auth.clientSecret);
    const cca = new msal.ConfidentialClientApplication(config);
    const oboRequest = {
        oboAssertion: tokenClient,
        scopes: ["TeamsActivity.Send"],
    }
    console.log("-------------------marcher")
    return cca.acquireTokenOnBehalfOf(oboRequest).then((response) => {
        console.log("----------------token acquireTokenOnBehalfOf:"+response)
        return response;
<<<<<<< HEAD
    }).catch((error) => {
        console.log("----------------error acquireTokenOnBehalfOf:"+error)
=======
    }).catch((error) => { // TODO: attention une erreur ici veut peut être dire qu'on est sur navigateur et qu'on a pas besoin de ce token, si on est sur teams il faut regarder l'erreur de plus près
        console.log(error)
>>>>>>> f00370d078f92cf27b11616de5f9c9ef04376f2b
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
                // console.log("---------------the result is :"+ result)
                result = JSON.parse(result);
                // console.log("---------------Value is :"+ result.value)
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
<<<<<<< HEAD
    for (let i = 0; i < ttUser.length; i++) {
        console.log("-------------------Token3:" + token)
        let options = {
            hostname: 'graph.microsoft.com',
            port: 443,
            path: '/v1.0/users/' + ttUser[i].id + '/teamwork/sendActivityNotification',
            // path:  '/v1.0/users/d41ea76a-5e96-477a-a0c5-678c5536ba59/teamwork/sendActivityNotification',
=======
    /* for (let i = 0; i < ttUser.length; i++) { */
        let options = {
            hostname: 'graph.microsoft.com',
            port: 443,
            path: '/v1.0/users/d41ea76a-5e96-477a-a0c5-678c5536ba59/teamwork/sendActivityNotification',
>>>>>>> f00370d078f92cf27b11616de5f9c9ef04376f2b
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        };
        /* let options = {
            hostname: 'graph.microsoft.com',
            port: 443,
            path: '/v1.0/users/' + ttUser[i].id + '/teamwork/sendActivityNotification',
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }; */
        const req = https.request(options, res => {
            res.on('data', (d) => {
                d = JSON.parse(d.toString('utf8'))
                if (d.error) {
                    console.log("--------------------Error Notification")
                    // console.log('Erreur lors de l\'envoi à ' + ttUser[i].displayName);
                    // console.log(d)
                }
            })
            res.on('end', () => {
                if (res.statusCode === 200) {
                    // console.log('Notification envoyée à ' + ttUser[i].displayName)
                    console.log("------------------Finish")
                }
            });
        });

        req.on('error', error => {
            console.error(error)
        });
        req.write(JSON.stringify(body))
        req.end();
    /* } */
};

module.exports = GraphApi;