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

/* ----- poste 
CREATE SEQUENCE public.seq_t_poste;
GRANT ALL ON TABLE public.seq_t_poste TO odyssee_teams_appli;

CREATE TABLE public.t_poste
(
  id_poste integer NOT NULL DEFAULT nextval('public.seq_t_poste'::regclass),
  nom character(80),
  nom_diminutif character(15),
  actif boolean,
  ordre integer,
  horodatage timestamp without time zone,
  horodatage_creation timestamp without time zone,
  CONSTRAINT pk_t_poste PRIMARY KEY (id_poste)
)
WITH (
  OIDS=FALSE
);
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.t_poste TO odyssee_teams_appli;

CREATE UNIQUE INDEX idx_poste_pkey
  ON public.t_poste
  USING btree
  (id_poste);
ALTER TABLE public.t_poste CLUSTER ON idx_poste_pkey;

CREATE INDEX idx_actif_t_poste
  ON public.t_poste
  USING btree
  (actif);

CREATE INDEX idx_ordre_t_poste
  ON public.t_poste
  USING btree
  (ordre); 

-- jointure cas usage / poste
CREATE TABLE public.j_cas_usage_poste
(
	id_cas_usage integer NOT NULL,
	id_poste integer NOT NULL,
	CONSTRAINT pk_j_cas_usage_poste PRIMARY KEY (id_cas_usage , id_poste)
);

CREATE UNIQUE INDEX idx_j_cas_usage_poste
  ON public.j_cas_usage_poste
  USING btree
  (id_cas_usage , id_poste);
ALTER TABLE public.j_cas_usage_poste CLUSTER ON idx_j_cas_usage_poste;
GRANT SELECT, UPDATE, INSERT, TRUNCATE, DELETE ON TABLE public.j_cas_usage_poste TO odyssee_teams_appli;
*/