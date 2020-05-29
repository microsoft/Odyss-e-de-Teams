import API from "./ApiMain";

class Question extends API {
    protected resource = "/question";

    getModule(lang: string): Promise<any> {
        return super.fetchGET(this.resource + "/modules", { language: lang });
    }

    getNiveau(lang: string): Promise<any> {
        return super.fetchGET(this.resource + "/niveaux", { language: lang });
    }

    getQuizz(lang: string, dataQuizz: any): Promise<any> {
        return super.fetchGET(this.resource + "/quizz", { language: lang, module: dataQuizz.id_module, niveau: dataQuizz.id_niveau });
    }
}

export default new Question();
