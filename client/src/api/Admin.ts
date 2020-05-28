import API from "./ApiMain";

class Admin extends API {
  protected resource = "/admin";

  getExplorersCount(): Promise<any> {
    return super.fetchGET(this.resource + "/explorers-count");
  }

  getCurrentCampaignInfo(): Promise<any> {
    return super.fetchGET(this.resource + "/current-mission");
  }

  getCurrentCompanyInfo(): Promise<any> {
    return super.fetchGET(this.resource + "/companyInfos");
  }

  uploadCompanyLogo(data: FormData): Promise<any> {
    return super.fetchUploadData(this.resource + "/upload-logo", data);
  }
}

export default new Admin();
