// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { QueryTypes } = require("sequelize");

const LevelUp = {};

LevelUp.CheckLevelUp = async (db, user) => {
  let hasLevelUp = false,
    level = null,
    nb_xp = null,
    rewards = [];

  const resultLevel = await db.sequelize.query(
    `
    SELECT a.niveau, a.nb_xp, a.recompense
    FROM public.t_bareme_niveau a 
    WHERE a.actif AND a.niveau > :level ORDER BY niveau LIMIT 1`,
    {
      replacements: {
        level: user.niveau,
      },
      type: QueryTypes.SELECT,
      plain: true
    }
  );
  if (resultLevel) {
    level = resultLevel['niveau'];
    nb_xp = resultLevel['nb_xp'];
    if (user.nb_xp >= resultLevel['nb_xp']) {
      hasLevelUp = true;
      rewards = resultLevel['recompense'];
    }
  }
  return {
    hasLevelUp: hasLevelUp,
    level: level,
    nb_xp: nb_xp,
    rewards: rewards,
  };
};

module.exports = LevelUp;
