import API from "./ApiMain";

class Question extends API {
    protected resource = "/question";

    getModule(lang: string): Promise<any> {
        return super.fetchGET(this.resource + "/modules", { language: lang });
    }

    getNiveau(lang: string): Promise<any> {
        return super.fetchGET(this.resource + "/niveaux", { language: lang });
    }
}

export default new Question();
