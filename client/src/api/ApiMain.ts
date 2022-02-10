// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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

    let urlAPI =
      this.BASE_URL +
      url +
      "?api_key=" +
      this.API_TOKEN +
      (params ? urlParams : "");

    return fetch(urlAPI, {
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((error) => this.handleAPIError(error));
  }

  protected sendNotification(url: string, params: any = null) {
    let urlParams = "";
    if (params) {
      Object.keys(params).forEach((e) => {
        if (params[e]) {
          urlParams += `&${e.toString()}=${params[e]}`;
        }
      });
    }

    let urlAPI =
      this.BASE_URL +
      url +
      "?api_key=" +
      this.API_TOKEN +
      (params ? urlParams : "");

    return fetch(urlAPI, {
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((error) => this.handleAPIError(error));
  }

  protected fetchPOST(url: string, body: any, params: any = null) {
    return this.fetchWithBody(url, body, params, "post");
  }

  protected fetchDELETE(url: string, body: any, params: any = null) {
    return this.fetchWithBody(url, body, params, "delete");
  }

  private fetchWithBody(
    url: string,
    body: any,
    params: any = null,
    method: string
  ) {
    let urlParams = "";
    if (params) {
      Object.keys(params).forEach((e) => {
        if (params[e]) {
          urlParams += `&${e.toString()}=${params[e]}`;
        }
      });
    }

    let urlAPI =
      this.BASE_URL +
      url +
      "?api_key=" +
      this.API_TOKEN +
      (params ? urlParams : "");

    return fetch(urlAPI, {
      method: method,
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

  protected fetchUploadData(url: string, body: any, params: any = null) {
    let urlParams = "";
    if (params) {
      Object.keys(params).forEach((e) => {
        if (params[e]) {
          urlParams += `&${e.toString()}=${params[e]}`;
        }
      });
    }

    let urlAPI =
      this.BASE_URL +
      url +
      "?api_key=" +
      this.API_TOKEN +
      (params ? urlParams : "");

    return fetch(urlAPI, {
      method: "POST",
      credentials: "include",
      body: body,
    });
  }
}

export default API;
