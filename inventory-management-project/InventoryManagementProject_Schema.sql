-- Table: public.inventory

-- DROP TABLE IF EXISTS public.inventory;

-- INVENTORY JUNCTION TABLE -- 
CREATE TABLE IF NOT EXISTS public.inventory
(
    warehouse_id integer NOT NULL,
    game_id integer NOT NULL,
    quantity integer,
    CONSTRAINT inventory_pkey PRIMARY KEY (warehouse_id, game_id),
    CONSTRAINT fk_inventory_warehouse_id FOREIGN KEY (warehouse_id)
        REFERENCES public.warehouses (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT inventory_game_id_fkey FOREIGN KEY (game_id)
        REFERENCES public.games (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT inventory_warehouse_id_fkey FOREIGN KEY (warehouse_id)
        REFERENCES public.warehouses (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.inventory
    OWNER to postgres;

-- GAMES TABLE --
CREATE TABLE IF NOT EXISTS public.games
(
    id integer NOT NULL DEFAULT nextval('games_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    developer character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT games_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.games
    OWNER to postgres;


-- WAREHOUSES TABLE -- 
CREATE TABLE IF NOT EXISTS public.warehouses
(
    id integer NOT NULL DEFAULT nextval('warehouses_id_seq'::regclass),
    location character varying(100) COLLATE pg_catalog."default",
    max_capacity integer,
    CONSTRAINT warehouses_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.warehouses
    OWNER to postgres;