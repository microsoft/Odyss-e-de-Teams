const GainPoint = {};

GainPoint.GetPointReponse = (questions, baremes) => {
  let nb_point = 0, nb_xp = 0, total_point = 0, total_xp = 0;
  const i_question_last = questions.length - 1;

  let baremeNiveau;
  questions.forEach((q, i) => {
    baremeNiveau = baremes.find(b => b.id_niveau === q.id_niveau);
    nb_point = 0, nb_xp = 0;

    if (q.valid) {
      //gain point sur bonne réponse
      nb_xp += (i < i_question_last ? baremeNiveau.reponse_valid_xp : baremeNiveau.last_reponse_valid_xp);
      nb_point += (i < i_question_last ? baremeNiveau.reponse_valid_point : baremeNiveau.last_reponse_valid_point);
      if (q.temps_reponse <= 30000) {
        //bonus repondu en moins de 30 secondes
        nb_xp += baremeNiveau.bonus_temps_xp;
        nb_point += baremeNiveau.bonus_temps_point;
      }
    }
    if (q.video_ok) {
      //bonus video lue
      nb_xp += baremeNiveau.bonus_video_xp;
      nb_point += baremeNiveau.bonus_video_point;
    }
    q.nb_point = nb_point;
    q.nb_xp = nb_xp;
    total_point += nb_point;
    total_xp += nb_xp;
  });
  return {
    questions: questions,
    total_point: total_point,
    total_xp: total_xp
  };
};

module.exports = GainPoint;
