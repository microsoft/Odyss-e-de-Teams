CREATE ROLE odyssee_teams_appli WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'R7x3sYh7Br9FWXZ7d39agUiv2H92Xv';

ALTER DATABASE odyssee_teams OWNER TO odyssee_teams_appli;

----- organisation  
CREATE SEQUENCE public.seq_t_organisation;
GRANT ALL ON TABLE public.seq_t_organisation TO odyssee_teams_appli;

CREATE TABLE public.t_organisation
(
  id_organisation integer NOT NULL DEFAULT nextval('public.seq_t_organisation'::regclass),
  id_semaine integer,
  nom character(180),
  logo text,
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_organisation PRIMARY KEY (id_organisation)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_organisation TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_organisation_pkey
  ON public.t_organisation
  USING btree
  (id_organisation);
ALTER TABLE public.t_organisation CLUSTER ON idx_organisation_pkey;

CREATE INDEX idx_id_semaine_t_organisation
  ON public.t_organisation
  USING btree
  (id_semaine);
  
CREATE INDEX idx_actif_t_organisation
  ON public.t_organisation
  USING btree
  (actif);
  
 ----- user 
CREATE SEQUENCE public.seq_t_user;
GRANT ALL ON TABLE public.seq_t_user TO odyssee_teams_appli;

CREATE TABLE public.t_user
(
  id_user integer NOT NULL DEFAULT nextval('public.seq_t_user'::regclass),
  id_organisation integer,
  id_role integer,
  id_avatar integer,
  id_medaille_avatar integer,
  nom character(120),
  oid_ad text,
  niveau smallint DEFAULT 1,
  nb_point integer DEFAULT 0,
  nb_xp integer DEFAULT 0,
  nb_reponse integer DEFAULT 0,
  nb_reponse_ok integer DEFAULT 0,
  nb_reponse_consecutive_top integer DEFAULT 0,
  nb_reponse_consecutive_en_cours integer DEFAULT 0,
  nb_questionnaire_complete integer DEFAULT 0,
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  horodatage_connexion timestamp without time zone,
  CONSTRAINT pk_t_user PRIMARY KEY (id_user)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_user TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_user_pkey
  ON public.t_user
  USING btree
  (id_user);
ALTER TABLE public.t_user CLUSTER ON idx_user_pkey;

CREATE INDEX idx_id_organisation_t_user
  ON public.t_user
  USING btree
  (id_organisation);

CREATE INDEX idx_id_role_t_user
  ON public.t_user
  USING btree
  (id_role);

CREATE INDEX idx_id_avatar_t_user
  ON public.t_user
  USING btree
  (id_avatar);

CREATE INDEX idx_id_medaille_avatar_t_user
  ON public.t_user
  USING btree
  (id_medaille_avatar);

CREATE INDEX idx_actif_t_user
  ON public.t_user
  USING btree
  (actif);

CREATE INDEX idx_oid_ad_t_user
  ON public.t_user
  USING btree
  (oid_ad);

 ----- avatar 
CREATE SEQUENCE public.seq_t_avatar;
GRANT ALL ON TABLE public.seq_t_avatar TO odyssee_teams_appli;

CREATE TABLE public.t_avatar
(
  id_avatar integer NOT NULL DEFAULT nextval('public.seq_t_avatar'::regclass),
  nom character(80),
  description text,
  image character(65), 
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_avatar PRIMARY KEY (id_avatar)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_avatar TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_avatar_pkey
  ON public.t_avatar
  USING btree
  (id_avatar);
ALTER TABLE public.t_avatar CLUSTER ON idx_avatar_pkey;

CREATE INDEX idx_actif_t_avatar
  ON public.t_avatar
  USING btree
  (actif);

-- role user
CREATE SEQUENCE public.seq_t_role;
GRANT ALL ON TABLE public.seq_t_role TO odyssee_teams_appli;

CREATE TABLE public.t_role
(
  id_role integer NOT NULL DEFAULT nextval('public.seq_t_role'::regclass),
  nom character(80),
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_role PRIMARY KEY (id_role)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_role TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_role_pkey
  ON public.t_role
  USING btree
  (id_role);
ALTER TABLE public.t_role CLUSTER ON idx_role_pkey;

CREATE INDEX idx_actif_t_role
  ON public.t_role
  USING btree
  (actif);

 ----- agenda 
CREATE SEQUENCE public.seq_t_agenda;
GRANT ALL ON TABLE public.seq_t_agenda TO odyssee_teams_appli;

CREATE TABLE public.t_agenda
(
  id_agenda integer NOT NULL DEFAULT nextval('public.seq_t_agenda'::regclass),
  nom character(80),
  date_agenda date,
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_agenda PRIMARY KEY (id_agenda)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_agenda TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_agenda_pkey
  ON public.t_agenda
  USING btree
  (id_agenda);
ALTER TABLE public.t_agenda CLUSTER ON idx_agenda_pkey;

CREATE INDEX idx_date_agenda_t_agenda
  ON public.t_agenda
  USING btree
  (date_agenda);

CREATE INDEX idx_actif_t_agenda
  ON public.t_agenda
  USING btree
  (actif);

 ----- medaille 
CREATE SEQUENCE public.seq_t_medaille;
GRANT ALL ON TABLE public.seq_t_medaille TO odyssee_teams_appli;

CREATE TABLE public.t_medaille
(
  id_medaille integer NOT NULL DEFAULT nextval('public.seq_t_medaille'::regclass),
  nom character(80),
  description text,
  image character(65),
  legendaire boolean, 
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_medaille PRIMARY KEY (id_medaille)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_medaille TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_medaille_pkey
  ON public.t_medaille
  USING btree
  (id_medaille);
ALTER TABLE public.t_medaille CLUSTER ON idx_medaille_pkey;

CREATE INDEX idx_actif_t_medaille
  ON public.t_medaille
  USING btree
  (actif);
 
  ----- semaine 
CREATE SEQUENCE public.seq_t_semaine;
GRANT ALL ON TABLE public.seq_t_semaine TO odyssee_teams_appli;

CREATE TABLE public.t_semaine
(
  id_semaine integer NOT NULL DEFAULT nextval('public.seq_t_semaine'::regclass),
  nom character(80),
  description text,
  ordre integer,
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_semaine PRIMARY KEY (id_semaine)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_semaine TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_semaine_pkey
  ON public.t_semaine
  USING btree
  (id_semaine);
ALTER TABLE public.t_semaine CLUSTER ON idx_semaine_pkey;

CREATE INDEX idx_ordre_t_semaine
  ON public.t_semaine
  USING btree
  (ordre);

CREATE INDEX idx_actif_t_semaine
  ON public.t_semaine
  USING btree
  (actif);

/***************************/
/****** communication*******/
/***************************/

 ----- asset_communication 
CREATE SEQUENCE public.seq_t_asset_communication;
GRANT ALL ON TABLE public.seq_t_asset_communication TO odyssee_teams_appli;

CREATE TABLE public.t_asset_communication
(
  id_asset_communication integer NOT NULL DEFAULT nextval('public.seq_t_asset_communication'::regclass),
  id_type_asset_communication integer,
  nom character(80),
  contenu text,
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_asset_communication PRIMARY KEY (id_asset_communication)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_asset_communication TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_asset_communication_pkey
  ON public.t_asset_communication
  USING btree
  (id_asset_communication);
ALTER TABLE public.t_asset_communication CLUSTER ON idx_asset_communication_pkey;

CREATE INDEX idx_id_type_asset_communication_t_asset_communication
  ON public.t_asset_communication
  USING btree
  (id_type_asset_communication);

CREATE INDEX idx_actif_t_asset_communication
  ON public.t_asset_communication
  USING btree
  (actif);
 
  ----- type_asset_communication 
CREATE SEQUENCE public.seq_t_type_asset_communication;
GRANT ALL ON TABLE public.seq_t_type_asset_communication TO odyssee_teams_appli;

CREATE TABLE public.t_type_asset_communication
(
  id_type_asset_communication integer NOT NULL DEFAULT nextval('public.seq_t_type_asset_communication'::regclass),
  nom character(80),
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_type_asset_communication PRIMARY KEY (id_type_asset_communication)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_type_asset_communication TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_type_asset_communication_pkey
  ON public.t_type_asset_communication
  USING btree
  (id_type_asset_communication);
ALTER TABLE public.t_type_asset_communication CLUSTER ON idx_type_asset_communication_pkey;

CREATE INDEX idx_actif_t_type_asset_communication
  ON public.t_type_asset_communication
  USING btree
  (actif);



/***************************/
/******** question *********/
/***************************/

 ----- question  
CREATE SEQUENCE public.seq_t_question;
GRANT ALL ON TABLE public.seq_t_question TO odyssee_teams_appli;

CREATE TABLE public.t_question
(
  id_question integer NOT NULL DEFAULT nextval('public.seq_t_question'::regclass),
  id_module integer,
  id_thematique integer,
  id_niveau integer,
  id_mecanique integer,
  nom character(180),
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_question PRIMARY KEY (id_question)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_question TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_question_pkey
  ON public.t_question
  USING btree
  (id_question);
ALTER TABLE public.t_question CLUSTER ON idx_question_pkey;

CREATE INDEX idx_id_thematique_t_question
  ON public.t_question
  USING btree
  (id_thematique);

CREATE INDEX idx_id_module_t_question
  ON public.t_question
  USING btree
  (id_module);

CREATE INDEX idx_id_niveau_t_question
  ON public.t_question
  USING btree
  (id_niveau);

CREATE INDEX idx_id_mecanique_t_question
  ON public.t_question
  USING btree
  (id_mecanique);

CREATE INDEX idx_actif_t_question
  ON public.t_question
  USING btree
  (actif);

 ----- mecanique  
CREATE SEQUENCE public.seq_t_mecanique;
GRANT ALL ON TABLE public.seq_t_mecanique TO odyssee_teams_appli;

CREATE TABLE public.t_mecanique
(
  id_mecanique integer NOT NULL DEFAULT nextval('public.seq_t_mecanique'::regclass),
  nom character(180),
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_mecanique PRIMARY KEY (id_mecanique)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_mecanique TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_mecanique_pkey
  ON public.t_mecanique
  USING btree
  (id_mecanique);
ALTER TABLE public.t_mecanique CLUSTER ON idx_mecanique_pkey;

CREATE INDEX idx_actif_t_mecanique
  ON public.t_mecanique
  USING btree
  (actif);

 ----- module  
CREATE SEQUENCE public.seq_t_module;
GRANT ALL ON TABLE public.seq_t_module TO odyssee_teams_appli;

CREATE TABLE public.t_module
(
  id_module integer NOT NULL DEFAULT nextval('public.seq_t_module'::regclass),
  nom character(180),
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_module PRIMARY KEY (id_module)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_module TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_module_pkey
  ON public.t_module
  USING btree
  (id_module);
ALTER TABLE public.t_module CLUSTER ON idx_module_pkey;

CREATE INDEX idx_actif_t_module
  ON public.t_module
  USING btree
  (actif);

 ----- thematique  
CREATE SEQUENCE public.seq_t_thematique;
GRANT ALL ON TABLE public.seq_t_thematique TO odyssee_teams_appli;

CREATE TABLE public.t_thematique
(
  id_thematique integer NOT NULL DEFAULT nextval('public.seq_t_thematique'::regclass),
  nom character(80),
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_thematique PRIMARY KEY (id_thematique)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_thematique TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_thematique_pkey
  ON public.t_thematique
  USING btree
  (id_thematique);
ALTER TABLE public.t_thematique CLUSTER ON idx_thematique_pkey;

CREATE INDEX idx_actif_t_thematique
  ON public.t_thematique
  USING btree
  (actif);


CREATE TABLE public.j_thematique_organisation_disabled
(
	id_thematique integer NOT NULL,
	id_organisation integer NOT NULL,
    horodatage timestamp without time zone,
	CONSTRAINT pk_j_thematique_organisation PRIMARY KEY (id_thematique , id_organisation)
);

CREATE UNIQUE INDEX idx_j_thematique_organisation_disabled
  ON public.j_thematique_organisation_disabled
  USING btree
  (id_thematique , id_organisation);
ALTER TABLE public.j_thematique_organisation_disabled CLUSTER ON idx_j_thematique_organisation_disabled;
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.j_thematique_organisation_disabled TO odyssee_teams_appli;


 ----- niveau  
CREATE SEQUENCE public.seq_t_niveau;
GRANT ALL ON TABLE public.seq_t_niveau TO odyssee_teams_appli;

CREATE TABLE public.t_niveau
(
  id_niveau integer NOT NULL DEFAULT nextval('public.seq_t_niveau'::regclass),
  nom character(180),
  ordre integer,
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_niveau PRIMARY KEY (id_niveau)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_niveau TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_niveau_pkey
  ON public.t_niveau
  USING btree
  (id_niveau);
ALTER TABLE public.t_niveau CLUSTER ON idx_niveau_pkey;

CREATE INDEX idx_ordre_t_niveau
  ON public.t_niveau
  USING btree
  (ordre);
  
CREATE INDEX idx_actif_t_niveau
  ON public.t_niveau
  USING btree
  (actif);
  
  
----- reponse  
CREATE SEQUENCE public.seq_t_reponse;
GRANT ALL ON TABLE public.seq_t_reponse TO odyssee_teams_appli;

CREATE TABLE public.t_reponse
(
  id_reponse integer NOT NULL DEFAULT nextval('public.seq_t_reponse'::regclass),
  id_question integer,
  nom character(180),
  actif boolean,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_reponse PRIMARY KEY (id_reponse)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_reponse TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_reponse_pkey
  ON public.t_reponse
  USING btree
  (id_reponse);
ALTER TABLE public.t_reponse CLUSTER ON idx_reponse_pkey;

CREATE INDEX idx_id_question_t_reponse
  ON public.t_reponse
  USING btree
  (id_question);

CREATE INDEX idx_actif_t_reponse
  ON public.t_reponse
  USING btree
  (actif);
  
 
/***************************/
/******** navigation *******/
/***************************/

CREATE SEQUENCE public.seq_t_page;
GRANT ALL ON TABLE public.seq_t_page TO odyssee_teams_appli;

CREATE TABLE public.t_page
(
  id_page integer NOT NULL DEFAULT nextval('public.seq_t_page'::regclass),
  nom character(35),
  router_link character(35),
  horodatage timestamp without time zone,
  actif boolean,
  ordre integer,
  is_menu boolean,
  picto text,
  CONSTRAINT pk_t_page PRIMARY KEY (id_page)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_page TO odyssee_teams_appli;

CREATE INDEX idx_ordre_t_page
  ON public.t_page
  USING btree
  (ordre);

CREATE UNIQUE INDEX idx_page_pkey
  ON public.t_page
  USING btree
  (id_page);
ALTER TABLE public.t_page CLUSTER ON idx_page_pkey;

CREATE INDEX idx_actif_t_page
  ON public.t_page
  USING btree
  (actif);


CREATE TABLE public.j_role_page
(
	id_role integer NOT NULL,
	id_page integer NOT NULL,
	CONSTRAINT pk_j_role_page PRIMARY KEY (id_role , id_page)
);

CREATE UNIQUE INDEX idx_j_role_page
  ON public.j_role_page
  USING btree
  (id_role , id_page);
ALTER TABLE public.j_role_page CLUSTER ON idx_j_role_page;
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.j_role_page TO odyssee_teams_appli;

-- FUNCTION: public.f_v_menu_user(text, integer, text, text)
CREATE OR REPLACE FUNCTION public.f_v_menu_user(
	iduser text,
	idrole integer,
	lang text,
	andquery text,
	OUT main_query text)
    RETURNS text
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

--********************************************************************************************************
--* fonction generatrice du query vue du menu
--***********************************************************************************************************************************
DECLARE
BEGIN
	main_query := 'WITH w0 AS(
		SELECT DISTINCT a.id_user, b.id_page, b.id_role
		FROM public.t_user a
			INNER JOIN public.j_role_page b ON a.id_role=b.id_role --&idrole --&iduser
	)
    SELECT DISTINCT b.id_role, a.id_page, TRIM(c.nom) AS nom, TRIM(a.router_link) AS router_link, a.is_menu, a.picto, a.ordre
    FROM public.t_page a
        INNER JOIN w0 b ON a.id_page=b.id_page
        INNER JOIN public.t_libelle_i18n c ON a.id_page=c.id_table AND TRIM(c.code)=''PAGE'' AND TRIM(c.lang)=''' || lang || '''
    WHERE a.actif=true AND a.ordre IS NOT NULL --&andquery
	ORDER BY id_role, ordre';
	IF iduser IS NOT NULL THEN
		main_query = REPLACE(main_query, '--&iduser', 'AND a.id_user IN (' || iduser || ')');
	ELSE
		main_query = REPLACE(main_query, '--&iduser', '');
	END IF;
	IF idrole IS NOT NULL THEN
		main_query = REPLACE(main_query, '--&idrole', 'AND a.id_role=' || idrole);
	ELSE
		main_query = REPLACE(main_query, '--&idrole', '');
	END IF;
	IF andquery IS NOT NULL THEN
		main_query = REPLACE(main_query, '--&andquery', andquery);
	ELSE
		main_query = REPLACE(main_query, '--&andquery', '');
	END IF;
END;

$BODY$;

 
/***************************/
/****** historisation ******/
/***************************/

 -- histo gain medaile
	CREATE SEQUENCE public.seq_h_gain_medaille;
	GRANT ALL ON TABLE public.seq_h_gain_medaille TO odyssee_teams_appli;
	
	CREATE TABLE public.h_gain_medaille
	(
		id_gain_medaille integer NOT NULL DEFAULT nextval('public.seq_h_gain_medaille'::regclass),
		id_user integer,
		id_medaille integer,
		horodatage timestamp without time zone,
		CONSTRAINT pk_h_gain_medaille PRIMARY KEY (id_gain_medaille)
	)
	WITH (
		OIDS = FALSE
	)
	TABLESPACE pg_default;
	GRANT INSERT, SELECT, UPDATE, DELETE, TRUNCATE ON TABLE public.h_gain_medaille TO odyssee_teams_appli;

	CREATE UNIQUE INDEX idx_gain_medaille_pkey
		ON public.h_gain_medaille USING btree
		(id_gain_medaille)
		TABLESPACE pg_default;

	ALTER TABLE public.h_gain_medaille
		CLUSTER ON idx_gain_medaille_pkey;

	CREATE INDEX idx_id_medaille_h_gain_medaille
		ON public.h_gain_medaille USING btree
		(id_medaille)
		TABLESPACE pg_default;

	CREATE INDEX idx_id_user_h_gain_medaille
		ON public.h_gain_medaille USING btree
		(id_user)
		TABLESPACE pg_default;

-- histo gain point
	CREATE SEQUENCE public.seq_h_gain_point;
	GRANT ALL ON TABLE public.seq_h_gain_point TO odyssee_teams_appli;
	
	CREATE TABLE public.h_gain_point
	(
		id_gain_point integer NOT NULL DEFAULT nextval('public.seq_h_gain_point'::regclass),
		id_user integer,
		nb_point integer,
		horodatage timestamp without time zone,
		CONSTRAINT pk_h_gain_point PRIMARY KEY (id_gain_point)
	)
	WITH (
		OIDS = FALSE
	)
	TABLESPACE pg_default;
	GRANT INSERT, SELECT, UPDATE, DELETE, TRUNCATE ON TABLE public.h_gain_point TO odyssee_teams_appli;

	CREATE UNIQUE INDEX idx_gain_point_pkey
		ON public.h_gain_point USING btree
		(id_gain_point)
		TABLESPACE pg_default;

	ALTER TABLE public.h_gain_point
		CLUSTER ON idx_gain_point_pkey;

	CREATE INDEX idx_id_user_h_gain_point
		ON public.h_gain_point USING btree
		(id_user)
		TABLESPACE pg_default;

-- histo gain xp
	CREATE SEQUENCE public.seq_h_gain_xp;
	GRANT ALL ON TABLE public.seq_h_gain_xp TO odyssee_teams_appli;
	
	CREATE TABLE public.h_gain_xp
	(
		id_gain_xp integer NOT NULL DEFAULT nextval('public.seq_h_gain_xp'::regclass),
		id_user integer,
		nb_point integer,
		horodatage timestamp without time zone,
		CONSTRAINT pk_h_gain_xp PRIMARY KEY (id_gain_xp)
	)
	WITH (
		OIDS = FALSE
	)
	TABLESPACE pg_default;
	GRANT INSERT, SELECT, UPDATE, DELETE, TRUNCATE ON TABLE public.h_gain_xp TO odyssee_teams_appli;

	CREATE UNIQUE INDEX idx_gain_xp_pkey
		ON public.h_gain_xp USING btree
		(id_gain_xp)
		TABLESPACE pg_default;

	ALTER TABLE public.h_gain_xp
		CLUSTER ON idx_gain_xp_pkey;

	CREATE INDEX idx_id_user_h_gain_xp
		ON public.h_gain_xp USING btree
		(id_user)
		TABLESPACE pg_default;

-- histo reponse user
	CREATE SEQUENCE public.seq_h_reponse_user;
	GRANT ALL ON TABLE public.seq_h_reponse_user TO odyssee_teams_appli;
	
	CREATE TABLE public.h_reponse_user
	(
		id_reponse_user integer NOT NULL DEFAULT nextval('public.seq_h_reponse_user'::regclass),
		id_user integer,
		valeur text,
		temps time without time zone,
        valid boolean,
		horodatage timestamp without time zone,
		CONSTRAINT pk_h_reponse_user PRIMARY KEY (id_reponse_user)
	)
	WITH (
		OIDS = FALSE
	)
	TABLESPACE pg_default;
	GRANT INSERT, SELECT, UPDATE, DELETE, TRUNCATE ON TABLE public.h_reponse_user TO odyssee_teams_appli;

	CREATE UNIQUE INDEX idx_reponse_user_pkey
		ON public.h_reponse_user USING btree
		(id_reponse_user)
		TABLESPACE pg_default;

	ALTER TABLE public.h_reponse_user
		CLUSTER ON idx_reponse_user_pkey;

	CREATE INDEX idx_id_user_h_reponse_user
		ON public.h_reponse_user USING btree
		(id_user)
		TABLESPACE pg_default;

-- histo questionnaire complete
	CREATE SEQUENCE public.seq_h_questionnaire_complete;
	GRANT ALL ON TABLE public.seq_h_questionnaire_complete TO odyssee_teams_appli;
	
	CREATE TABLE public.h_questionnaire_complete
	(
		id_questionnaire_complete integer NOT NULL DEFAULT nextval('public.seq_h_questionnaire_complete'::regclass),
        id_module integer,
        id_niveau integer,
		id_user integer,
		nb_reponse_ok integer,
		horodatage timestamp without time zone,
		CONSTRAINT pk_h_questionnaire_complete PRIMARY KEY (id_questionnaire_complete)
	)
	WITH (
		OIDS = FALSE
	)
	TABLESPACE pg_default;
	GRANT INSERT, SELECT, UPDATE, DELETE, TRUNCATE ON TABLE public.h_questionnaire_complete TO odyssee_teams_appli;

	CREATE UNIQUE INDEX idx_questionnaire_complete_pkey
		ON public.h_questionnaire_complete USING btree
		(id_questionnaire_complete)
		TABLESPACE pg_default;

	ALTER TABLE public.h_questionnaire_complete
		CLUSTER ON idx_questionnaire_complete_pkey;

	CREATE INDEX idx_id_user_h_questionnaire_complete
		ON public.h_questionnaire_complete USING btree
		(id_user);

	CREATE INDEX idx_id_module_h_questionnaire_complete
		ON public.h_questionnaire_complete USING btree
		(id_module);

	CREATE INDEX idx_id_niveau_h_questionnaire_complete
		ON public.h_questionnaire_complete USING btree
		(id_niveau);

-- histo changement niveau user
	CREATE SEQUENCE public.seq_h_niveau_user;
	GRANT ALL ON TABLE public.seq_h_niveau_user TO odyssee_teams_appli;
	
	CREATE TABLE public.h_niveau_user
	(
		id_niveau_user integer NOT NULL DEFAULT nextval('public.seq_h_niveau_user'::regclass),
		id_user integer,
		niveau smallint,
		horodatage timestamp without time zone,
		CONSTRAINT pk_h_niveau_user PRIMARY KEY (id_niveau_user)
	)
	WITH (
		OIDS = FALSE
	)
	TABLESPACE pg_default;
	GRANT INSERT, SELECT, UPDATE, DELETE, TRUNCATE ON TABLE public.h_niveau_user TO odyssee_teams_appli;

	CREATE UNIQUE INDEX idx_niveau_user_pkey
		ON public.h_niveau_user USING btree
		(id_niveau_user)
		TABLESPACE pg_default;

	ALTER TABLE public.h_niveau_user
		CLUSTER ON idx_niveau_user_pkey;

	CREATE INDEX idx_id_user_h_niveau_user
		ON public.h_niveau_user USING btree
		(id_user)
		TABLESPACE pg_default;


/***************************/
/******* multilangue *******/
/***************************/

	CREATE SEQUENCE public.seq_t_libelle_i18n;
	GRANT ALL ON SEQUENCE public.seq_t_libelle_i18n TO odyssee_teams_appli;

	CREATE TABLE public.t_libelle_i18n
	(
		id_libelle_i18n integer NOT NULL DEFAULT nextval('public.seq_t_libelle_i18n'::regclass),
		code character(20),
		id_table integer,
		lang character(2),
		nom character(180),
		description text,
		CONSTRAINT pk_t_libelle_i18n PRIMARY KEY (id_libelle_i18n)
	)
	WITH (
		OIDS = FALSE
	)
	TABLESPACE pg_default;
	GRANT INSERT, SELECT, UPDATE, DELETE, TRUNCATE ON TABLE public.t_libelle_i18n TO odyssee_teams_appli;

	CREATE UNIQUE INDEX idx_libelle_i18n_pkey
		ON public.t_libelle_i18n USING btree
		(id_libelle_i18n)
		TABLESPACE pg_default;

	ALTER TABLE public.t_libelle_i18n
		CLUSTER ON idx_libelle_i18n_pkey;

	CREATE INDEX idx_publier_t_libelle_i18n
		ON public.t_libelle_i18n USING btree
		(nom)
		TABLESPACE pg_default;

	CREATE INDEX idx_code_t_libelle_i18n
		ON public.t_libelle_i18n USING btree
		(code)
		TABLESPACE pg_default;

	CREATE INDEX idx_id_table_t_libelle_i18n
		ON public.t_libelle_i18n USING btree
		(id_table)
		TABLESPACE pg_default;

	CREATE INDEX idx_lang_t_libelle_i18n
		ON public.t_libelle_i18n USING btree
		(lang)
		TABLESPACE pg_default;
