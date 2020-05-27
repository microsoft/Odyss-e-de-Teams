class API {
    protected API_TOKEN = process.env.REACT_APP_API_TOKEN;
    protected BASE_URL = process.env.REACT_APP_API_URL;

    protected fetchGET(url: string, params: any = null) {
        let urlParams = "";
        if (params) {
            Object.keys(params).forEach((e) => {
                if (params[e]) {
                    urlParams += `&${e.toString()}=${params[e]}`;
                }
            });
        }

        let urlAPI = this.BASE_URL + url + "?api_key=" + this.API_TOKEN + (params ? urlParams : "");

        return fetch(urlAPI, {
            credentials: "include"
        })
            .then((response) => response.json())
            .catch((error) => this.handleAPIError(error));
    }

    protected fetchPOST(url: string, body: any, params: any = null) {
        let urlParams = "";
        if (params) {
            Object.keys(params).forEach((e) => {
                if (params[e]) {
                    urlParams += `&${e.toString()}=${params[e]}`;
                }
            });
        }

        let urlAPI = this.BASE_URL + url + "?api_key=" + this.API_TOKEN + (params ? urlParams : "");

        return fetch(urlAPI, {
            method: "post",
            credentials: "include",
            body: JSON.stringify(body),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .catch((error) => this.handleAPIError(error));
    }

    handleAPIError(error) {
        console.error(error);
    }
}

export default API;
