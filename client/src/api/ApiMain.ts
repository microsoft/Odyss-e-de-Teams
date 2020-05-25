class API {
  protected API_TOKEN = process.env.REACT_APP_API_TOKEN;
  protected BASE_URL = process.env.REACT_APP_API_URL;

  protected fetchGET(url, params = null) {
    let urlParams = "";

    if (params) {
      Object.keys(params).forEach((e) => {
        urlParams += `&${e.toString()}=${params[e]}`;
      });
    }

    let urlAPI = url + "?api_key=" + this.API_TOKEN + (params ? urlParams : "");

    return fetch(this.BASE_URL + urlAPI)
      .then((response) => response.json())
      .catch((error) => this.handleAPIError(error));
  }

  protected fetchPOST(url, body) {
    return fetch(this.BASE_URL + url + "?api_key" + this.API_TOKEN, {
      method: "post",
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
