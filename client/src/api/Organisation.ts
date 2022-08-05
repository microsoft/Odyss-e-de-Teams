// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import API from "./ApiMain";

class Organisation extends API {
  protected resource = "/organisation";

  getOrganisationInfos(id_organisation: number): Promise<any> {
    return super.fetchGET(this.resource + "/infos", {
      id_organisation: id_organisation,
    });
  }
}

export default new Organisation();
