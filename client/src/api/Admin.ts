import API from "./ApiMain";

class Admin extends API {
  protected resource = "/admin";

  getExplorersCount(): Promise<any> {
    return super.fetchGET(this.resource + "/explorers-count");
  }

  getCurrentCampaignInfo(): Promise<any> {
    return super.fetchGET(this.resource + "/current-mission");
  }
}

export default new Admin();
