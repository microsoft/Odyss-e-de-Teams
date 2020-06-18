import API from "./ApiMain";

class Classement extends API {
  protected resource = "/classement";

  getClassement(
    lang: string,
    mode: string,
    option: any = null
  ): Promise<any> {
    return super.fetchGET(this.resource, {
      language: lang,
      mode: mode,
      monde: option.monde,
      user: option.user,
      limit: option.limit
    });
  }
}

export default new Classement();
