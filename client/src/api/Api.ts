const API_TOKEN = "dd51c6450623cd49125f26620b0c14c0";

/*** menu ***/
export function getMenu(lang: string): Promise<any> {
    const url = process.env.REACT_APP_API_URL + '/menu?api_key=' + API_TOKEN + '&language=' + lang
    return fetch(url, {
        credentials: "include"
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
/*** fin menu ***/

/*** user ***/
export function getUser(lang: string, mode: string, dataAD?: any): Promise<any> {
    const url = process.env.REACT_APP_API_URL + '/user?api_key=' + API_TOKEN + '&language=' + lang + '&mode=' + mode
    return fetch(url, {
        method: 'post',
        credentials: "include",
        body: JSON.stringify(dataAD),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getMedaille(lang: string): Promise<any> {
    const url = process.env.REACT_APP_API_URL + '/user/medailles?api_key=' + API_TOKEN + '&language=' + lang
    return fetch(url, {
        credentials: "include"
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function setMedailleAvatar(id: number): Promise<any> {
    const url = process.env.REACT_APP_API_URL + '/user/set-medaille-avatar?api_key=' + API_TOKEN
    return fetch(url, {
        method: 'post',
        credentials: "include",
        body: JSON.stringify({ id: id }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
/*** user ***/

/*** classement ***/
export function getClassement(lang: string, mode: string, monde: number = 0, user: number = 0): Promise<any> {
    const url = process.env.REACT_APP_API_URL + '/classement?api_key=' + API_TOKEN + '&language=' + lang + '&mode=' + mode + (monde > 0 ? '&monde=1' : '') + (user > 0 ? '&user=1' : '')
    return fetch(url, {
        credentials: "include"
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
/*** user ***/
