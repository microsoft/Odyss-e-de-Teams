
-- APRR
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (34, 'arnaud.morel@aprr.fr', true, now(), now()),
	    (34, 'herve.durand@aprr.fr', true, now(), now());
		
	SELECT f_set_date_semaine(34, '2020-07-06'::date);

--- SNCF
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (26, 'PTBN05191_ADM@commun.ad.sncf.fr', true, now(), now()),
	    (26, 'PAIO04811_ADM@commun.ad.sncf.fr', true, now(), now());

	SELECT f_set_date_semaine(26, '2020-09-21'::date);

-- Colas
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
	    (8, 'zhye@colas.com', true, now(), now());
		
	SELECT f_set_date_semaine(8, '2020-09-21'::date);


-- Groupe Avril
	INSERT INTO public.t_organisation (nom, actif, horodatage, horodatage_creation) VALUES 
        ('Groupe Avril', false, now(), now());
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (35, 'carole.lebris@groupeavril.com', true, now(), now()),
	    (35, 'anthony.lebarbanchon@groupeavril.com', true, now(), now());
		
	SELECT f_set_date_semaine(35, '2020-10-05'::date);

-- MGEN
	INSERT INTO public.t_organisation (nom, actif, horodatage, horodatage_creation) VALUES 
        ('MGEN', false, now(), now());
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (36, 'cpasquier1@mgen.fr', true, now(), now()),
	    (36, 'hlao@mgen.fr', true, now(), now()),
	    (36, 'cnotin@mgen.fr', true, now(), now());

	SELECT f_set_date_semaine(36, '2020-09-28'::date);

-- Faurecia - Test
	INSERT INTO public.t_organisation (nom, actif, horodatage, horodatage_creation) VALUES 
        ('Faurecia - Test', false, now(), now());
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (37, 'maryon.reboulet@faurecia.com', true, now(), now()),
	    (37, 'paul.anthoine-milhomme@faurecia.com', true, now(), now()),
	    (37, 'pascaline.aincy-ext@faurecia.com', true, now(), now()),
	    (37, 'hazem.elmahmoudi@faureciaonline.onmicrosoft.com', true, now(), now()),
	    (37, 'christophe.lyonnet@faureciaonline.onmicrosoft.com ', true, now(), now()); 
		
	SELECT f_set_date_semaine(37, '2020-10-12'::date);

-- Renault Sport Racing
	INSERT INTO public.t_organisation (nom, actif, horodatage, horodatage_creation) VALUES 
        ('Renault Sport Racing', false, now(), now());
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (38, 'christopher.tran@fr.renaultsportracing.com', true, now(), now());
		
	SELECT f_set_date_semaine(38, '2020-10-05'::date);

-- Natixis - Staging
	INSERT INTO public.t_organisation (nom, actif, horodatage, horodatage_creation) VALUES 
        ('Natixis - Staging', false, now(), now());
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (39, 'amina.farah@natixis.net', true, now(), now());
		
	SELECT f_set_date_semaine(39, '2020-10-05'::date);

-- Vallourec
	INSERT INTO public.t_organisation (nom, actif, horodatage, horodatage_creation) VALUES 
        ('Vallourec', false, now(), now());
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (40, 'henri.planchon@vallourec.com', true, now(), now()),
        (40, 'sarah.bougaa@ext.vallourec.com', true, now(), now());
		
	SELECT f_set_date_semaine(40, '2020-10-12'::date);


-- Vinci - production
	INSERT INTO public.t_organisation (nom, actif, horodatage, horodatage_creation) VALUES 
        ('Vinci', false, now(), now());
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (41, 'admino365fmo@vinci.onmicrosoft.com', true, now(), now()),
        (41, 'admino365fso@vinci.onmicrosoft.com', true, now(), now()),
        (41, 'admino365fle@vinci.onmicrosoft.com', true, now(), now()),
        (41, 'admino365hbh-ext@vinci.onmicrosoft.com', true, now(), now());
		

	SELECT f_set_date_semaine(41, '2020-11-30'::date);

-- Vinci - Pre production
	INSERT INTO public.t_organisation (nom, actif, horodatage, horodatage_creation) VALUES 
        ('Vinci - Pre production', false, now(), now());
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (42, 'adminappso365fso@vinci-prp.com', true, now(), now()),
        (42, 'adminappso365fmo@vinci-prp.com', true, now(), now()),
        (42, 'admino365hbh-ext@vinciprp.onmicrosoft.com', true, now(), now()),
        (42, 'adminO365fle@vinciprp.onmicrosoft.com', true, now(), now()),
        (42, 'gwenaelle.huynh@vinci-prp.com', true, now(), now());
		
	SELECT f_set_date_semaine(42, '2020-10-12'::date);


-- Saint Gobain
	INSERT INTO public.t_organisation (nom, actif, horodatage, horodatage_creation) VALUES 
        ('Saint Gobain', false, now(), now());
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (43, 'david.aemhoun@ext.saint-gobain.com', true, now(), now()),
        (43, 'celine.dasilva@saint-gobain.com', true, now(), now()),
        (43, 'almudena.perezgarcia@ext.saint-gobain.com', true, now(), now()),
        (43, 'caroline.bourgoin@ext.saint-gobain.com', true, now(), now()),
        (43, 'celine.canivenq@ext.saint-gobain.com', true, now(), now());
		
	SELECT f_set_date_semaine(43, '2020-11-16'::date);

-- Sonepar
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (27, 'abin.babu_ext@sonepar.com', true, now(), now()),
        (27, 'baptiste.da-silva@sonepar.com', true, now(), now()),
        (27, 'mickael.huguenin@sonepar.com', true, now(), now());
		
	SELECT f_set_date_semaine(27, '2020-11-23'::date);


-- BPCE Staging
	INSERT INTO public.t_organisation (nom, actif, horodatage, horodatage_creation) VALUES 
        ('BPCE Staging (annulé - remplacé par Natixis Staging)', false, now(), now());
	SELECT f_set_date_semaine(44, '2020-11-23'::date);

	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (44, 'picasse@groupebpcestaging.onmicrosoft.com', true, now(), now());
		
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (39, 'picasse@groupebpcestaging.onmicrosoft.com', true, now(), now());
		
------ debug encoding

CREATE TABLE public.t_debug_encoding
(
  id_user integer,
  typ integer,
  nom text,
  CONSTRAINT pk_t_debug_encoding PRIMARY KEY (id_user, typ)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_debug_encoding TO odyssee_teams_appli;
