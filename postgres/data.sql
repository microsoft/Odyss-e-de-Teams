-- role
  INSERT INTO public.t_role (nom, actif, horodatage, horodatage_creation) VALUES 	
    ('Joueur', true, now(), now()),
    ('Admin', true, now(), now()),
    ('Super Admin', true, now(), now());

-- avatar
  INSERT INTO public.t_avatar(nom, description, image, actif, horodatage, horodatage_creation)
	VALUES ('Apollo20', 'Téméraire et robuste', 'apollo20', true, now(), now()),
	('Discovery Two', 'Puissant et imposant', 'discovery_two', true, now(), now()),
	('Odysseus', 'Attentif et réfléchi', 'odysseus', true, now(), now()),
	('USS Teams', 'Multi-usages', 'uss_teams', true, now(), now()),
	('Haddock 17', 'Audacieux et prudent', 'haddock17', true, now(), now()),
	('Llewsor 47', 'Énergique et curieux', 'llewsor47', true, now(), now());

-- medaille
  INSERT INTO public.t_medaille(nom, description, image, legendaire, actif, horodatage, horodatage_creation)
	VALUES ('Explorateur novice', 'Atteindre le niveau 5', 'explorateur_novice', false, true, now(), now()),
	('Explorateur talentueux', 'Atteindre le niveau 10', 'explorateur_talentueux', false, true, now(), now()),
	('Maître Explorateur', 'Atteindre le niveau 15', 'maitre_explorateur', true, true, now(), now()),
	('Challenger', 'Atteindre le top 100 d''un classement', 'challenger', false, true, now(), now()),
	('Pour la gloire !', 'Atteindre le top 20 d''un classement', 'pour_la_gloire', true, true, now(), now()),
	('Graine de champion', 'Répondre juste à 20 questions', 'graine_de_champion', false, true, now(), now()),
	('Chasseur d''usages Teams', 'Répondre juste à 50 questions', 'chasseur_usage_teams', false, true, now(), now()),
	('Supernova des usages Teams', 'Répondre juste à 150 questions', 'supernova_usage_teams', true, true, now(), now()),
	('Premier contact', 'Se connecter 5 jours de suite', 'premier_contact', false, true, now(), now()),
	('Ambassadeur intergalactique', 'Se connecter 15 jours de suite', 'ambassadeur_intergalactique', true, true, now(), now()),
	('Voyageur interdimensionnel', 'Se connecter au moins une fois au jeu sur desktop et mobile', 'voyageur_interdimensionnel', false, true, now(), now()),
	('Je suis une fusée', 'Répondre à 20 questions en moins de 30 secondes', 'je_suis_fusee', false, true, now(), now()),
	('Vidéo', 'Lancer 20 vidéos Teams via les différents questionnaires', 'video', false, true, now(), now()),
	('Jamais 4 sans 5', 'Répondre 15 fois juste à la 5ème question d’un questionnaire', 'jamais4_sans5', true, true, now(), now()),
	('Titre Manager', 'Répondre juste à 5 questions du module Manager', 'titre_manager1', false, true, now(), now()),
	('Titre Manager', 'Répondre juste à 30 questions du module Manager', 'titre_manager2', true, true, now(), now()),
	('Titre Pilotage', 'Répondre juste à 5 questions du module Pilotage', 'titre_pilotage1', false, true, now(), now()),
	('Titre Pilotage', 'Répondre juste à 30 questions du module Pilotage', 'titre_pilotage2', true, true, now(), now()),
	('Titre Collaboration', 'Répondre juste à 5 questions du module Collaboration', 'titre_collaboration1', false, true, now(), now()),
	('Titre Collaboration', 'Répondre juste à 30 questions du module Collaboration', 'titre_collaboration2', true, true, now(), now()),
	('Titre Meetings', 'Répondre juste à 5 questions du module Meetings', 'titre_meeting1', false, true, now(), now()),
	('Titre Meetings', 'Répondre juste à 30 questions du module Meetings', 'titre_meeting2', true, true, now(), now()),
	('Titre Mobilité', 'Répondre juste à 5 questions du module Mobilité', 'titre_mobilite1', false, true, now(), now()),
	('Titre Mobilité', 'Répondre juste à 30 questions du module Mobilité', 'titre_mobilite2', true, true, now(), now()),
	('Le collectionneur', 'Obtenir toutes les médailles communes et légendaires', 'collectionneur', true, true, now(), now());

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
	
-- multilangue
	INSERT INTO public.t_libelle_i18n (code, id_table, lang, nom, description)
	SELECT DISTINCT 'AVATAR', id_avatar, 'fr', nom, description FROM public.t_avatar
	UNION ALL
	SELECT DISTINCT 'MEDAILLE', id_medaille, 'fr', nom, description FROM public.t_medaille
	UNION ALL
	SELECT DISTINCT 'NIVEAU', id_niveau, 'fr', nom, NULL::text FROM public.t_niveau
	UNION ALL
	SELECT DISTINCT 'THEMATIQUE', id_thematique, 'fr', nom, NULL::text FROM public.t_thematique;
	
	
