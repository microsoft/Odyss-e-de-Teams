
--- SNCF
	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (26, 'PTBN05191_ADM@commun.ad.sncf.fr', true, now(), now()),
	    (26, 'PAIO04811_ADM@commun.ad.sncf.fr', true, now(), now());

	SELECT f_set_date_semaine(26, '2020-06-29'::date);

-- APRR
/* 	INSERT INTO public.t_maitre_jeu (id_organisation, mail, actif, horodatage, horodatage_creation) VALUES 
        (26, 'arnaud.morel@aprr.fr', true, now(), now()),
	    (26, 'herve.durand@aprr.fr', true, now(), now()); */


