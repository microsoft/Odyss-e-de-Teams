const { QueryTypes } = require("sequelize");

const Quizz = {};

Quizz.getReponseValid = (questions) => {
  questions.forEach(q => {
    const reponse_user = q.selectedReponseIds;
    const reponse_ok = q.reponse_ok;
    switch (q.id_mecanique) {
      case 1:
      case 3:
      case 6:
        // reponse unique
        q.valid = reponse_user[0] === reponse_ok[0];
        break;
      case 2:
      case 4:
      case 7:
        //reponse multiple, sans ordre
        // on met donc les deux table dans l ordre croissant, on ne compare que les valeurs
        reponse_user.sort();
        reponse_ok.sort();
        q.valid = reponse_user.length === reponse_ok.length && reponse_user.every((value, index) => { return value === reponse_ok[index]});
        break;
      case 5:
        //multiple avec ordre
        q.valid = reponse_user.length === reponse_ok.length && reponse_user.every((value, index) => { return value === reponse_ok[index]});
        break;
    }
  });
  return questions;
};

Quizz.getReponseByQuestionQuery = async (db, main_query, replacements, lang) => {
  const resultIdQuestion = await db.sequelize.query(
    "SELECT DISTINCT array_agg(id_question) AS ids FROM (" +
      main_query +
      ")s0",
    { replacements: replacements, type: QueryTypes.SELECT, plain: true }
  );
  const tabIdQuestion = resultIdQuestion["ids"];

  const resultReponse = await db.sequelize.query(
    `
    SELECT DISTINCT a.id_reponse, a.id_question, TRIM(b.nom) AS nom, a.asset, a.ordre 
    FROM public.t_reponse a 
      INNER JOIN public.t_libelle_i18n b ON a.id_reponse=b.id_table AND TRIM(b.code)='REPONSE' AND TRIM(b.lang)=:lang
    WHERE a.actif AND a.id_question = ANY(:ids::int[]) ORDER BY a.id_question, a.ordre`,
    {
      replacements: {
        ids: "{" + tabIdQuestion.join(",") + "}",
        lang: lang,
      },
      type: QueryTypes.SELECT,
    }
  );
  return resultReponse;
};

module.exports = Quizz;
