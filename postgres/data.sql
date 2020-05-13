/* -- poste
  INSERT INTO public.t_poste (id_poste, nom, nom_diminutif, actif, horodatage, horodatage_creation) VALUES 	
    (1, 'Comptable', null, true, now(), now()),
    (2, 'Directeur Ressources Humaines', 'DRH', true, now(), now()),
    (3, 'Manager', null, true, now(), now()),
    (4, 'Directeur Administratif et Financier', 'DAF', true, now(), now()),
    (5, 'Responsable Marketing', 'CMO', true, now(), now()),
    (6, 'Directeur d’exploitation', 'DOP', true, now(), now()),
    (7, 'Chargé d’études', 'Etudes', true, now(), now()),
    (8, 'Chef de produit', 'Produit', true, now(), now()),
    (9, 'Expert d’assurance', 'Assurance', true, now(), now()),
    (10, 'Chargé de clientèle', 'Clientèle', true, now(), now()),
    (11, 'Responsable informatique', 'RI', true, now(), now()),
    (12, 'Technicien logistique', 'Logisticien', true, now(), now()),
    (13, 'Informaticien', null, true, now(), now()),
    (14, 'Agent gardien', null, true, now(), now()),
    (15, 'Agent social', null, true, now(), now()),
    (16, 'Notaire', null, true, now(), now()),
    (17, 'Avocat', null, true, now(), now()),
    (18, 'Conseiller technique', 'Conseiller', true, now(), now()),
    (19, 'Gardien d’immeuble', 'Gardien', true, now(), now()),
    (20, 'Architecte', null, true, now(), now()),
    (21, 'Ingénieur', null, true, now(), now()),
    (22, 'Responsable/ Technicien de laboratoire', 'Laboratoire', true, now(), now()),
    (23, 'Électricien', null, true, now(), now());

	-- relation cas usage / poste
	WITH w_poste AS(
		SELECT DISTINCT id_poste FROM public.t_poste
	), w_i AS(
		SELECT DISTINCT us_backlog
		FROM public.i_us_backlog 
		WHERE poste='tous'
	), w_final AS (
		SELECT DISTINCT a.us_backlog, b.id_poste
		FROM w_i a
			CROSS JOIN w_poste b
		UNION 
		SELECT DISTINCT us_backlog, unnest(string_to_array(poste, ','))::int
		FROM public.i_us_backlog 
		WHERE poste<>'tous'
	)
	INSERT INTO public.j_cas_usage_poste
	SELECT DISTINCT b.id_cas_usage, a.id_poste
	FROM w_final a
		INNER JOIN public.t_cas_usage b ON TRIM(a.us_backlog)=TRIM(b.us_backlog);

	-- relation cas usage / activite
	WITH w_activite AS(
		SELECT DISTINCT id_activite FROM public.t_activite
	), w_i AS(
		SELECT DISTINCT us_backlog
		FROM public.i_us_backlog 
		WHERE secteur='tous'
	), w_final AS (
		SELECT DISTINCT a.us_backlog, b.id_activite
		FROM w_i a
			CROSS JOIN w_activite b
		UNION 
		SELECT DISTINCT us_backlog, unnest(string_to_array(secteur, ','))::int
		FROM public.i_us_backlog 
		WHERE secteur<>'tous'
	)
	INSERT INTO public.j_cas_usage_activite
	SELECT DISTINCT b.id_cas_usage, a.id_activite
	FROM w_final a
		INNER JOIN public.t_cas_usage b ON TRIM(a.us_backlog)=TRIM(b.us_backlog);
		 */