import API from "./ApiMain";

class Avatars extends API {
  protected resource = "/avatars";

  getAvatars(): Promise<any> {
    return super.fetchGET(this.resource);
  }
}

export default new Avatars();
