import API from "./ApiMain";
import AuthService from "api/sso/auth.service";

class Admin extends API {
  protected resource = "/admin";

  getExplorersCount(): Promise<any> {
    return super.fetchGET(this.resource + "/explorers-count");
  }

  getCurrentCampaignInfo(lang: string): Promise<any> {
    return super.fetchGET(this.resource + "/current-mission", { language: lang });
  }

  getCurrentCompanyInfo(): Promise<any> {
    return super.fetchGET(this.resource + "/companyInfos");
  }

  uploadCompanyLogo(data: FormData): Promise<any> {
    return super.fetchUploadData(this.resource + "/upload-logo", data);
  }

  getAllCampaigns(lang: string): Promise<any> {
    return super.fetchGET(this.resource + "/available-missions", { language: lang });
  }

  setCurrentMission(data): Promise<any> {
    return super.fetchPOST(this.resource + "/set-current-mission", data);
  }

  /**** agenda  ****/
  getAgenda(lang: string): Promise<any> {
    return super.fetchGET(this.resource + "/current-agenda", { language: lang });
  }

  setAgendaItemStatus(data): Promise<any> {
    return super.fetchPOST(this.resource + "/set-agenda-done", data);
  }
  /**** fin agenda  ****/

  /**** notification  ****/
  async sendNotification(data): Promise<any> {
    let body = {
      topic: {
        "source": 'text',
        "value": data.title,
      },
      "activityType": 'sendNotificationToUser',
      "previewText": {
        "content": data.value,
      },
    }
    let token = await AuthService.getToken();
    return super.fetchPOST(this.resource + '/send-notification', { token: token.accessToken || token, body: body });
  }
  /**** fin notification  ****/

  /**** assets comm  ****/
  getListAsset(type_asset: number, lang: string): Promise<any> {
    return super.fetchGET(this.resource + "/assets/get-list", {
      type_asset: type_asset,
      language: lang
    });
  }

  getTemplate(asset: number, lang: string): Promise<any> {
    return super.fetchGET(this.resource + "/emailing/get-template", {
      asset: asset,
      language: lang
    });
  }

  getThemes(lang: string): Promise<any> {
    return super.fetchGET(this.resource + "/themes", {
      language: lang
    });
  }

  activateThemes(themes: number[]): Promise<boolean> {
    return super.fetchDELETE(this.resource + "/themes", themes);
  }

  deactivateThemes(themes: number[]): Promise<boolean> {
    return super.fetchPOST(this.resource + "/themes", themes);
  }
  /**** fin assets comm  ****/
}

export default new Admin();
