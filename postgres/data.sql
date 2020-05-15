-- role
  INSERT INTO public.t_role (nom, actif, horodatage, horodatage_creation) VALUES 	
    ('Joueur', true, now(), now()),
    ('Admin', true, now(), now()),
    ('Super Admin', true, now(), now());

-- avatar
  INSERT INTO public.t_avatar(nom, description, image, actif, horodatage, horodatage_creation)
	VALUES ('Apollo20', 'Téméraire et robuste', 'apollo20.svg', true, now(), now()),
	('Discovery Two', 'Puissant et imposant', 'discovery_two.svg', true, now(), now()),
	('Odysseus', 'Attentif et réfléchi', 'odysseus.svg', true, now(), now()),
	('USS Teams', 'Multi-usages', 'uss_teams.svg', true, now(), now()),
	('Haddock 17', 'Audacieux et prudent', 'haddock17.svg', true, now(), now()),
	('Llewsor 47', 'Énergique et curieux', 'llewsor47.svg', true, now(), now());

-- medaille
  INSERT INTO public.t_medaille(nom, description, image, legendaire, actif, horodatage, horodatage_creation)
	VALUES ('Explorateur novice', 'Atteindre le niveau 5', 'explorateur_novice.svg', false, true, now(), now()),
	('Explorateur talentueux', 'Atteindre le niveau 10', 'explorateur_talentueux.svg', false, true, now(), now()),
	('Maître Explorateur', 'Atteindre le niveau 15', 'maitre_explorateur.svg', true, true, now(), now()),
	('Challenger', 'Atteindre le top 100 d''un classement', 'challenger.svg', false, true, now(), now()),
	('Pour la gloire !', 'Atteindre le top 20 d''un classement', 'pour_la_gloire.svg', true, true, now(), now()),
	('Naissance d''un astre', 'Répondre juste à 20 questions', 'naissance_astre.svg', false, true, now(), now()),
	('Chasseur d''usages Teams', 'Répondre juste à 50 questions', 'chasseur_usage_teams.svg', false, true, now(), now()),
	('Supernova des usages Teams', 'Répondre juste à 150 questions', 'supernova_usage_teams.svg', true, true, now(), now()),
	('Premier contact', 'Se connecter 5 jours de suite', 'premier_contact.svg', false, true, now(), now()),
	('Emissaire subspatial', 'Se connecter 10 jours de suite', 'ambassadeur_intergalactique.svg', true, true, now(), now()),
	('Ambassadeur intergalactique', 'Se connecter 15 jours de suite', 'ambassadeur_intergalactique.svg', true, true, now(), now()),
	('Voyageur interdimensionnel', 'Se connecter au moins une fois au jeu sur desktop et mobile', 'voyageur_interdimensionnel.svg', false, true, now(), now()),
	('Je suis une fusée', 'Répondre à 20 questions en moins de 30 secondes', 'je_suis_fusee.svg', false, true, now(), now()),
	('Par le hublot du vaisseau', 'Lancer 20 vidéos Teams via les différents questionnaires', 'hublot_vaisseau.svg', false, true, now(), now()),
	('Jamais 4 sans 5', 'Répondre 15 fois juste à la 5ème question d’un questionnaire', 'jamais4_sans5.svg', true, true, now(), now()),
	('Intendant interstellaire', 'Répondre juste à 5 questions du module Manager', 'intendant_interstellaire.svg', false, true, now(), now()),
	('Meneur sidéral', 'Répondre juste à 30 questions du module Manager', 'meneur_sideral.svg', true, true, now(), now()),
	('Pilote de Podracer', 'Répondre juste à 5 questions du module Pilotage', 'pilote_podracer.svg', false, true, now(), now()),
	('Le plus rapide de la galaxie', 'Répondre juste à 30 questions du module Pilotage', 'plus_rapide_galaxie.svg', true, true, now(), now()),
	('Vengeur spatio-temporel', 'Répondre juste à 5 questions du module Collaboration', 'vengeur_spatio_temporel.svg', false, true, now(), now()),
	('Vengeur de l''infini', 'Répondre juste à 30 questions du module Collaboration', 'vengeur_infini.svg', true, true, now(), now()),
	('Concentration gravitationnelle', 'Répondre juste à 5 questions du module Meetings', 'concentration_gravitationnelle.svg', false, true, now(), now()),
	('Le magnétiseur gravitationnel', 'Répondre juste à 30 questions du module Meetings', 'magnetiseur_gravitatio.svg', true, true, now(), now()),
	('L''étoile filante', 'Répondre juste à 5 questions du module Mobilité', 'etoile_filante.svg', false, true, now(), now()),
	('La météore de Pégase', 'Répondre juste à 30 questions du module Mobilité', 'meteore_pegase.svg', true, true, now(), now()),
	('Le collectionneur de l''infini', 'Obtenir toutes les médailles communes et légendaires', 'collectionneur_infini.svg', true, true, now(), now());

-- niveau
INSERT INTO public.t_niveau(nom, actif, horodatage, horodatage_creation)
	VALUES ('Version basique', true, now(), now()),
	('Version améliorée', true, now(), now()),
	('Version ultime', true, now(), now());
	
-- thematique
INSERT INTO public.t_thematique(nom, actif, horodatage, horodatage_creation)
	VALUES ('Collaborer en toute simplicité', true, now(), now()),
	('Piloter un projet', true, now(), now()),
	('Organiser la réunion parfaite', true, now(), now()),
	('Manager une équipe', true, now(), now()),
	('Travailler en mobilité', true, now(), now());

-- navigation
INSERT INTO public.t_page (nom, router_link, horodatage, actif, ordre, is_menu, picto) VALUES
	('Cockpit', '/Cockpit', now(), true, 10, true, ''),
	('Jouer', '/Jouer', now(), true, 20, true, ''),
	('Planning', '/Planning', now(), true, 20, true, ''),
	('Classement', '/Classement', now(), true, 30, true, ''),
	('Outillage', '/Outillage', now(), true, 40, true, ''),
	('Mon Profil', '/Profil', now(), true, 40, true, ''),
	('Règles', '/Regles', now(), true, 50, true, '');

INSERT INTO public.j_role_page (id_role, id_page) VALUES (1, 1), (1, 2), (1, 4), (1, 6), (1, 7), (2, 1), (2, 3), (2, 4), (2, 5);

-- multilangue
	INSERT INTO public.t_libelle_i18n (code, id_table, lang, nom, description)
	SELECT DISTINCT 'AVATAR', id_avatar, 'fr', nom, description FROM public.t_avatar
	UNION ALL
	SELECT DISTINCT 'MEDAILLE', id_medaille, 'fr', nom, description FROM public.t_medaille
	UNION ALL
	SELECT DISTINCT 'NIVEAU', id_niveau, 'fr', nom, NULL::text FROM public.t_niveau
	UNION ALL
	SELECT DISTINCT 'THEMATIQUE', id_thematique, 'fr', nom, NULL::text FROM public.t_thematique
	UNION ALL
	SELECT DISTINCT 'PAGE', id_page, 'fr', nom, NULL::text FROM public.t_page;
	
	




-- user temp dev
	INSERT INTO public.t_user(id_role, id_avatar, nom, niveau, nb_point, nb_xp, nb_reponse, nb_response_ok, nb_response_consecutive_top, nb_response_consecutive_en_cours, nb_questionnaire_complete, actif, horodatage, horodatage_creation, horodatage_connexion)
	VALUES (1, 1, 'Catherine Kefhi', 4, 100, 255, 15, 12, 5, 5, 5, true, now(), now(), now());

