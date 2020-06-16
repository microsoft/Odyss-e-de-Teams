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

  getAllCampaigns(): Promise<any> {
    return super.fetchGET(this.resource + "/available-missions");
  }

  setCurrentMission(data): Promise<any> {
    return super.fetchPOST(this.resource + "/set-current-mission", data);
  }

  /**** agenda  ****/
  getAgenda(): Promise<any> {
    return super.fetchGET(this.resource + "/current-agenda");
  }

  setAgendaItemStatus(data): Promise<any> {
    return super.fetchPOST(this.resource + "/set-agenda-done", data);
  }
  /**** fin agenda  ****/

  /**** assets comm  ****/
  getListAsset(type_asset: number): Promise<any> {
    return super.fetchGET(this.resource + "/assets/get-list", {
      type_asset: type_asset,
    });
  }

  getTemplate(asset: number): Promise<any> {
    return super.fetchGET(this.resource + "/emailing/get-template", {
      asset: asset
    });
  }
  /**** fin assets comm  ****/
}

export default new Admin();
