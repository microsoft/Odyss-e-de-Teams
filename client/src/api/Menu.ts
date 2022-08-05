// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import API from "./ApiMain";

class Menu extends API {
  protected resource = "/menu";

  getMenu(lang: string): Promise<any> {
    return super.fetchGET(this.resource, { language: lang });
  }
}

export default new Menu();
