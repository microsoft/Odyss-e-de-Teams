import API from "./ApiMain";

class User extends API {
  protected resource = "/user";

  getUser(lang: string, mode: string): Promise<any> {
    return super.fetchGET(this.resource, { language: lang, mode: mode });
  }

  createUserByAD(lang: string, dataAD?: any): Promise<any> {
    return super.fetchPOST(this.resource + "/create-by-ad", dataAD, {
      language: lang,
    });
  }

  getMedaille(lang: string): Promise<any> {
    return super.fetchGET(this.resource + "/medailles", { language: lang });
  }

  setMedailleAvatar(id: number): Promise<any> {
    return super.fetchPOST(this.resource + "/set-medaille-avatar", { id: id });
  }

  getCurrentCampaignInfo(lang: string): Promise<any> {
    return super.fetchGET(this.resource + "/current-mission", { language: lang });
  }

  runChecks(): Promise<any> {
    return super.fetchGET(this.resource + "/check-rewards");
  }

  getCurrentReward(): Promise<any> {
    return super.fetchGET(this.resource + "/current-reward");
  }

  checkLevelUp(): Promise<any> {
    return super.fetchGET(this.resource + "/check-level-up");
  }

  checkNewMedal(): Promise<any> {
    return super.fetchGET(this.resource + "/check-new-medal");
  }
}

export default new User();
