import API from "./ApiMain";

class User extends API {
  protected resource = "/user";

  getUser(lang: string, mode: string): Promise<any> {
    return super.fetchGET(this.resource, { language: lang, mode: mode });
  }

  getMedaille(lang: string): Promise<any> {
    return super.fetchGET(this.resource + "/medailles", { language: lang });
  }

  setMedailleAvatar(id: number): Promise<any> {
    return super.fetchPOST(this.resource + "/set-medaille-avata", { id: id });
  }
}

export default new User();
