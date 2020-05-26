import API from "./ApiMain";

class Classement extends API {
  protected resource = "/classement";

  getClassement(
    lang: string,
    mode: string,
    monde: number = 0,
    user: number = 0
  ): Promise<any> {
    return super.fetchGET(this.resource, {
      language: lang,
      mode: mode,
      monde: monde,
      user: user,
    });
  }
}

export default new Classement();
