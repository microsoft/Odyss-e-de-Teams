// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const Reward = {};

Reward.SetReward = async (db, user, reward) => {
  
  // on ajoute le score (points, exp, medaille) par rapport au type de gain
  if (reward.type === "PTS") {
    const HistoGainPoints = db.getModel("HGainPoints");
    await HistoGainPoints.create({
      id_user: user.id_user,
      nb_point: reward.value,
    });
  } else if (reward.type == "EXP") {
    const HistoGainXP = db.getModel("HGainXP");
    await HistoGainXP.create({
      id_user: user.id_user,
      nb_point: reward.value,
    });
  } else if (reward.type == "MEDAL") {
    const HistoMedaille = db.getModel("HMedaille");
    await HistoMedaille.create({
      id_user: user.id_user,
      id_medaille: reward.value,
    });
  }
};

module.exports = Reward;
