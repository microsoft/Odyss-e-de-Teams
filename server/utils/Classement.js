// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const Classement = {};

Classement.GetMainQuery = (params, order_query) => {
  let main_query =
    `
                WITH w0 AS (
                    SELECT DISTINCT a.id_user, a.id_avatar, a.id_medaille_avatar, TRIM(a.nom) AS nom, a.niveau, a.nb_point, a.nb_xp, a.nb_reponse, a.nb_reponse_ok, a.nb_questionnaire_complete
                    FROM public.t_user a 
                    WHERE a.actif AND a.id_role=1 ` +
    (params.monde ? `` : ` AND a.id_organisation=:organisation`) +
    `
                ), w_medaille AS (
                    SELECT DISTINCT a.id_user, COUNT(*) AS nb
                    FROM public.h_gain_medaille a
                    GROUP BY a.id_user
                ), w_avatar AS(
                    SELECT DISTINCT a.id_avatar, TRIM(b.nom) AS nom, a.image
                    FROM public.t_avatar a
                        INNER JOIN public.t_libelle_i18n b ON a.id_avatar=b.id_table AND TRIM(b.code)='AVATAR' AND TRIM(b.lang)=:lang
                    WHERE a.actif
                ), w_medaille_avatar AS(
                    SELECT DISTINCT a.id_medaille, TRIM(b.nom) AS nom, a.image
                    FROM public.t_medaille a
                        INNER JOIN public.t_libelle_i18n b ON a.id_medaille=b.id_table AND TRIM(b.code)='MEDAILLE' AND TRIM(b.lang)=:lang
                    WHERE a.actif
                )
                SELECT DISTINCT row_number() OVER (ORDER BY ` +
    order_query +
    ` DESC)::int AS rang, a.*, COALESCE(b.nb, 0) AS nb_medaille, CASE WHEN d.id_medaille IS NOT NULL THEN '/images/medaille/' || d.image ELSE '/images/avatar/' || c.image END AS image_avatar
                FROM w0 a
                    LEFT JOIN w_medaille b ON a.id_user=b.id_user
                    LEFT JOIN w_avatar c ON a.id_avatar=c.id_avatar
                    LEFT JOIN w_medaille_avatar d ON a.id_medaille_avatar=d.id_medaille
                WHERE true `;

  return main_query;
};

module.exports = Classement;
