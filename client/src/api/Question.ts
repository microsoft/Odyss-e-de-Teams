import API from "./ApiMain";

class Question extends API {
  protected resource = "/question";

  getModule(lang: string, id?: number): Promise<any> {
    return super.fetchGET(this.resource + "/modules", { language: lang, id: id });
  }

  getNiveau(lang: string, id?: number): Promise<any> {
    return super.fetchGET(this.resource + "/niveaux", { language: lang, id: id });
  }

  getHistoQuestionnaireComplete(): Promise<any> {
    return super.fetchGET(this.resource + "/histo-questionnaire-complete");
  }

  getQuizz(lang: string, dataQuizz: any): Promise<any> {
    return super.fetchGET(this.resource + "/quizz", {
      language: lang,
      module: dataQuizz.id_module,
      niveau: dataQuizz.id_niveau,
    });
  }

  setReponseQuizz(data?: any): Promise<any> {
    return super.fetchPOST(this.resource + "/quizz/set-reponse", data);
  }

  getRecapQuizz(lang: string, dataQuizz: any): Promise<any> {
    return super.fetchGET(this.resource + "/recap-quizz", {
      language: lang,
      module: dataQuizz.id_module,
      niveau: dataQuizz.id_niveau,
    });
  }
}

export default new Question();
