import API from "./ApiMain";
import i18n from '../config/i18n';

class Avatars extends API {
  protected resource = "/avatars";

  getAvatars(): Promise<any> {
    return super.fetchGET(this.resource, { language: i18n.language });
  }
}

export default new Avatars();
