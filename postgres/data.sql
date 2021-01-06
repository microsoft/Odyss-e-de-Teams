-- Semaine
	INSERT INTO public.t_semaine(nom, ordre, description, can_play) 
		VALUES ('Lancement !', 1, 'Partir et commencer le programme', true), 
		('Stabilisation !', 2, 'Bien consolider ses connaissances', true), 
		('Progression !', 3, 'Approfondir ses usages', true), 
		('Amerrissage !', 4, 'Dernière poussée pour être un pro de Teams', true), 
		('Fin de mission', 5, null, false);
		
-- organisation
  INSERT INTO public.t_organisation (nom, actif, horodatage, horodatage_creation) VALUES 	
    ('Saegus', true, now(), now()),
	('Microsoft', true, now(), now()),
	('Air France', false, now(), now()),
	('Alstom', false, now(), now()),
	('ALTEN SA', false, now(), now()),
	('AXA GIE', false, now(), now()),
	('BPCE', false, now(), now()),
	('Colas', false, now(), now()),
	('Edenred', false, now(), now()),
	('EDF Renouvelable', false, now(), now()),
	('EUROVIA', false, now(), now()),
	('Grtgaz', false, now(), now()),
	('JCDecaux', false, now(), now()),
	('Kenzo', false, now(), now()),
	('Kering', false, now(), now()),
	('KIABI', false, now(), now()),
	('La Poste', false, now(), now()),
	('LVMH', false, now(), now()),
	('MANUFACTURE FRANCAISE DES PNEUMATIQUES MICHELIN', false, now(), now()),
	('Moet Hennessy', false, now(), now()),
	('PUBLICIS', false, now(), now()),
	('RATP', false, now(), now()),
	('RENAULT SAS', false, now(), now()),
	('SANOFI', false, now(), now()),
	('SERVIER', false, now(), now()),
	('SNCF', false, now(), now()),
	('SONEPAR', false, now(), now()),
	('SOPRA STERIA GROUP', false, now(), now()),
	('SPIE SA', false, now(), now()),
	('Suez', false, now(), now()),
	('Total', false, now(), now()),
	('VINCI AUTOROUTES', false, now(), now()),
	('VINCI CONSTRUCTION', false, now(), now()),
	('APRR', false, now(), now());

-- role
  INSERT INTO public.t_role (nom, actif, horodatage, horodatage_creation) VALUES 	
    ('Joueur', true, now(), now()),
    ('Admin', true, now(), now()),
    ('Super Admin', true, now(), now());

-- avatar
  INSERT INTO public.t_avatar(nom, description, image, actif, horodatage, horodatage_creation)
	VALUES ('Apollo20', 'Téméraire et robuste', 'apollo20.png', true, now(), now()),
	('Discovery Two', 'Puissant et imposant', 'discovery_two.png', true, now(), now()),
	('Odysseus', 'Attentif et réfléchi', 'odysseus.png', true, now(), now()),
	('USS Teams', 'Multi-usages', 'uss_teams.png', true, now(), now()),
	('Haddock 17', 'Audacieux et prudent', 'haddock17.png', true, now(), now()),
	('Llewsor 47', 'Énergique et curieux', 'llewsor47.png', true, now(), now());

-- medaille
 INSERT INTO public.t_medaille(nom, description, image, legendaire, actif, horodatage, horodatage_creation)
	VALUES ('Explorateur novice', 'Atteindre le niveau 5', 'explorateur_novice.png', false, true, now(), now()),
	('Explorateur', 'Atteindre le niveau 10', 'explorateur.png', false, true, now(), now()),
	('Explorateur galactique', 'Atteindre le niveau 15', 'explorateur_galactique.png', true, true, now(), now()),
	('Challenger', 'Atteindre le top 100 d''un classement (déblocable en semaine 4)', 'challenger.png', false, true, now(), now()),
	('Pour la gloire !', 'Atteindre le top 20 d''un classement (déblocable en semaine 4)', 'pour_la_gloire.png', true, true, now(), now()),
	('Naissance d''un astre', 'Répondre correctement à 20 questions', 'naissance_astre.png', false, true, now(), now()),
	('Chasseur d''usages Teams', 'Répondre correctement à 50 questions', 'chasseur_usage_teams.png', false, true, now(), now()),
	('Commandant des usages', 'Répondre correctement à 150 questions', 'commandant_usages_teams.png', true, true, now(), now()),
	('Premier contact', 'Se connecter 5 jours de suite', 'premier_contact.png', false, true, now(), now()),
	('Emissaire subspatial', 'Se connecter 10 jours de suite', 'emissaire_subspatial.png', false, true, now(), now()),
	('Ambassadeur intergalactique', 'Se connecter 15 jours de suite', 'ambassadeur_intergalactique.png', true, true, now(), now()),
	('Je suis une fusée', 'Répondre à 20 questions en moins d''une minute', 'je_suis_fusee.png', false, true, now(), now()),
	('Cinéphile des étoiles', 'Lancer 5 vidéos Teams via les différents questionnaires', 'hublot_vaisseau.png', false, true, now(), now()),
	('Jamais 2 sans 3', 'Répondre 15 fois juste à la 3ème question d’un questionnaire', 'jamais4_sans5.png', true, true, now(), now()),
	('Intendant interstellaire', 'Répondre correctement à 5 questions du module « Mieux collaborer en équipe »', 'intendant_interstellaire.png', false, true, now(), now()),
	('Maître de la collaboration', 'Répondre correctement à 30 questions du module « Mieux collaborer en équipe »', 'maitre_reunions.png', true, true, now(), now()),
	('Rapide comme l''éclair', 'Répondre correctement à 5 questions du module « Animer et piloter des projets »', 'rapide_eclair.png', false, true, now(), now()),
	('Maître de l''animation', 'Répondre correctement à 30 questions du module « Animer et piloter des projets »', 'maitre_collaboration.png', true, true, now(), now()),
	('Vengeur spatio-temporel', 'Répondre correctement à 5 questions du module « Communiquer efficacement »', 'vengeur_spatio_temporel.png', false, true, now(), now()),
	('Maître de la communication', 'Répondre correctement à 30 questions du module « Communiquer efficacement »', 'maitre_communication.png', true, true, now(), now()),
	('Concentration gravitationnelle', 'Répondre correctement à 5 questions du module « Optimiser les réunions »', 'concentration_gravitationnelle.png', false, true, now(), now()),
	('Maître de la réunion', 'Répondre correctement à 30 questions du module « Optimiser les réunions »', 'magnetiseur_gravitationnel.png', true, true, now(), now()),
	('La météore de Pégase', 'Répondre correctement à 5 questions du module « Mieux travailler en mobilité »', 'meteore_pegase.png', false, true, now(), now()),
	('Maître de la mobilité', 'Répondre correctement à 30 questions du module « Mieux travailler en mobilité »', 'maitre_mobilite.png', true, true, now(), now()),
	('Le collectionneur de l''infini', 'Obtenir toutes les médailles communes et légendaires', 'collectionneur_infini.png', false, true, now(), now());

-- niveau
INSERT INTO public.t_niveau(nom, cle_fichier, ordre, actif, horodatage, horodatage_creation)
	VALUES ('Débutant', 'Deb', 1, true, now(), now()),
	('Intermédiaire', 'Inter', 2, true, now(), now()),
	('Avancé', 'Avance', 3, true, now(), now());
	
-- navigation
INSERT INTO public.t_page (nom, router_link, horodatage, actif, ordre, is_menu, picto) VALUES
	('Cockpit', '#/Cockpit', now(), true, 10, true, 'cockpit.png'),
	('Jouer', '#/Jouer', now(), true, 20, true, 'jouer.png'),
	('Planning', '#/Planning', now(), true, 20, true, 'planning.png'),
	('Classements', '#/Classement', now(), true, 30, true, 'classement.png'),
	('Outillage', '#/Outillage', now(), true, 40, true, 'outillage.png'),
	('Mon Profil', '#/Profil', now(), true, 40, true, 'profil.png'),
	('Règles', '#/Regles', now(), true, 50, true, 'regle.png');

INSERT INTO public.j_role_page (id_role, id_page) VALUES (1, 1), (1, 2), (1, 4), (1, 6), (1, 7), (2, 1), (2, 3), (2, 4), (2, 5);

-- agenda
INSERT INTO public.t_agenda (nom, description, id_semaine, num_jour, heure, actif, horodatage, horodatage_creation) VALUES
	('Activer la mission « Lancement »','Interfaces joueurs', 1, 1, '09:00', true, now(), now()),
	('Communication : Envoi d''un email de lancement', 'Email organisation', 1, 1, '09:00', true, now(), now()),
	('Notification Réseaux sociaux', 'Mission semaine 1 en cours', 1, 1, '14:00', true, now(), now()),
	('Communication : Envoi d''un email rappel mission en cours', 'Email organisation', 1, 3, '09:00', true, now(), now()),
	('Notification Réseaux sociaux', 'Mission semaine 1 en cours', 1, 3, '14:00', true, now(), now()),
	('Notification Réseaux sociaux', 'Mission semaine 1 en cours', 1, 5, '09:00', true, now(), now()),	
	('Activer la mission « Stabilisation »','Interfaces joueurs', 2, 1, '09:00', true, now(), now()),
	('Notification Réseaux sociaux', 'Mission semaine 2 en cours', 2, 1, '14:00', true, now(), now()),
	('Communication : Envoi d''un email rappel mission en cours', 'Email organisation', 2, 3, '09:00', true, now(), now()),
	('Notification Réseaux sociaux', 'Mission semaine 2 en cours', 2, 3, '14:00', true, now(), now()),
	('Notification Réseaux sociaux', 'Mission semaine 2 en cours', 2, 5, '09:00', true, now(), now()),	
	('Activer la mission « Progression »','Interfaces joueurs', 3, 1, '09:00', true, now(), now()),
	('Notification Réseaux sociaux', 'Mission semaine 3 en cours', 3, 1, '14:00', true, now(), now()),
	('Communication : Envoi d''un email rappel mission en cours', 'Email organisation', 3, 3, '09:00', true, now(), now()),
	('Notification Réseaux sociaux', 'Mission semaine 3 en cours', 3, 3, '14:00', true, now(), now()),
	('Notification Réseaux sociaux', 'Mission semaine 3 en cours', 3, 5, '09:00', true, now(), now()),
	('Activer la mission « Amerrissage »','Interfaces joueurs', 4, 1, '09:00', true, now(), now()),
	('Communication : Envoi d''un email de fin de programme (saison)', 'Email organisation', 4, 1, '09:00', true, now(), now()),
	('Notification Réseaux sociaux', 'Mission semaine 4 en cours', 4, 1, '14:00', true, now(), now()),
	('Communication : Envoi d''un email rappel mission en cours', 'Email organisation', 4, 3, '09:00', true, now(), now()),
	('Notification Réseaux sociaux', 'Mission semaine 4 en cours et bientôt fin de programme (saison)', 4, 3, '14:00', true, now(), now()),
	('Notification Réseaux sociaux', 'Mission semaine 4 en cours et bientôt fin de programme (saison)', 4, 5, '09:00', true, now(), now()),
	('Communication : Envoi d''un email d’annonce des classements finaux de la saison et annonces des gagnants', 'Email organisation', 5, 1, '09:00', true, now(), now()),
	('Notification Réseaux sociaux', 'Programme terminé. Invitation à checker l’email de conclusion pour prendre connaissance des résultats et des gagnants', 5, 1, '14:00', true, now(), now());


/***************************/
/******** question *********/
/***************************/

-- mecanique
  INSERT INTO public.t_mecanique (nom, cle_fichier, actif, horodatage, horodatage_creation) VALUES 	
    ('QCM - Choix unique', 'QCMUnique', true, now(), now()),
    ('QCM - Choix multiple', 'QCMMultiple', true, now(), now()),	
    ('QCM avec vidéo - Choix unique', 'QCMUniqueVideo', true, now(), now()),
    ('QCM avec vidéo - Choix multiple', 'QCMMultipleVideo', true, now(), now()),
    ('Remettre dans l''ordre', 'BonParcours', true, now(), now()),
    ('QCM avec pictos réponses - Choix unique', 'QCMUniqueImage', true, now(), now()),
    ('QCM avec pictos réponses - Choix multiple', 'QCMMultipleImage', true, now(), now());
	

-- module
  INSERT INTO public.t_module (nom, cle_fichier, image, actif, horodatage, horodatage_creation) VALUES 	
    ('Communiquer efficacement', 'COMM', 'communiquer.png', true, now(), now()),
    ('Animer et piloter des projets', 'PILPROJ', 'piloter.png', true, now(), now()),	
    ('Optimiser les réunions', 'REU', 'reunion.png', true, now(), now()),
    ('Mieux collaborer en équipe', 'MNG', 'manager.png', true, now(), now()),
    ('Mieux travailler en mobilité', 'MOB', 'mobilite.png', true, now(), now());
	

-- multilangue
	INSERT INTO public.t_libelle_i18n (code, id_table, lang, nom, description)
	SELECT DISTINCT 'SEMAINE', id_semaine, 'fr', nom, description FROM public.t_semaine
	UNION ALL 
	SELECT 'SEMAINE', 1, 'en', 'Launch !', 'Let’s start and setup the program'
	UNION ALL 
	SELECT 'SEMAINE', 2, 'en', 'Stabilization !', 'Solidify your skills'
	UNION ALL
	SELECT 'SEMAINE', 3, 'en', 'Progression !', 'Strengthen your use cases'
	UNION ALL
	SELECT 'SEMAINE', 4, 'en', 'Landing !', 'Last boost to be an expert'
	UNION ALL
	SELECT 'SEMAINE', 5, 'en', 'Last mission', NULL
	UNION ALL
	SELECT DISTINCT 'AVATAR', id_avatar, 'fr', nom, description FROM public.t_avatar
	UNION ALL
	SELECT 'AVATAR', 1, 'en', 'Apollo20', 'Bold and robust'
	UNION ALL
	SELECT 'AVATAR', 2, 'en', 'Discovery Two', 'Strong and imposing'
	UNION ALL
	SELECT 'AVATAR', 3, 'en', 'Odysseus', 'Attentive and thoughtful'
	UNION ALL
	SELECT 'AVATAR', 4, 'en', 'USS Teams', 'Multitask'
	UNION ALL
	SELECT 'AVATAR', 5, 'en', 'Haddock 17', 'Fearless and prudent'
	UNION ALL
	SELECT 'AVATAR', 6, 'en', 'Llewsor 47', 'Dynamic and curious'
	UNION ALL
	SELECT DISTINCT 'MEDAILLE', id_medaille, 'fr', nom, description FROM public.t_medaille
	UNION ALL
	SELECT 'MEDAILLE', 1, 'en', 'Novice Explorer', 'Reach the level 5'
	UNION ALL
	SELECT 'MEDAILLE', 2, 'en', 'Explorer', 'Reach the level 10'
	UNION ALL
	SELECT 'MEDAILLE', 3, 'en', 'Galactic Explorer', 'Reach the level 15'
	UNION ALL
	SELECT 'MEDAILLE', 4, 'en', 'Challenger', 'Reach the top 100 of the GAME or EXP ranking'
	UNION ALL
	SELECT 'MEDAILLE', 5, 'en', 'For the glory !', 'Reach the top 20 of the GAME or EXP ranking'
	UNION ALL
	SELECT 'MEDAILLE', 6, 'en', 'Born to be a star', 'Answer correctly 20 questions'
	UNION ALL
	SELECT 'MEDAILLE', 7, 'en', 'Teams uses Hunter', 'Answer correctly 50 questions'
	UNION ALL
	SELECT 'MEDAILLE', 8, 'en', 'Admiral of Teams uses', 'Answer correctly 150 questions'
	UNION ALL
	SELECT 'MEDAILLE', 9, 'en', 'First contact', 'Log in 5 days in a row'
	UNION ALL
	SELECT 'MEDAILLE', 10, 'en', 'Subspace Emissary', 'Log in 10 days in a row'
	UNION ALL
	SELECT 'MEDAILLE', 11, 'en', 'Intergalactic Ambassador', 'Log in 15 days in a row'
	UNION ALL
	SELECT 'MEDAILLE', 12, 'en', 'I am the Rocketeer', 'Answer 20 questions in less than 30 seconds'
	UNION ALL
	SELECT 'MEDAILLE', 13, 'en', 'Film-lover of the stars', 'Launch 5 videos via the differents quizz'
	UNION ALL
	SELECT 'MEDAILLE', 14, 'en', 'Never twice without thrice', 'Answer the 3rd question correctly 15 times in a module'
	UNION ALL
	SELECT 'MEDAILLE', 15, 'en', 'Interstellar Intendant', 'Answer correctly 5 questions of the «Teamwork & collaboration» module'
	UNION ALL
	SELECT 'MEDAILLE', 16, 'en', 'Collaboration Master', 'Answer correctly 30 questions of the «Teamwork & collaboration» module'
	UNION ALL
	SELECT 'MEDAILLE', 17, 'en', 'Are you the Fastest Player ?', 'Answer correctly 5 questions of the «Project Management» module'
	UNION ALL
	SELECT 'MEDAILLE', 18, 'en', 'Project Management Master', 'Answer correctly 30 questions of the «Project Management» module'
	UNION ALL
	SELECT 'MEDAILLE', 19, 'en', 'Space-time avenger', 'Answer correctly 5 questions of the «Effective communication» module'
	UNION ALL
	SELECT 'MEDAILLE', 20, 'en', 'Communication Master', 'Answer correctly 30 questions of the «Effective communication» module'
	UNION ALL
	SELECT 'MEDAILLE', 21, 'en', 'Gravitational concentration', 'Answer correctly 5 questions of the «Efficient meetings» module'
	UNION ALL
	SELECT 'MEDAILLE', 22, 'en', 'Meeting Master', 'Answer correctly 30 questions of the «Efficient meetings» module'
	UNION ALL
	SELECT 'MEDAILLE', 23, 'en', 'Pegasus Meteor', 'Answer correctly 5 questions of the «Mobile work» module'
	UNION ALL
	SELECT 'MEDAILLE', 24, 'en', 'Mobile Work Master', 'Answer correctly 30 questions of the «Mobile work» module'
	UNION ALL
	SELECT 'MEDAILLE', 25, 'en', 'The Infinity Collector', 'Obtain all common and legendary badges'
	UNION ALL
	SELECT DISTINCT 'NIVEAU', id_niveau, 'fr', nom, NULL::text FROM public.t_niveau
	UNION ALL
	SELECT 'NIVEAU', 1, 'en', 'Beginner', NULL
	UNION ALL
	SELECT 'NIVEAU', 2, 'en', 'Intermediate', NULL
	UNION ALL
	SELECT 'NIVEAU', 3, 'en', 'Advanced', NULL
	UNION ALL
	SELECT DISTINCT 'MODULE', id_module, 'fr', nom, NULL::text FROM public.t_module
	UNION ALL
	SELECT 'MODULE', 1, 'en', 'Effective communication', NULL
	UNION ALL
	SELECT 'MODULE', 2, 'en', 'Project Management', NULL
	UNION ALL
	SELECT 'MODULE', 3, 'en', 'Efficient meetings', NULL
	UNION ALL
	SELECT 'MODULE', 4, 'en', 'Teamwork & collaboration', NULL
	UNION ALL
	SELECT 'MODULE', 5, 'en', 'Mobile work', NULL
	UNION ALL
	SELECT DISTINCT 'PAGE', id_page, 'fr', nom, NULL::text FROM public.t_page
	UNION ALL
	SELECT 'PAGE', 1, 'en', 'Cockpit', NULL
	UNION ALL
	SELECT 'PAGE', 2, 'en', 'Play', NULL
	UNION ALL
	SELECT 'PAGE', 3, 'en', 'Schedule', NULL
	UNION ALL
	SELECT 'PAGE', 4, 'en', 'Leaderboards', NULL
	UNION ALL
	SELECT 'PAGE', 5, 'en', 'Tools', NULL
	UNION ALL
	SELECT 'PAGE', 6, 'en', 'My profile', NULL
	UNION ALL
	SELECT 'PAGE', 7, 'en', 'Rules', NULL
	UNION ALL
	SELECT DISTINCT 'AGENDA', id_agenda, 'fr', nom, NULL::text FROM public.t_agenda
	UNION ALL
	SELECT 'AGENDA', 1, 'en', 'Activate the mission :"Launch"', 'Explorers interfaces'
	UNION ALL
	SELECT 'AGENDA', 2, 'en', 'Communication: Send the "Launch" emailing', 'Organization emailing'
	UNION ALL
	SELECT 'AGENDA', 3, 'en', 'Social network notification', 'Week 1 mission in progress'
	UNION ALL
	SELECT 'AGENDA', 4, 'en', 'Communication: Send the "Mission in progress" emailing', 'Organization emailing'
	UNION ALL
	SELECT 'AGENDA', 5, 'en', 'Social network notification', 'Week 1 mission in progress'
	UNION ALL
	SELECT 'AGENDA', 6, 'en', 'Social network notification', 'Week 1 mission in progress'
	UNION ALL
	SELECT 'AGENDA', 7, 'en', 'Activate the mission :"Stabilization"', 'Explorers interfaces'
	UNION ALL
	SELECT 'AGENDA', 8, 'en', 'Social network notification', 'Week 2 mission in progress'
	UNION ALL
	SELECT 'AGENDA', 9, 'en', 'Communication: Send the "Mission in progress" emailing', 'Organization emailing'
	UNION ALL
	SELECT 'AGENDA', 10, 'en', 'Social network notification', 'Week 2 mission in progress'
	UNION ALL
	SELECT 'AGENDA', 11, 'en', 'Social network notification', 'Week 2 mission in progress'
	UNION ALL
	SELECT 'AGENDA', 12, 'en', 'Activate the mission :"Progress"', 'Explorers interfaces'
	UNION ALL
	SELECT 'AGENDA', 13, 'en', 'Social network notification', 'Week 3 mission in progress'
	UNION ALL
	SELECT 'AGENDA', 14, 'en', 'Communication: Send the "Mission in progress" emailing', 'Organization emailing'
	UNION ALL
	SELECT 'AGENDA', 15, 'en', 'Social network notification', 'Week 3 mission in progress'
	UNION ALL
	SELECT 'AGENDA', 16, 'en', 'Social network notification', 'Week 3 mission in progress'
	UNION ALL
	SELECT 'AGENDA', 17, 'en', 'Activate the mission :"Landing"', 'Explorers interfaces'
	UNION ALL
	SELECT 'AGENDA', 18, 'en', 'Communication: Send the "End of season" emailing', 'Organization emailing'
	UNION ALL
	SELECT 'AGENDA', 19, 'en', 'Social network notification', 'Week 4 mission in progress'
	UNION ALL
	SELECT 'AGENDA', 20, 'en', 'Communication: Send the "Mission in progress" emailing', 'Organization emailing'
	UNION ALL
	SELECT 'AGENDA', 21, 'en', 'Social network notification', 'Week 4 mission in progress and end of season'
	UNION ALL
	SELECT 'AGENDA', 22, 'en', 'Social network notification', 'Week 4 mission in progress and end of season'
	UNION ALL
	SELECT 'AGENDA', 23, 'en', 'Communication: Send the "Big_announcement" emailing', 'Organization emailing'
	UNION ALL
	SELECT 'AGENDA', 24, 'en', 'Social network notification', 'Program completed. Invitation to check the emailing "Big announcement" with the results and the winners';
	
-- assets communication
	INSERT INTO public.t_type_asset_communication (nom, actif, horodatage, horodatage_creation) VALUES 	
		('Emailing', true, now(), now()),
		('RS', true, now(), now());

	INSERT INTO public.t_social_asset_communication (nom, actif, horodatage, horodatage_creation) VALUES 	
		('Yammer', true, now(), now());

	INSERT INTO public.t_social_asset_communication (nom, actif, horodatage, horodatage_creation) VALUES 	
		('Linkedin', true, now(), now());
  
	  INSERT INTO public.t_asset_communication (id_type_asset_communication, id_social_asset_communication, nom, nom_fichier, contenu, actif, horodatage, horodatage_creation) VALUES
	(1, null, 'E-mail de promotion', 'promotion.png',
		ARRAY[
			'<div style="top: 385px; position: relative; padding: 0 75px; font-size: 18pt; line-height: 22pt; font-family: ''Segoe UI''; "><h1 style="text-align:center; font-size: 30pt; line-height: 32pt; font-weight: 200; color: #5059C9; margin-bottom: 22pt;">Utiliser Microsoft Teams, un défi lunaire ?</h1><p style="text-align: center;">Fais décoller tes usages et découvre l’immensité des possibilités de Teams pas à pas, dans un jeu concours conçu spécialement pour toi !</p></div>', 
			'<div style="top: 1325px; position: relative; padding: 0 75px; font-size: 18pt; line-height: 22pt font-family: ''Segoe UI''; "><h2 style="text-align:center; font-size: 26pt; line-height: 28pt; font-weight: 200; color: #5059C9;"><strong>J-7</strong> avant le lancement,<br/>Surveille ta boîte mail !</h2></div>'
		],
		true, now(), now()),
	(1, null, 'E-mail de lancement', 'lancement.png', 
		ARRAY[
			'<div style="top: 385px; position: relative; padding: 0 75px; font-size: 18pt; line-height: 22pt; font-family: ''Segoe UI''; "><h1 style="text-align:center; font-size: 30pt; line-height: 32pt; font-weight: 200; color: #5059C9; margin-bottom: 22pt;"><br/><br/>Exploratrices, explorateurs,</h1><p style="text-align: center;">Il est temps de se lancer ! Dans le cadre de la mise en place de Teams auprès de ses équipes, nous vous invitons à en adopter les usages en vous amusant dès aujourd’hui !</p></div>'
		],
		true, now(), now()),
	(1, null, 'E-mail de fin de mission', 'fin_mission.png', 
		ARRAY[
			'<div style="top: 385px; position: relative; padding: 0 75px; font-size: 18pt; line-height: 22pt; font-family: ''Segoe UI''; "><h1 style="text-align:center; font-size: 30pt; line-height: 32pt; font-weight: 200; color: #5059C9; margin-bottom: 22pt;">Les défis de la semaine<br/>n’attendent que toi !</h1><p style="text-align: center;">Ça se corse ! Que tu aies 100% de bonnes réponses ou que tu n’aies encore jamais osé jouer, lance-toi et découvre ce qui t’attend dans de nouvelles parties de L’Odyssée de Teams !</p></div>'
		],
		true, now(), now()),
	(1, null, 'E-mail de fin de programme', 'fin_programme.png', 
		ARRAY[
			'<div style="top: 385px; position: relative; padding: 0 100px; font-size: 18pt; line-height: 22pt; font-family: ''Segoe UI''; "><h1 style="text-align:center; font-size: 30pt; line-height: 32pt; font-weight: 200; color: #5059C9; margin-bottom: 22pt;">Le programme des 4 missions<br/>est à présent terminé !</h1><p style="text-align: center;">Le programme est terminé ! Nous félicitons tous les joueurs et toutes les joueuses qui se sont prêté.e.s au jeu. Votre implication a permis de rendre le travail en équipe plus fluide et efficace !</p></div>', 
			'<div style="top: 475px; position: relative; padding: 0 75px; margin-left: 150pt; font-size: 14pt; line-height: 18pt; font-family: ''Segoe UI'';"><h2 style="font-size: 17pt; line-height: 18pt; font-weight: 400; color: #fff; margin-bottom: 12pt;">Vous faites parti d''un TOP ?</h2><p style="color: #fff; text-align: justify; font-size: 13pt; line-height: 16pt;">Si vous faites partie du TOP 20 du classement JEU ou du TOP 3 du classement EXP, contactez sans plus attendre votre Commandant de bord à l’adresse suivante : MAIL@MAIL</p></div>',
			'<div style="top: 595px; position: relative; padding: 0 75px; font-size: 14pt; line-height: 18pt; font-family: ''Segoe UI'';"><h1 style="font-size: 20pt; line-height: 22pt; font-weight: 200; color: #5059C9; margin-bottom: 22pt;">À tous les explorateurs et exploratrices</h1><p style="width: 320pt; text-align: justify; font-size: 15pt; line-height: 19pt;">Nous souhaitons vous remercier d’avoir participé à cette grande aventure et espérons vivement qu’elle vous aura permis d’en apprendre plus sur les usages collaboratifs de Microsoft Teams ! N’hésitez pas à partager vos connaissances à vos équipes ! </p></div>'
		], 
		true, now(), now()),
	(1, null, 'E-mail annonce des gagnants', 'gagnant.png', 
		ARRAY[
			'<div style="top: 395px; position: relative; padding: 0 75px; font-size: 18pt; line-height: 22pt; font-family: ''Segoe UI''; "><h1 style="text-align:center; font-size: 30pt; line-height: 32pt; font-weight: 200; color: #5059C9; margin-bottom: 22pt;">Explorateurs, exploratrices !</h1><p style="text-align: center;">Le grand jour est arrivé ! Votre Commandant de bord vous dévoile aujourd’hui le classement final des astronautes les plus ambitieux.</p></div>', 
			'<div style="top: 795px; position: relative; padding: 0 75px; font-size: 18pt; line-height: 22pt; font-family: ''Segoe UI''; "><h1 style="text-align:center; font-size: 30pt; line-height: 32pt; font-weight: 200; color: #5059C9; margin-bottom: 22pt;">Les gagnants par classement</h1><p style="text-align: left;">L’Odyssée de Teams est maintenant terminée ! Nous félicitons tous les joueurs et joueuses qui se sont prêté.e.s au jeu. Nous espérons que votre implication a permis de rendre le travail en équipe plus fluide et efficace.</p><p style="text-align: left;">Découvrez maintenant si vous faites partie des grands gagnants du jeu et contactez votre Commandant pour découvrir votre récompense.</p></div>'
		], 
		true, now(), now()),
	(2, 1, 'Bannière Yammer', 'Tuile_Yammer.png', 
		null, 
		true, now(), now()),
	(2, 2, 'Bannière Test Linkedin', 'Tuile_02.png', 
		null, 
		true, now(), now());

-- question
	ALTER TABLE public.t_reponse ADD COLUMN nom_en text;
	SELECT public.i_process_backlog_question();

	INSERT INTO public.t_libelle_i18n (code, id_table, lang, nom, description)
	SELECT DISTINCT 'QUESTION', id_question, 'fr', nom, commentaire FROM public.t_question
	UNION ALL
	SELECT DISTINCT 'REPONSE', id_reponse, 'fr', nom, NULL::text FROM public.t_reponse
	UNION ALL
	SELECT DISTINCT 'THEMATIQUE', id_thematique, 'fr', nom, NULL::text FROM public.t_thematique;

	INSERT INTO public.t_libelle_i18n (code, id_table, lang, nom, description)
	SELECT DISTINCT 'QUESTION', b.id_question, 'en', a.question_en, a.bonne_pratique_en 
	FROM public.i_question a
		INNER JOIN public.t_question b ON TRIM(a.code_question)=TRIM(b.cle_fichier)
	UNION ALL
	SELECT DISTINCT 'REPONSE', id_reponse, 'en', nom_en, NULL::text FROM public.t_reponse;

	ALTER TABLE public.t_reponse DROP COLUMN nom_en;
	
-- bareme point reponse
	INSERT INTO public.t_bareme_reponse (id_niveau, reponse_valid_xp, reponse_valid_point, last_reponse_valid_xp, last_reponse_valid_point, bonus_video_xp, bonus_video_point, bonus_temps_xp, bonus_temps_point, actif, horodatage, horodatage_creation) VALUES 
		(1, 10, 3, 15, 5, 5, 1, 5, 1, true, now(), now()),
		(2, 12, 4, 17, 6, 6, 2, 6, 2, true, now(), now()),
		(3, 15, 6, 20, 8, 8, 3, 8, 3, true, now(), now());

-- bareme niveau
	INSERT INTO public.t_bareme_niveau (niveau, nb_xp, recompense, actif, horodatage, horodatage_creation) VALUES 
		(2, 55, ARRAY['{ "type": "EXP", "value": 25 }']::json[], true, now(), now()),
		(3, 130, NULL, true, now(), now()),
		(4, 230, ARRAY['{ "type": "EXP", "value": 50 }']::json[], true, now(), now()),
		(5, 380, ARRAY['{ "type": "EXP", "value": 100 }', '{ "type": "MEDAL", "value": 1 }']::json[], true, now(), now()),
		(6, 580, NULL, true, now(), now()),
		(7, 830, NULL, true, now(), now()),
		(8, 1130, ARRAY['{ "type": "EXP", "value": 150 }']::json[], true, now(), now()),
		(9, 1480, NULL, true, now(), now()),
		(10, 1880, ARRAY['{ "type": "EXP", "value": 200 }', '{ "type": "MEDAL", "value": 2 }', '{ "type": "PTS", "value": 15 }']::json[], true, now(), now()),
		(11, 2380, NULL, true, now(), now()),
		(12, 2980, ARRAY['{ "type": "EXP", "value": 250 }']::json[], true, now(), now()),
		(13, 3680, NULL, true, now(), now()),
		(14, 4530, ARRAY['{ "type": "EXP", "value": 300 }']::json[], true, now(), now()),
		(15, 5530, ARRAY['{ "type": "EXP", "value": 550 }', '{ "type": "MEDAL", "value": 3 }', '{ "type": "PTS", "value": 50 }']::json[], true, now(), now());

-- user temp dev
	INSERT INTO public.t_user(id_organisation, id_role, id_avatar, nom, niveau, nb_point, nb_xp, nb_reponse, nb_reponse_ok, nb_reponse_consecutive_top, nb_reponse_consecutive_en_cours, nb_questionnaire_complete, actif, horodatage, horodatage_creation, horodatage_connexion)
	VALUES (1, 1, 1, 'Catherine Kefhi', 5, 100, 255, 15, 12, 5, 5, 5, true, now(), now(), now());
	
	INSERT INTO public.t_user(id_organisation, id_role, id_avatar, nom, niveau, nb_point, nb_xp, nb_reponse, nb_reponse_ok, nb_reponse_consecutive_top, nb_reponse_consecutive_en_cours, nb_questionnaire_complete, actif, horodatage, horodatage_creation, horodatage_connexion)
	VALUES (1, 1, 2, 'Barney Highfive', 7, 150, 300, 42, 27, 9, 2, 8, true, now(), now(), now());
	INSERT INTO public.t_user(id_organisation, id_role, id_avatar, nom, niveau, nb_point, nb_xp, nb_reponse, nb_reponse_ok, nb_reponse_consecutive_top, nb_reponse_consecutive_en_cours, nb_questionnaire_complete, actif, horodatage, horodatage_creation, horodatage_connexion)
	VALUES (1, 1, 3, 'Henri Gole', 3, 45, 120, 10, 10, 5, 3, 2, true, now(), now(), now());

	INSERT INTO public.t_user(id_organisation, id_role, id_avatar, nom, niveau, nb_point, nb_xp, nb_reponse, nb_reponse_ok, nb_reponse_consecutive_top, nb_reponse_consecutive_en_cours, nb_questionnaire_complete, actif, horodatage, horodatage_creation, horodatage_connexion)
	VALUES (2, 1, 4, 'Emile Feuille', 9, 164, 333, 55, 50, 13, 12, 11, true, now(), now(), now());

	INSERT INTO public.t_user(id_organisation, id_role, id_avatar, nom, actif, horodatage, horodatage_creation, horodatage_connexion)
	VALUES (1, 2, 6, 'Eddy Scylla', true, now(), now(), now());

-- ajout tid SAEGUS et MS / Pas de maitre du jeu qui active
	UPDATE public.t_organisation SET tid_ad='ef866cb3-5ed9-490c-a761-90c3ddaee64e', id_semaine_encours=1 WHERE id_organisation=1;
	UPDATE public.t_organisation SET tid_ad='72f988bf-86f1-41af-91ab-2d7cd011db47' WHERE id_organisation=2;

-- Organisation semaine / agenda
	SELECT f_set_date_semaine(1, '2020-07-06'::date);
	
	/* INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (1, 'nicolas.lapointe@saegus.com', true, now(), now()); */

-- modification structure suite traduction
	ALTER TABLE t_libelle_i18n ADD COLUMN asset text;
	UPDATE t_libelle_i18n
	SET
		asset = s0.asset
	FROM
		(SELECT DISTINCT * FROM t_question WHERE asset IS NOT NULL)s0
	WHERE
		TRIM(t_libelle_i18n.code) = 'QUESTION' AND t_libelle_i18n.id_table=s0.id_question;

	UPDATE t_libelle_i18n
	SET
		asset = s0.asset
	FROM
		(SELECT DISTINCT * FROM t_reponse WHERE asset IS NOT NULL)s0
	WHERE
		TRIM(t_libelle_i18n.code) = 'REPONSE' AND t_libelle_i18n.id_table=s0.id_reponse;
		
	UPDATE t_libelle_i18n SET asset=REPLACE(asset, '_FR', '_EN') WHERE asset IS NOT NULL AND lang='en';
