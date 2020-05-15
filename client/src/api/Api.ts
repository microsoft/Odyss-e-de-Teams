const API_TOKEN = "dd51c6450623cd49125f26620b0c14c0";

/*** menu ***/
export function getMenu(lang: string): Promise<any> {
    const url = process.env.REACT_APP_API_URL + '/menu?api_key=' + API_TOKEN + '&language=' + lang
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
/*** fin menu ***/

/*** user ***/
export function getUser(lang: string, mode: string): Promise<any> {
    const url = process.env.REACT_APP_API_URL + '/user?api_key=' + API_TOKEN + '&language=' + lang + '&mode=' + mode
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
/*** user ***/

/* 
exemple PPOST
export function generatePowerPoint(casUsageIds: number[]): Promise<any> {
    const url = process.env.REACT_APP_API_URL + '/generate-powerpoint?api_key=' + API_TOKEN + '&language=fr'
    return fetch(url, {
        method: 'post',
        body: JSON.stringify({ casUsageIds: casUsageIds }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
} */