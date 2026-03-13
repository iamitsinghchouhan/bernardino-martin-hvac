--
-- PostgreSQL database dump
--

\restrict CXy0c5GdQwgRcTpSxBUbAhd6zCYcmKlaW9YNXAWTlD6xhS6yxDG6W6DqvDpj8vd

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    service_id text NOT NULL,
    service_title text NOT NULL,
    full_name text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    address text NOT NULL,
    preferred_date text NOT NULL,
    notes text,
    status text DEFAULT 'pending'::text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.bookings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.bookings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: contact_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact_messages (
    id integer NOT NULL,
    name text NOT NULL,
    phone text,
    email text NOT NULL,
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.contact_messages OWNER TO postgres;

--
-- Name: contact_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.contact_messages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.contact_messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: invoices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invoices (
    id integer NOT NULL,
    invoice_number text NOT NULL,
    customer_email text NOT NULL,
    customer_name text NOT NULL,
    service_title text NOT NULL,
    amount integer NOT NULL,
    status text DEFAULT 'unpaid'::text NOT NULL,
    due_date text,
    paid_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.invoices OWNER TO postgres;

--
-- Name: invoices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.invoices ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.invoices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: quotes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quotes (
    id integer NOT NULL,
    service_type text NOT NULL,
    property_type text NOT NULL,
    description text NOT NULL,
    urgency text DEFAULT 'standard'::text NOT NULL,
    full_name text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    address text,
    status text DEFAULT 'new'::text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.quotes OWNER TO postgres;

--
-- Name: quotes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.quotes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.quotes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: reminders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reminders (
    id integer NOT NULL,
    booking_id integer NOT NULL,
    customer_name text NOT NULL,
    customer_email text NOT NULL,
    customer_phone text NOT NULL,
    service_title text NOT NULL,
    appointment_date text NOT NULL,
    reminder_type text NOT NULL,
    channel text DEFAULT 'email'::text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    scheduled_for timestamp without time zone NOT NULL,
    sent_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.reminders OWNER TO postgres;

--
-- Name: reminders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.reminders ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reminders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (id, service_id, service_title, full_name, phone, email, address, preferred_date, notes, status, created_at) FROM stdin;
1	ac-repair	AC Repair & Tune-Up	Test Reminder User	8185551234	testreminder@example.com	123 Test St, Los Angeles, CA	2026-02-25		pending	2026-02-21 10:06:30.217958
2	ac-repair	AC Repair & Tune-Up	Test Reminder User	8185551234	testreminder@example.com	123 Test St, Los Angeles, CA	2026-02-25		pending	2026-02-21 10:06:34.46805
\.


--
-- Data for Name: contact_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact_messages (id, name, phone, email, message, created_at) FROM stdin;
\.


--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invoices (id, invoice_number, customer_email, customer_name, service_title, amount, status, due_date, paid_at, created_at) FROM stdin;
1	INV-1336	john@example.com	John Smith	HVAC Maintenance	14900	unpaid	2026-03-01	\N	2026-02-21 09:28:09.358835
2	INV-1337	john@example.com	John Smith	AC Repair	28900	paid	2026-02-15	\N	2026-02-21 09:28:09.358835
3	INV-1338	john@example.com	John Smith	Heating Tune-Up	8900	paid	2025-11-20	\N	2026-02-21 09:28:09.358835
4	INV-1339	maria@example.com	Maria Garcia	Solar Installation	850000	unpaid	2026-03-15	\N	2026-02-21 09:28:09.358835
5	INV-1340	maria@example.com	Maria Garcia	AC Maintenance	6900	paid	2025-12-10	\N	2026-02-21 09:28:09.358835
\.


--
-- Data for Name: quotes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quotes (id, service_type, property_type, description, urgency, full_name, phone, email, address, status, created_at) FROM stdin;
1	ac-maintenance	residential	My AC is making noise	standard	Test User	555-123-4567	test@example.com	\N	new	2026-02-21 15:21:49.105222
2	ac-maintenance	residential	My AC unit is making strange noises and not cooling properly	standard	Quote Test User	555-999-8888	quotetest@example.com	123 Test St, Los Angeles, CA	new	2026-02-21 15:25:59.535003
\.


--
-- Data for Name: reminders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reminders (id, booking_id, customer_name, customer_email, customer_phone, service_title, appointment_date, reminder_type, channel, status, scheduled_for, sent_at, created_at) FROM stdin;
1	1	Test Reminder User	testreminder@example.com	8185551234	AC Repair & Tune-Up	2026-02-25	24h_before	email	sent	2026-02-24 00:00:00	2026-02-24 12:54:06.515	2026-02-21 10:06:30.260861
3	2	Test Reminder User	testreminder@example.com	8185551234	AC Repair & Tune-Up	2026-02-25	24h_before	email	sent	2026-02-24 00:00:00	2026-02-24 12:54:06.556	2026-02-21 10:06:34.472059
2	1	Test Reminder User	testreminder@example.com	8185551234	AC Repair & Tune-Up	2026-02-25	1h_before	sms	sent	2026-02-24 23:00:00	2026-03-01 02:14:57.224	2026-02-21 10:06:30.265089
4	2	Test Reminder User	testreminder@example.com	8185551234	AC Repair & Tune-Up	2026-02-25	1h_before	sms	sent	2026-02-24 23:00:00	2026-03-01 02:14:57.263	2026-02-21 10:06:34.474896
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session (sid, sess, expire) FROM stdin;
8d8zijmHzJFqC6YLOAz24yFqrlHcm_ju	{"cookie":{"originalMaxAge":86400000,"expires":"2026-03-04T04:43:08.053Z","secure":false,"httpOnly":true,"path":"/"},"isAdmin":true}	2026-03-04 04:43:12
3vtkjYI4HQx-GBNlxvDB4GKD9xlHLUcT	{"cookie":{"originalMaxAge":86400000,"expires":"2026-03-04T04:44:06.711Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"isAdmin":true}	2026-03-04 04:44:07
\.


--
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_id_seq', 2, true);


--
-- Name: contact_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_messages_id_seq', 1, false);


--
-- Name: invoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.invoices_id_seq', 5, true);


--
-- Name: quotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quotes_id_seq', 2, true);


--
-- Name: reminders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reminders_id_seq', 4, true);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- Name: contact_messages contact_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_messages
    ADD CONSTRAINT contact_messages_pkey PRIMARY KEY (id);


--
-- Name: invoices invoices_invoice_number_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_invoice_number_unique UNIQUE (invoice_number);


--
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- Name: quotes quotes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotes
    ADD CONSTRAINT quotes_pkey PRIMARY KEY (id);


--
-- Name: reminders reminders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reminders
    ADD CONSTRAINT reminders_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- PostgreSQL database dump complete
--

\unrestrict CXy0c5GdQwgRcTpSxBUbAhd6zCYcmKlaW9YNXAWTlD6xhS6yxDG6W6DqvDpj8vd

