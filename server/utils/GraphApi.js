const GraphApi = {};
const https = require('https');

GraphApi.getGraphToken = async (token) => {
    const data = JSON.stringify(
        {
            grant_type: encodeURI('client_credentials'),
            client_id: encodeURI(process.env.AZUREAD_APPLICATION_ID),
            client_secret: encodeURI(process.env.AZUREAD_APP_SECRET),
            scope: encodeURI('https://graph.microsoft.com/.default'),
            requested_token_use: encodeURI('on_behalf_of'),
            assertion: encodeURI(token)
        }
    )
    console.log(data)
    const options = {
        hostname: 'login.microsoftonline.com',
        port: 443,
        path: '/ef866cb3-5ed9-490c-a761-90c3ddaee64e/oauth2/v2.0/token',
        method: 'POST',
        headers: {
            'content-type': 'x-www-form-urlencoded',
        }
    };

    return await new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            console.log('ouiiiiazzeufhzrfhaofizefuIH')
            console.log(`statusCode: ${res.statusCode}`)

            res.on('data', d => {
                console.log('ouaaaaaaaaiiiiiiiiissss')
                process.stdout.write(d);
                console.log(d)
                resolve(d)
            })
        });

        req.on('error', error => {
            console.error(error)
        });

        req.write(data)
        req.end();
    });
};

module.exports = GraphApi;