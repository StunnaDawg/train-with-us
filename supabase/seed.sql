SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.6 (Ubuntu 15.6-1.pgdg20.04+1)

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

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '9b8615a3-9e1f-418c-ad3d-95dc63c05974', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jonsonallen9@gmail.com","user_id":"9adff67a-f0e3-4109-94ad-1b07d0e67689","user_phone":""}}', '2024-05-16 23:03:21.312203+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eb49792f-baaf-44e5-ae7c-7f81b5078e32', '{"action":"user_signedup","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-05-17 00:08:34.07463+00', ''),
	('00000000-0000-0000-0000-000000000000', '56f818be-1408-4045-9877-e5fde0d1e253', '{"action":"login","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-05-17 00:08:34.096643+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd18ab62e-6abe-4f1a-b593-5f6cb56645d0', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 01:07:02.182349+00', ''),
	('00000000-0000-0000-0000-000000000000', '6fe0ce25-8715-4e41-86c9-f616b72641b6', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 01:07:02.189231+00', ''),
	('00000000-0000-0000-0000-000000000000', 'de17f3a7-5599-4910-89b5-4fd52c529332', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 02:05:03.082289+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aee80bf4-a9fd-4675-b6e6-f0472cbe27c3', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 02:05:03.094102+00', ''),
	('00000000-0000-0000-0000-000000000000', '2fcf9f42-1358-4780-ba1b-e88fcc191a1d', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 03:15:47.417333+00', ''),
	('00000000-0000-0000-0000-000000000000', '13eb28db-0ac9-4654-8086-02a2c0feb1e3', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 03:15:47.425448+00', ''),
	('00000000-0000-0000-0000-000000000000', '0771923c-ab17-49e6-b166-b972b66a16f5', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 04:28:19.181535+00', ''),
	('00000000-0000-0000-0000-000000000000', '95df055b-de18-471b-9a06-f9f32ca632c2', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 06:46:19.990169+00', ''),
	('00000000-0000-0000-0000-000000000000', '53a59ba5-0171-4ef7-beb0-2b8488f35ef1', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 06:46:20.002624+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bbd2489f-5570-42f7-b269-1b687b59e9e2', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 08:32:20.581372+00', ''),
	('00000000-0000-0000-0000-000000000000', '530226da-3fe3-45ad-a4cd-9b049129732d', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 08:32:20.594177+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fc7b0873-bafe-4770-a661-e3a172d5e58f', '{"action":"user_signedup","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"apple"}}', '2024-05-17 08:52:49.605247+00', ''),
	('00000000-0000-0000-0000-000000000000', '24e04661-0f4d-4324-9eb9-d8bffff88fe6', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 10:34:24.282715+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e7fc6771-2200-4dd9-92e2-159a844626b7', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 10:34:24.304978+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee269dfb-7972-442d-93d2-8a90016d7d34', '{"action":"token_refreshed","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 11:05:00.950667+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd8150946-48c1-4c4e-837b-70450b28a25b', '{"action":"token_revoked","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 11:05:00.955948+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eca03b3f-ffb2-44bc-bec4-b6f9b1ffd770', '{"action":"user_signedup","actor_id":"db30c333-c34c-4aff-8b8b-069aa557ba47","actor_username":"kimberley@blendedathletics.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-05-17 12:03:48.016201+00', ''),
	('00000000-0000-0000-0000-000000000000', '8a49bc97-2ecb-470e-99d5-20558ddfc64c', '{"action":"login","actor_id":"db30c333-c34c-4aff-8b8b-069aa557ba47","actor_username":"kimberley@blendedathletics.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-05-17 12:03:48.032857+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd9084423-0826-42de-bba5-269d038518b7', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 12:14:55.414985+00', ''),
	('00000000-0000-0000-0000-000000000000', 'feaaa80b-0eec-4fef-a1c0-c35ac0254464', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 12:14:55.426813+00', ''),
	('00000000-0000-0000-0000-000000000000', '8bdc6fce-9d41-46af-8a0b-7ef6b601a829', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 13:15:49.650218+00', ''),
	('00000000-0000-0000-0000-000000000000', '6d8758d4-66ac-44e1-8e90-e9d3dfabb652', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 13:15:49.661297+00', ''),
	('00000000-0000-0000-0000-000000000000', '678201c7-23c6-485f-b7b3-de65d5aa26d2', '{"action":"token_refreshed","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 13:59:22.71099+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a31d4aca-8016-42f4-a049-51b61fd65bef', '{"action":"token_revoked","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 13:59:22.725754+00', ''),
	('00000000-0000-0000-0000-000000000000', '7132deaa-c683-4454-bfb2-77ebf01a53cf', '{"action":"token_refreshed","actor_id":"db30c333-c34c-4aff-8b8b-069aa557ba47","actor_username":"kimberley@blendedathletics.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 14:01:12.592229+00', ''),
	('00000000-0000-0000-0000-000000000000', '6edaef19-e225-4263-a154-98d3f42db5ae', '{"action":"token_revoked","actor_id":"db30c333-c34c-4aff-8b8b-069aa557ba47","actor_username":"kimberley@blendedathletics.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 14:01:12.600342+00', ''),
	('00000000-0000-0000-0000-000000000000', '734ba8e9-6c43-42d6-a7e6-a88cd743ca83', '{"action":"user_signedup","actor_id":"425588a8-51ad-42a4-acad-809be609cf09","actor_username":"rzg2hbhmg4@privaterelay.appleid.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"apple"}}', '2024-05-17 14:04:26.395283+00', ''),
	('00000000-0000-0000-0000-000000000000', '13f62dca-310b-4760-9614-5a4fa0ca87c8', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 14:13:50.463736+00', ''),
	('00000000-0000-0000-0000-000000000000', '7958aa14-df76-40f1-8b07-d2c9ffa7b30e', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 14:13:50.474156+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f0e76b99-166b-4db5-a3f6-10acb17ec11b', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 15:11:50.801222+00', ''),
	('00000000-0000-0000-0000-000000000000', '4a1cacc8-df81-41a2-b502-d39f3276f5fe', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 15:11:50.813597+00', ''),
	('00000000-0000-0000-0000-000000000000', '81cc0a45-e27c-4598-bb78-9b07b940721c', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 16:09:51.388678+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ae9bbdf1-2f9a-46b8-9253-c104a4cfdaeb', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 16:09:51.403151+00', ''),
	('00000000-0000-0000-0000-000000000000', '0e776427-b817-4e33-8356-f189fda43c53', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 17:07:52.586499+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e41cb948-795e-4a15-b591-dde42d8e2bdd', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 17:07:52.595953+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd5a4c765-9d34-4e3c-aca5-509eb1ad31d2', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 18:05:53.107232+00', ''),
	('00000000-0000-0000-0000-000000000000', '6f6557b0-f355-48d6-a378-a768a938833f', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 18:05:53.121073+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bb030267-e3a4-4677-9cdc-fe26cd626857', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 19:04:23.44797+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8534ef6-1347-4f78-a05c-ea51276c35b8', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 19:04:23.459923+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a04d121c-8edd-484a-ab99-1a6456fb0460', '{"action":"token_refreshed","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 19:06:15.068679+00', ''),
	('00000000-0000-0000-0000-000000000000', '7178efac-6feb-4341-92f5-5e3a4787861e', '{"action":"token_revoked","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 19:06:15.075555+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd9d7e930-3ce8-4111-842e-070a813d8484', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 20:02:24.037656+00', ''),
	('00000000-0000-0000-0000-000000000000', '75e9ec0b-048d-494e-a459-d4df4847c8b6', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 20:02:24.056089+00', ''),
	('00000000-0000-0000-0000-000000000000', '2a11eaeb-ddeb-4ddf-badc-7ffa67c17119', '{"action":"token_refreshed","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 20:05:10.516263+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd9157f89-7ea2-43b5-8673-69264c1ddeb3', '{"action":"token_revoked","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 20:05:10.522618+00', ''),
	('00000000-0000-0000-0000-000000000000', '4bba82ae-e149-466c-a612-89dd661e9690', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 21:00:54.327179+00', ''),
	('00000000-0000-0000-0000-000000000000', '0680eb5d-93d3-4bf7-bfc9-39f7157452c2', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 21:00:54.340026+00', ''),
	('00000000-0000-0000-0000-000000000000', '60045205-4b05-4767-958e-666b4486b6f6', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 21:58:54.941791+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee3cec70-6162-4108-aa0f-778e71509817', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 21:58:54.951195+00', ''),
	('00000000-0000-0000-0000-000000000000', '01cf3d32-3e2e-4036-9a29-c332eea4974c', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 22:56:55.295906+00', ''),
	('00000000-0000-0000-0000-000000000000', '80d4e00e-651e-4761-baed-c49843dcd0af', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 22:56:55.306299+00', ''),
	('00000000-0000-0000-0000-000000000000', '5b867bdd-22c8-4fba-87c5-4a0a41a52b1d', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 23:54:55.739444+00', ''),
	('00000000-0000-0000-0000-000000000000', '574a878f-926c-4823-93d3-fb10be71f2f0', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-17 23:54:55.752642+00', ''),
	('00000000-0000-0000-0000-000000000000', '6885ca17-4815-4e18-8733-1c242f1c1860', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 00:52:56.04082+00', ''),
	('00000000-0000-0000-0000-000000000000', '4f60912e-af54-4e76-86dd-06d9283cd91b', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 00:52:56.056508+00', ''),
	('00000000-0000-0000-0000-000000000000', '2b33add8-4df6-4c66-b224-183403595fc6', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 01:51:26.493822+00', ''),
	('00000000-0000-0000-0000-000000000000', '5736649b-c710-4f6c-a1f5-0fec3f52bb3e', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 01:51:26.507047+00', ''),
	('00000000-0000-0000-0000-000000000000', '239ef5f8-98c2-4431-9c5c-73563fd90baa', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 02:49:26.799062+00', ''),
	('00000000-0000-0000-0000-000000000000', '6ba52211-afb7-4e9b-8036-a28929bb2ca5', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 02:49:26.820059+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a7c1d8e5-22a5-406b-94a1-e3702c1d318a', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 05:11:23.134737+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1d60e7e-6ba5-4f9b-94eb-7fcd932f291c', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 05:11:23.15988+00', ''),
	('00000000-0000-0000-0000-000000000000', '62ede1c9-5b64-43ee-8e8b-1a6f15a67731', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 06:52:28.142194+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ae0278c0-e0c0-46dc-9fb5-f9e31894a7d7', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 06:52:28.156864+00', ''),
	('00000000-0000-0000-0000-000000000000', '8ef92b3e-cfb1-4d5f-96e4-f1b0b4a62d8d', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 09:25:06.598442+00', ''),
	('00000000-0000-0000-0000-000000000000', '58550a30-dd19-43f5-b449-026e17beb4fd', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 09:25:06.618049+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f210d6a5-c47d-48bb-ad51-8fc197e1399a', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 10:26:07.156317+00', ''),
	('00000000-0000-0000-0000-000000000000', 'effe702e-1bee-4d2f-a4e3-12ae6aa95a7c', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 10:26:07.167343+00', ''),
	('00000000-0000-0000-0000-000000000000', '91c627da-cd5d-492e-97fc-d0bf0b84d592', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 11:27:08.58252+00', ''),
	('00000000-0000-0000-0000-000000000000', '3b63f706-337c-4f86-990c-cbe390a8e0c5', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 11:27:08.602379+00', ''),
	('00000000-0000-0000-0000-000000000000', '2cb74b33-fd05-4b4c-a608-a75c867221ff', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 12:28:08.827468+00', ''),
	('00000000-0000-0000-0000-000000000000', '362d86c4-9bb8-413e-b2aa-a844a6fc259e', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 12:28:08.841304+00', ''),
	('00000000-0000-0000-0000-000000000000', '697f7c81-bcbe-4d06-98c7-5826de2c4533', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 13:38:43.946628+00', ''),
	('00000000-0000-0000-0000-000000000000', '16d16c9b-128d-4ad8-b150-de52ce4e8e3d', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 13:38:43.958749+00', ''),
	('00000000-0000-0000-0000-000000000000', '48ac2b62-3e43-4634-9456-d202771f7745', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 15:14:02.992779+00', ''),
	('00000000-0000-0000-0000-000000000000', '03736666-c8be-4fc3-a9b9-4dad5df6c796', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 15:14:03.006743+00', ''),
	('00000000-0000-0000-0000-000000000000', '3bc4362b-b2d9-40a8-a62f-6ae2b5afa4d6', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 16:12:33.253635+00', ''),
	('00000000-0000-0000-0000-000000000000', '97812d70-b22b-4be8-8c13-030f985e6250', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 16:12:33.269859+00', ''),
	('00000000-0000-0000-0000-000000000000', '65b4deaf-ab2e-419d-94bb-8653feb99b7c', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 17:10:33.926759+00', ''),
	('00000000-0000-0000-0000-000000000000', '6bd8735f-db00-463f-9248-6c8386bcd934', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 17:10:33.935538+00', ''),
	('00000000-0000-0000-0000-000000000000', '399a5a36-809a-40c6-8588-3b6feaa3fa13', '{"action":"token_refreshed","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 17:59:38.8482+00', ''),
	('00000000-0000-0000-0000-000000000000', '62e5b48e-8ced-4c51-9dcb-fe4275c0571c', '{"action":"token_revoked","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 17:59:38.863972+00', ''),
	('00000000-0000-0000-0000-000000000000', '4c9e9924-365d-4c94-91a7-7809ef0efca4', '{"action":"token_refreshed","actor_id":"db30c333-c34c-4aff-8b8b-069aa557ba47","actor_username":"kimberley@blendedathletics.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 17:59:50.496588+00', ''),
	('00000000-0000-0000-0000-000000000000', '9fbea659-1405-4b26-ba37-f3fba1e6dc15', '{"action":"token_revoked","actor_id":"db30c333-c34c-4aff-8b8b-069aa557ba47","actor_username":"kimberley@blendedathletics.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 17:59:50.49849+00', ''),
	('00000000-0000-0000-0000-000000000000', '9775319b-feba-496d-adcd-961b988a26b3', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 18:08:34.330186+00', ''),
	('00000000-0000-0000-0000-000000000000', '00227a5f-590c-4426-91f4-e19f4f935c55', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 18:08:34.342531+00', ''),
	('00000000-0000-0000-0000-000000000000', '82b174f6-b3ed-4897-a71e-a8695e4fec9a', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 19:06:34.823552+00', ''),
	('00000000-0000-0000-0000-000000000000', '37373f0c-41f5-435b-9290-f077988b086b', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 19:06:34.838436+00', ''),
	('00000000-0000-0000-0000-000000000000', '00dadc6c-c527-4973-a7d4-d6c855451894', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 20:04:35.366899+00', ''),
	('00000000-0000-0000-0000-000000000000', '953d1204-36ba-4164-bebf-148220dcdca8', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 20:04:35.379558+00', ''),
	('00000000-0000-0000-0000-000000000000', '4f179cef-26ff-4227-bf75-7e0e3ff2cb65', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 21:02:35.87235+00', ''),
	('00000000-0000-0000-0000-000000000000', '7f130cb7-755a-4517-9025-5a05339573e4', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 21:02:35.889468+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cde882ee-3365-42c6-9b65-35d4bed6a091', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 22:00:36.267162+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c6f4fa2-bb9d-4db2-9b34-ccc1ab199406', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 22:00:36.285079+00', ''),
	('00000000-0000-0000-0000-000000000000', '0a4002b4-3bb5-4c38-a8c7-736bf58c3345', '{"action":"token_refreshed","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 22:01:57.946726+00', ''),
	('00000000-0000-0000-0000-000000000000', '3e79696d-827a-4072-8376-6514144d37f8', '{"action":"token_revoked","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 22:01:57.957885+00', ''),
	('00000000-0000-0000-0000-000000000000', '657875bb-3a8c-4724-818d-f681121ec252', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 22:58:36.690911+00', ''),
	('00000000-0000-0000-0000-000000000000', '027c036c-4dc7-4b7c-8a16-d7c3ca42f665', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 22:58:36.70435+00', ''),
	('00000000-0000-0000-0000-000000000000', '4c6890a0-59cc-4d58-9f64-826f6daa1228', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 23:56:37.432944+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f9c02eb4-5107-4295-bccb-d17975db8257', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-18 23:56:37.451834+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cd54781c-0f1e-483d-857f-85f9890130b6', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 00:54:37.637206+00', ''),
	('00000000-0000-0000-0000-000000000000', '04fed343-bfd1-435e-9cde-1b7a1788d184', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 00:54:37.648795+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e84d6d2-f5cb-4e0b-824d-4a96aba3fb7a', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 01:52:38.209768+00', ''),
	('00000000-0000-0000-0000-000000000000', '63d65160-aa68-4509-8983-2f5c4265a548', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 01:52:38.233055+00', ''),
	('00000000-0000-0000-0000-000000000000', '1748b44a-8f51-43b7-8ebc-77001db707f1', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 02:51:08.550944+00', ''),
	('00000000-0000-0000-0000-000000000000', '30ca94ef-4497-4d1f-9d6e-afddcd8d30c4', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 02:51:08.561918+00', ''),
	('00000000-0000-0000-0000-000000000000', '4a44f7c3-d960-4964-a278-05e219bb581f', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 03:49:09.180806+00', ''),
	('00000000-0000-0000-0000-000000000000', '77fec6f1-ff62-4554-aad4-8bba152d7f3d', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 03:49:09.203084+00', ''),
	('00000000-0000-0000-0000-000000000000', '160ca8e4-c115-42fb-877d-29e64a129520', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 04:47:39.539549+00', ''),
	('00000000-0000-0000-0000-000000000000', '4a9f49a9-e045-4e06-b1aa-1f66dc2d9835', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 04:47:39.563018+00', ''),
	('00000000-0000-0000-0000-000000000000', '6c3d636b-8d21-429c-a866-b1b7131dc067', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 05:45:40.040671+00', ''),
	('00000000-0000-0000-0000-000000000000', '594ff41a-6518-4556-bda7-e4cdc0c471d7', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 05:45:40.056613+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ab15c127-bc09-4ddd-9d87-9af8408f0a45', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 06:44:10.483567+00', ''),
	('00000000-0000-0000-0000-000000000000', '60cb258e-c193-44c7-ba1a-91d4c7290219', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 06:44:10.49963+00', ''),
	('00000000-0000-0000-0000-000000000000', '14c0e7ae-aa4b-4ac2-9484-41776755234a', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 07:42:10.802377+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a19b9f56-fb70-422a-9a09-77cfc7226874', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 07:42:10.819362+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c11f7491-9ca8-4a50-82e8-f3eaf94696f7', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 08:40:11.227787+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da80885e-be87-4484-9840-2982b015ca4d', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 08:40:11.249288+00', ''),
	('00000000-0000-0000-0000-000000000000', '2101195a-595a-4075-bc60-dd7b2a1da0c6', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 09:38:41.605173+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f5ede2a4-b058-4340-acd9-f9bab3cdecba', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 09:38:41.617991+00', ''),
	('00000000-0000-0000-0000-000000000000', '1072827d-6fa1-4742-9940-251244772a1b', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 10:36:42.078068+00', ''),
	('00000000-0000-0000-0000-000000000000', '80dd534a-8b2a-4b1e-a3d6-f5de8748230a', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 10:36:42.102251+00', ''),
	('00000000-0000-0000-0000-000000000000', '38415e71-e425-48ef-bc8e-84b50d25d36c', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 11:35:12.295194+00', ''),
	('00000000-0000-0000-0000-000000000000', '69cfb8bb-fc91-4476-a9f3-1345b95763b3', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 11:35:12.312568+00', ''),
	('00000000-0000-0000-0000-000000000000', '96d234fb-3588-4a48-af4b-608aaf005927', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 12:33:13.012059+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4ddfed9-e082-4557-b278-792fb3208ce7', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 12:33:13.032314+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ad2ef600-3bb9-4d85-808d-2ae77e7e05f6', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 13:31:43.232099+00', ''),
	('00000000-0000-0000-0000-000000000000', '0e99fcff-79a5-4f3b-a415-8768a0a7a242', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 13:31:43.247983+00', ''),
	('00000000-0000-0000-0000-000000000000', '76b300fa-2dbe-462b-9f8b-516d7c41f602', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 14:29:43.711021+00', ''),
	('00000000-0000-0000-0000-000000000000', '0e4a243e-8243-4522-8b50-f5c873dc90fe', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 14:29:43.724895+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dd0fb412-320c-4853-88e7-7c3adf581edf', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 15:27:44.307413+00', ''),
	('00000000-0000-0000-0000-000000000000', '161f4f49-875c-44d0-8860-e6a69866afef', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 15:27:44.325844+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bccc516b-dd69-4355-8cc2-2b5d789ada3e', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 16:25:45.397062+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c36af99c-f5ef-4492-b273-e57beffb4750', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 16:25:45.413431+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eea57e3c-e7bf-40fd-b16b-f243dd9cb884', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 17:23:46.137945+00', ''),
	('00000000-0000-0000-0000-000000000000', '7d79b5a2-2b4f-4004-9cdf-6eee31621457', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 17:23:46.158677+00', ''),
	('00000000-0000-0000-0000-000000000000', '15dd50f7-ab1f-4199-a810-27939edf772c', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 18:22:16.71604+00', ''),
	('00000000-0000-0000-0000-000000000000', '7540cf84-563c-4023-8965-0fa15b9999a4', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 18:22:16.734503+00', ''),
	('00000000-0000-0000-0000-000000000000', '7589a7be-a893-46f3-8730-4e4a86a17c1a', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 19:20:17.12944+00', ''),
	('00000000-0000-0000-0000-000000000000', '57bb8b8f-90cb-4300-9313-55dd163d20e0', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 19:20:17.149534+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ea56ed72-4381-40fb-b23a-3ad33573526f', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 20:18:17.927497+00', ''),
	('00000000-0000-0000-0000-000000000000', '4cc021eb-9136-42b4-9010-d47e6b0bf967', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 20:18:17.939882+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ded0fda5-6a2c-4472-a927-06ae106c951e', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 21:16:18.980717+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ba6f2a8-ec3c-403b-9dbf-552fffea85cd', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 21:16:18.993282+00', ''),
	('00000000-0000-0000-0000-000000000000', '164abebf-c55a-4aff-b84e-54cc931cc7e6', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 22:14:20.348485+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e2f239bc-af6a-4638-a926-4efe95dadf43', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 22:14:20.367527+00', ''),
	('00000000-0000-0000-0000-000000000000', '76cfdb32-7fe0-4aa0-82a0-a4614ec74956', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 23:12:20.842416+00', ''),
	('00000000-0000-0000-0000-000000000000', '51e6a4b1-15a3-4f8e-bfe3-881559621b16', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-19 23:12:20.858994+00', ''),
	('00000000-0000-0000-0000-000000000000', '732a020b-cd06-447b-9d2c-f9000d3ec7f6', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 00:10:21.359331+00', ''),
	('00000000-0000-0000-0000-000000000000', '42df388a-ecdd-4886-b1dc-40a3ec1a215f', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 00:10:21.382761+00', ''),
	('00000000-0000-0000-0000-000000000000', '483a391c-4f2e-4bf2-b2d6-8243341732d5', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 01:08:51.684604+00', ''),
	('00000000-0000-0000-0000-000000000000', '9697a768-b462-4d9d-b58b-58835c5e145e', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 01:08:51.704553+00', ''),
	('00000000-0000-0000-0000-000000000000', 'acae8200-14f9-4e0b-b7af-e34f8b7537ad', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 02:06:52.139702+00', ''),
	('00000000-0000-0000-0000-000000000000', '79a43daa-1a31-470a-a74e-14ad0967c8ea', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 02:06:52.162057+00', ''),
	('00000000-0000-0000-0000-000000000000', '60015c48-5c2c-435b-a050-1883f3030e94', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 03:05:22.245715+00', ''),
	('00000000-0000-0000-0000-000000000000', 'feef74f7-e508-42f2-92e2-889815953af6', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 03:05:22.260455+00', ''),
	('00000000-0000-0000-0000-000000000000', '19466b8b-9244-427b-bcd4-adcc3774ab22', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 04:03:28.226158+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e9f52fc7-04a8-4d4d-b660-7b7c75a9c49f', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 04:03:28.254193+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c32f7bca-b9ce-4d3e-a6c5-7cec886e968f', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 05:01:58.695254+00', ''),
	('00000000-0000-0000-0000-000000000000', '639f94b6-f7c9-44e3-a80c-3178d63a9d01', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 05:01:58.718028+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd2078840-691b-403a-ac62-a22357611c62', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 05:59:59.134727+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4d80184-132e-4cdd-825f-2e60df42e844', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 05:59:59.160945+00', ''),
	('00000000-0000-0000-0000-000000000000', 'beca5314-67a8-4394-9b12-919502baf2f4', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 06:58:29.519725+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fb8418b6-7088-4011-95e5-a9fe63fedc24', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 06:58:29.543053+00', ''),
	('00000000-0000-0000-0000-000000000000', '74c660da-b39b-4008-a931-1f0fdc2ca9eb', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 07:56:29.875901+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd64d901d-9701-4420-b3e0-9b083b86a14b', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 07:56:29.897506+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dd2de3c0-930e-46e2-acd6-570f862e4fe5', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 08:54:30.179776+00', ''),
	('00000000-0000-0000-0000-000000000000', '992dc483-d571-4950-9f1d-21c928e8659a', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 08:54:30.193109+00', ''),
	('00000000-0000-0000-0000-000000000000', '968e321f-4f4b-45d9-853a-f3449ffeb276', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 09:53:00.793857+00', ''),
	('00000000-0000-0000-0000-000000000000', '7119360f-6f1d-4e4b-b8a3-873df1a31d75', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 09:53:00.808879+00', ''),
	('00000000-0000-0000-0000-000000000000', '4aeee886-e6f0-4d6e-bf44-4c7f2b520906', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 10:51:01.140791+00', ''),
	('00000000-0000-0000-0000-000000000000', '578b75b2-ea9b-40d1-9227-f435c0cdd642', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 10:51:01.156994+00', ''),
	('00000000-0000-0000-0000-000000000000', '691fc055-7cac-43d2-830e-1deb10f9422c', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 11:49:31.621367+00', ''),
	('00000000-0000-0000-0000-000000000000', '8f953b88-0938-49af-bd00-9002ad346fec', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 11:49:31.640569+00', ''),
	('00000000-0000-0000-0000-000000000000', '6467d521-8414-43b6-b5f7-fb3295401525', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 12:47:31.87725+00', ''),
	('00000000-0000-0000-0000-000000000000', '8d447f81-441f-48b5-98ba-825a317d5e26', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 12:47:31.898137+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4c9623e-9fe3-43fa-a8ef-c95cdc10836f', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 13:45:32.856555+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc1a94ae-1341-46f2-9e8f-91de9528e9c9', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 13:45:32.877166+00', ''),
	('00000000-0000-0000-0000-000000000000', '55eb7692-620f-4c70-a739-8fec74b30769', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 14:43:34.607187+00', ''),
	('00000000-0000-0000-0000-000000000000', '0a506652-a2d8-44a9-a8aa-de2483f24d58', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 14:43:34.623146+00', ''),
	('00000000-0000-0000-0000-000000000000', '14d7e4a0-e975-4ec8-8cec-7ae696d66ac6', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 15:41:35.087403+00', ''),
	('00000000-0000-0000-0000-000000000000', '9fbd7700-3db5-4ab2-8094-4c68cfbab3f7', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 15:41:35.110673+00', ''),
	('00000000-0000-0000-0000-000000000000', '1c247c76-af9d-434b-bdc3-77db86aef223', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 16:40:05.283951+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f0d718a3-ef85-4159-82ef-4781088c2191', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 16:40:05.3083+00', ''),
	('00000000-0000-0000-0000-000000000000', '84ab7d9c-d4fa-42d3-a705-a00a78a8852f', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 17:38:35.491709+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c8d74c68-13f1-411a-b39f-a74bbf3684e5', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 17:38:35.516082+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dcda435f-32dc-4ac1-8772-8aacb13516f4', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 18:36:35.951982+00', ''),
	('00000000-0000-0000-0000-000000000000', '3dcaa4aa-33f2-40b3-b448-7718bc312e0d', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 18:36:35.973042+00', ''),
	('00000000-0000-0000-0000-000000000000', 'df2ecfb9-6916-451d-99a1-70a2b00a163a', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 19:35:06.363774+00', ''),
	('00000000-0000-0000-0000-000000000000', '4fd315d0-202e-485f-9c32-2a9bf464f366', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 19:35:06.388843+00', ''),
	('00000000-0000-0000-0000-000000000000', '158a448e-e5a6-4ac2-91ba-ced37bbe4d13', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 20:33:06.788097+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dc6689b5-413d-4f19-be36-c6c4ca41ad75', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 20:33:06.803538+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd48503f7-2e32-438b-b46c-7a6f8477b337', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 21:31:07.236697+00', ''),
	('00000000-0000-0000-0000-000000000000', '7b649ac9-0ebb-42c4-8958-da74eb8c598a', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 21:31:07.25004+00', ''),
	('00000000-0000-0000-0000-000000000000', '0df8c89c-65b2-48e3-b6f0-1673fa9bcfa6', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 22:29:07.663298+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da5b8206-bde4-46dd-91cd-526927b17031', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 22:29:07.679642+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e262c25-8e35-45ae-9b3d-63c0ddf83d43', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 23:27:08.114386+00', ''),
	('00000000-0000-0000-0000-000000000000', '01448b29-116c-4f42-a9fa-229803a07ab1', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-20 23:27:08.129893+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4cd4092-0d90-4233-9935-0a8c1954319e', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 00:25:38.648767+00', ''),
	('00000000-0000-0000-0000-000000000000', '804ff88e-551e-4901-aa29-d6039e7322ec', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 00:25:38.672391+00', ''),
	('00000000-0000-0000-0000-000000000000', '0cd5e83b-8322-4772-a5e2-c676921501e5', '{"action":"token_refreshed","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 00:42:27.338591+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d46e0b7-cb75-4958-8dda-85eb22eda130', '{"action":"token_revoked","actor_id":"8d2bdb49-30e0-4af7-b791-4f7249d29efd","actor_username":"rm2qn5zvnn@privaterelay.appleid.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 00:42:27.348878+00', ''),
	('00000000-0000-0000-0000-000000000000', '3510b410-662b-4e1c-bf01-72d033db9dd4', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 01:23:38.796715+00', ''),
	('00000000-0000-0000-0000-000000000000', '8118530b-6676-444c-8d3f-9145ddd189f2', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 01:23:38.809229+00', ''),
	('00000000-0000-0000-0000-000000000000', '482b1545-a06e-4bc4-9c83-a8d439dfc14b', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 02:21:39.422284+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c9a88c8-871f-4da2-8a04-f455105516bd', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 02:21:39.443986+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f2283976-e2ec-4868-bf4b-db8a4df14adf', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 03:19:39.942041+00', ''),
	('00000000-0000-0000-0000-000000000000', '3f439efc-4471-4ece-8a92-31f174ffda6f', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 03:19:39.961433+00', ''),
	('00000000-0000-0000-0000-000000000000', '8904550c-a6d0-4855-a9fc-50995046c48a', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 04:17:40.459289+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ef3050df-7f4d-47cc-a271-c481bbfc4b71', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 04:17:40.477927+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4ed2e01-c6b9-407b-9c69-ec8d1c3772ba', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 05:16:10.626883+00', ''),
	('00000000-0000-0000-0000-000000000000', '94cd4996-c142-4f10-b168-50042a6f257e', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 05:16:10.641041+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e5d017d4-e5dd-455d-a4f6-9ad4627255d1', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 06:14:11.027486+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf09c419-9c82-4d61-a5be-dff5ee497dbb', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 06:14:11.048205+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd1e0c532-f707-4901-abbb-2edacda28d07', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 07:12:41.509274+00', ''),
	('00000000-0000-0000-0000-000000000000', '00aa505c-d5f1-4db0-bfa4-216b594de9ab', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 07:12:41.533907+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c0de32c-d8e7-417d-a4b3-5576b78077ab', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 08:10:41.96974+00', ''),
	('00000000-0000-0000-0000-000000000000', '968a71cb-5707-4145-bea1-ddfb16cb1acb', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 08:10:41.991273+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fec440ec-a0a8-4588-aef6-8385f9c7db50', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 09:09:12.214195+00', ''),
	('00000000-0000-0000-0000-000000000000', '4ec025ba-5411-4107-adf8-2ba5473a67d1', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 09:09:12.235297+00', ''),
	('00000000-0000-0000-0000-000000000000', '022bdcb9-4c1c-4ce8-a5a7-bbab06432635', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 10:07:42.647327+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fd3700f9-f308-49a2-90f7-ecfe7ea3fa1a', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 10:07:42.671286+00', ''),
	('00000000-0000-0000-0000-000000000000', '515d2066-6e22-47b9-b2b5-58cb2dffc9b1', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 11:05:42.960203+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cd51eeaf-33c7-4839-b046-7195410fb37e', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 11:05:42.984509+00', ''),
	('00000000-0000-0000-0000-000000000000', '8852716f-99f2-49ad-8889-0c5cc52dfec4', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 12:04:13.417449+00', ''),
	('00000000-0000-0000-0000-000000000000', '6a677143-b3aa-409d-9d53-e3d11538a7c9', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 12:04:13.442256+00', ''),
	('00000000-0000-0000-0000-000000000000', '2177a249-ce6d-496d-9549-32266db8cb7f', '{"action":"token_refreshed","actor_id":"db30c333-c34c-4aff-8b8b-069aa557ba47","actor_username":"kimberley@blendedathletics.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 12:55:14.074994+00', ''),
	('00000000-0000-0000-0000-000000000000', '7454c156-79b2-4e78-afdd-75d64c558513', '{"action":"token_revoked","actor_id":"db30c333-c34c-4aff-8b8b-069aa557ba47","actor_username":"kimberley@blendedathletics.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 12:55:14.100816+00', ''),
	('00000000-0000-0000-0000-000000000000', '80a87d94-1f45-40dc-845a-c98991f5f0d8', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 13:02:43.496361+00', ''),
	('00000000-0000-0000-0000-000000000000', '331c827b-d76d-4f7d-aab3-8e1ab9cd66c8', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 13:02:43.512678+00', ''),
	('00000000-0000-0000-0000-000000000000', '7e4b658a-4070-49f4-a832-bf9127724d4b', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 14:00:44.202663+00', ''),
	('00000000-0000-0000-0000-000000000000', '727177fc-b79c-4d7e-9cdb-2210c0825a1b', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 14:00:44.222866+00', ''),
	('00000000-0000-0000-0000-000000000000', '140c8e88-dd17-45f9-abe5-cbe9bcd81fd1', '{"action":"token_refreshed","actor_id":"db30c333-c34c-4aff-8b8b-069aa557ba47","actor_username":"kimberley@blendedathletics.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 14:06:07.254775+00', ''),
	('00000000-0000-0000-0000-000000000000', '50aee61e-2d0f-4600-a57f-fb7d53305b31', '{"action":"token_revoked","actor_id":"db30c333-c34c-4aff-8b8b-069aa557ba47","actor_username":"kimberley@blendedathletics.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 14:06:07.265298+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a717a427-109d-4b80-8ad7-30cb2bc4269d', '{"action":"token_refreshed","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 14:58:45.165735+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a6078972-24ec-4cf2-8675-98fd9cd4583a', '{"action":"token_revoked","actor_id":"943b7c7b-9275-4557-b288-7f990b4ae105","actor_username":"jonsonal@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2024-05-21 14:58:45.184761+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '9adff67a-f0e3-4109-94ad-1b07d0e67689', 'authenticated', 'authenticated', 'jonsonallen9@gmail.com', '$2a$10$g2UXp19tbJHOu8mdk0eXGemINNJiKmLYwpnn6WMIl/lkazldRG9j6', '2024-05-16 23:03:21.323231+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-05-16 23:03:21.28313+00', '2024-05-16 23:03:21.325958+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', 'authenticated', 'authenticated', 'rm2qn5zvnn@privaterelay.appleid.com', '', '2024-05-17 08:52:49.609531+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-05-17 08:52:49.615813+00', '{"provider": "apple", "providers": ["apple"]}', '{"iss": "https://appleid.apple.com", "sub": "000736.793ead1b52cd420b819391bd7191cfd1.0852", "email": "rm2qn5zvnn@privaterelay.appleid.com", "provider_id": "000736.793ead1b52cd420b819391bd7191cfd1.0852", "custom_claims": {"auth_time": 1715935967, "is_private_email": true}, "email_verified": true, "phone_verified": false}', NULL, '2024-05-17 08:52:49.517638+00', '2024-05-21 00:42:27.369348+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '425588a8-51ad-42a4-acad-809be609cf09', 'authenticated', 'authenticated', 'rzg2hbhmg4@privaterelay.appleid.com', '', '2024-05-17 14:04:26.399129+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-05-17 14:04:26.407248+00', '{"provider": "apple", "providers": ["apple"]}', '{"iss": "https://appleid.apple.com", "sub": "000709.c456f8381f7a40a58014cd5f90c89060.1404", "email": "rzg2hbhmg4@privaterelay.appleid.com", "provider_id": "000709.c456f8381f7a40a58014cd5f90c89060.1404", "custom_claims": {"auth_time": 1715954664, "is_private_email": true}, "email_verified": true, "phone_verified": false}', NULL, '2024-05-17 14:04:26.34375+00', '2024-05-17 14:04:26.427425+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'db30c333-c34c-4aff-8b8b-069aa557ba47', 'authenticated', 'authenticated', 'kimberley@blendedathletics.com', '$2a$10$DkfORp58m/3EmrzdUC2F/OKySvsEiclp10rZGgfxhZcoiUajD5otm', '2024-05-17 12:03:48.024452+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-05-17 12:03:48.033411+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "db30c333-c34c-4aff-8b8b-069aa557ba47", "email": "kimberley@blendedathletics.com", "email_verified": false, "phone_verified": false}', NULL, '2024-05-17 12:03:47.93527+00', '2024-05-21 14:06:07.289388+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '943b7c7b-9275-4557-b288-7f990b4ae105', 'authenticated', 'authenticated', 'jonsonal@hotmail.com', '$2a$10$GBJKWUmuqPmz5hiYC5IN5eXgtDy3E91dom5LFe7ibr.PCxQ670GaW', '2024-05-17 00:08:34.081977+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-05-17 00:08:34.097694+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "943b7c7b-9275-4557-b288-7f990b4ae105", "email": "jonsonal@hotmail.com", "email_verified": false, "phone_verified": false}', NULL, '2024-05-17 00:08:33.978295+00', '2024-05-21 14:58:45.213634+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('9adff67a-f0e3-4109-94ad-1b07d0e67689', '9adff67a-f0e3-4109-94ad-1b07d0e67689', '{"sub": "9adff67a-f0e3-4109-94ad-1b07d0e67689", "email": "jonsonallen9@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-05-16 23:03:21.306325+00', '2024-05-16 23:03:21.306383+00', '2024-05-16 23:03:21.306383+00', '4841486d-be4e-4b6e-996d-2034528561ab'),
	('943b7c7b-9275-4557-b288-7f990b4ae105', '943b7c7b-9275-4557-b288-7f990b4ae105', '{"sub": "943b7c7b-9275-4557-b288-7f990b4ae105", "email": "jonsonal@hotmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-05-17 00:08:34.067623+00', '2024-05-17 00:08:34.067676+00', '2024-05-17 00:08:34.067676+00', '3d17e778-5e6c-4dba-9cae-745cbbda8bc7'),
	('000736.793ead1b52cd420b819391bd7191cfd1.0852', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', '{"iss": "https://appleid.apple.com", "sub": "000736.793ead1b52cd420b819391bd7191cfd1.0852", "email": "rm2qn5zvnn@privaterelay.appleid.com", "provider_id": "000736.793ead1b52cd420b819391bd7191cfd1.0852", "custom_claims": {"auth_time": 1715935967, "is_private_email": true}, "email_verified": true, "phone_verified": false}', 'apple', '2024-05-17 08:52:49.595649+00', '2024-05-17 08:52:49.595708+00', '2024-05-17 08:52:49.595708+00', '08b2622e-b4ea-48cf-af2d-a2f4c0d2c443'),
	('db30c333-c34c-4aff-8b8b-069aa557ba47', 'db30c333-c34c-4aff-8b8b-069aa557ba47', '{"sub": "db30c333-c34c-4aff-8b8b-069aa557ba47", "email": "kimberley@blendedathletics.com", "email_verified": false, "phone_verified": false}', 'email', '2024-05-17 12:03:48.006694+00', '2024-05-17 12:03:48.007142+00', '2024-05-17 12:03:48.007142+00', '79b4b2c3-74e3-4713-ac98-a7cb252b6d2a'),
	('000709.c456f8381f7a40a58014cd5f90c89060.1404', '425588a8-51ad-42a4-acad-809be609cf09', '{"iss": "https://appleid.apple.com", "sub": "000709.c456f8381f7a40a58014cd5f90c89060.1404", "email": "rzg2hbhmg4@privaterelay.appleid.com", "provider_id": "000709.c456f8381f7a40a58014cd5f90c89060.1404", "custom_claims": {"auth_time": 1715954664, "is_private_email": true}, "email_verified": true, "phone_verified": false}', 'apple', '2024-05-17 14:04:26.375341+00', '2024-05-17 14:04:26.375406+00', '2024-05-17 14:04:26.375406+00', 'e2701948-923a-469e-a798-b57907400f64');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('f1321acf-83b7-44bf-8492-33dce8512afe', '425588a8-51ad-42a4-acad-809be609cf09', '2024-05-17 14:04:26.4083+00', '2024-05-17 14:04:26.4083+00', NULL, 'aal1', NULL, NULL, 'trainwithus/1 CFNetwork/1494.0.7 Darwin/23.4.0', '24.89.228.93', NULL),
	('317cf8cf-a24d-4c30-a135-3223f84e48b5', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', '2024-05-17 08:52:49.616606+00', '2024-05-21 00:42:27.379001+00', NULL, 'aal1', NULL, '2024-05-21 00:42:27.378927', 'trainwithus/1 CFNetwork/1494.0.7 Darwin/23.4.0', '99.192.41.225', NULL),
	('daaa620c-3464-4c0c-bf5a-36c369fb1168', 'db30c333-c34c-4aff-8b8b-069aa557ba47', '2024-05-17 12:03:48.034948+00', '2024-05-21 14:06:07.297975+00', NULL, 'aal1', NULL, '2024-05-21 14:06:07.297879', 'trainwithus/1 CFNetwork/1494.0.7 Darwin/23.4.0', '24.89.228.93', NULL),
	('c6b1cf31-a1fc-470d-a6df-b5267b46b04b', '943b7c7b-9275-4557-b288-7f990b4ae105', '2024-05-17 00:08:34.098357+00', '2024-05-21 14:58:45.229353+00', NULL, 'aal1', NULL, '2024-05-21 14:58:45.228172', 'trainwithus/1 CFNetwork/1490.0.4 Darwin/23.1.0', '134.41.93.106', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('c6b1cf31-a1fc-470d-a6df-b5267b46b04b', '2024-05-17 00:08:34.119259+00', '2024-05-17 00:08:34.119259+00', 'password', 'd5429153-ff09-42bf-b69d-367fdbc49c9d'),
	('317cf8cf-a24d-4c30-a135-3223f84e48b5', '2024-05-17 08:52:49.633173+00', '2024-05-17 08:52:49.633173+00', 'oauth', '47dde9d3-46f6-4d1e-b661-840aa4b26c9b'),
	('daaa620c-3464-4c0c-bf5a-36c369fb1168', '2024-05-17 12:03:48.05073+00', '2024-05-17 12:03:48.05073+00', 'password', 'abb5d4f4-1a9b-43b2-aacf-52e5a39409f8'),
	('f1321acf-83b7-44bf-8492-33dce8512afe', '2024-05-17 14:04:26.429529+00', '2024-05-17 14:04:26.429529+00', 'oauth', '27d5c680-fe45-4b95-9575-a06ec0b98799');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 43, 'IDNY7p6fcXNHY65pKjSyNA', 'db30c333-c34c-4aff-8b8b-069aa557ba47', true, '2024-05-18 17:59:50.501525+00', '2024-05-21 12:55:14.10304+00', 'HD74mL1a1uEQX3Uml52-lQ', 'daaa620c-3464-4c0c-bf5a-36c369fb1168'),
	('00000000-0000-0000-0000-000000000000', 1, 'LEyAgjZsLxKo4P4Kumkdyw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 00:08:34.110626+00', '2024-05-17 01:07:02.190918+00', NULL, 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 2, 'Yoz_kylLxpN0oJJkWpbcLw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 01:07:02.200242+00', '2024-05-17 02:05:03.094676+00', 'LEyAgjZsLxKo4P4Kumkdyw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 3, 'cOsEbrqJkRcRB8nzDFw8Tg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 02:05:03.107503+00', '2024-05-17 03:15:47.426305+00', 'Yoz_kylLxpN0oJJkWpbcLw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 4, 'Q-Iars1qPYFklrgLWV5vNw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 03:15:47.435639+00', '2024-05-17 06:46:20.003171+00', 'cOsEbrqJkRcRB8nzDFw8Tg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 5, 'VnBcdPchq19TYgSzUy6yeg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 06:46:20.018396+00', '2024-05-17 08:32:20.595278+00', 'Q-Iars1qPYFklrgLWV5vNw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 6, '0Hrd4EHVKpK_0N3DzcBpkQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 08:32:20.604344+00', '2024-05-17 10:34:24.305512+00', 'VnBcdPchq19TYgSzUy6yeg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 7, 'hyDY4U54i0Ute7TO3u7yLQ', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', true, '2024-05-17 08:52:49.625671+00', '2024-05-17 11:05:00.956477+00', NULL, '317cf8cf-a24d-4c30-a135-3223f84e48b5'),
	('00000000-0000-0000-0000-000000000000', 8, 'Uhxrh34Fy2JFOgZkq1EZ6Q', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 10:34:24.321396+00', '2024-05-17 12:14:55.427958+00', '0Hrd4EHVKpK_0N3DzcBpkQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 11, '2FGZCkuKWu1Ga_H3_1dhEQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 12:14:55.440081+00', '2024-05-17 13:15:49.662574+00', 'Uhxrh34Fy2JFOgZkq1EZ6Q', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 9, 'K_49CHf_DWiGqGIlsoDQmA', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', true, '2024-05-17 11:05:00.965512+00', '2024-05-17 13:59:22.726297+00', 'hyDY4U54i0Ute7TO3u7yLQ', '317cf8cf-a24d-4c30-a135-3223f84e48b5'),
	('00000000-0000-0000-0000-000000000000', 10, 'TV5Kfg2LwDj0coeH8c-R8A', 'db30c333-c34c-4aff-8b8b-069aa557ba47', true, '2024-05-17 12:03:48.042722+00', '2024-05-17 14:01:12.601578+00', NULL, 'daaa620c-3464-4c0c-bf5a-36c369fb1168'),
	('00000000-0000-0000-0000-000000000000', 15, 'v4s0GKAYPNZHJNwy54nntw', '425588a8-51ad-42a4-acad-809be609cf09', false, '2024-05-17 14:04:26.411928+00', '2024-05-17 14:04:26.411928+00', NULL, 'f1321acf-83b7-44bf-8492-33dce8512afe'),
	('00000000-0000-0000-0000-000000000000', 12, 'LwoGyCf6z0lqExuP3kGdeA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 13:15:49.673717+00', '2024-05-17 14:13:50.475245+00', '2FGZCkuKWu1Ga_H3_1dhEQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 16, 'VrhJMUV9iyYGYkccVnEG7w', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 14:13:50.483126+00', '2024-05-17 15:11:50.814586+00', 'LwoGyCf6z0lqExuP3kGdeA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 17, '9PdJnYK0RA-Ogmel9laUYg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 15:11:50.824692+00', '2024-05-17 16:09:51.404253+00', 'VrhJMUV9iyYGYkccVnEG7w', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 18, 'nXFyxbjQ_nZ32t2eB_rwuw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 16:09:51.415537+00', '2024-05-17 17:07:52.596502+00', '9PdJnYK0RA-Ogmel9laUYg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 19, 'gZ3R2kARItmAYyOJaahOlw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 17:07:52.604748+00', '2024-05-17 18:05:53.12162+00', 'nXFyxbjQ_nZ32t2eB_rwuw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 20, 'hcxvegud286ITLUEfdMPbA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 18:05:53.137629+00', '2024-05-17 19:04:23.4622+00', 'gZ3R2kARItmAYyOJaahOlw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 13, 'WiPtuNoD9AwC7_FFNQGuAA', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', true, '2024-05-17 13:59:22.738521+00', '2024-05-17 19:06:15.076995+00', 'K_49CHf_DWiGqGIlsoDQmA', '317cf8cf-a24d-4c30-a135-3223f84e48b5'),
	('00000000-0000-0000-0000-000000000000', 21, '7ZASl9b3d0WTTMdNJ1fkZQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 19:04:23.474237+00', '2024-05-17 20:02:24.056721+00', 'hcxvegud286ITLUEfdMPbA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 22, '71D4WhqU2JgK7GKKbNwV3w', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', true, '2024-05-17 19:06:15.092684+00', '2024-05-17 20:05:10.523109+00', 'WiPtuNoD9AwC7_FFNQGuAA', '317cf8cf-a24d-4c30-a135-3223f84e48b5'),
	('00000000-0000-0000-0000-000000000000', 23, 'qKb7iMJHDtCz9rLmbUIDow', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 20:02:24.069469+00', '2024-05-17 21:00:54.341241+00', '7ZASl9b3d0WTTMdNJ1fkZQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 25, 'zfdIHIYRZuunkwVXBLhyLQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 21:00:54.351054+00', '2024-05-17 21:58:54.953349+00', 'qKb7iMJHDtCz9rLmbUIDow', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 26, 'FtfiXL8Ap6Im2BBdqczS2g', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 21:58:54.968684+00', '2024-05-17 22:56:55.306825+00', 'zfdIHIYRZuunkwVXBLhyLQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 27, 'CJ8QJswsmWlaBv22EEjScQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 22:56:55.322518+00', '2024-05-17 23:54:55.754416+00', 'FtfiXL8Ap6Im2BBdqczS2g', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 28, 'SfJgOi1EyWwEV7WQJ2gsZw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-17 23:54:55.767117+00', '2024-05-18 00:52:56.057058+00', 'CJ8QJswsmWlaBv22EEjScQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 29, 'grN-WpYwReIzpfNNhoD4Mg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 00:52:56.069705+00', '2024-05-18 01:51:26.507618+00', 'SfJgOi1EyWwEV7WQJ2gsZw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 30, 'H0NXhPT1cQI4Koi3inMmZw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 01:51:26.518926+00', '2024-05-18 02:49:26.821098+00', 'grN-WpYwReIzpfNNhoD4Mg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 31, 'SRxQW9RuK8PKVaME2MtDtQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 02:49:26.836196+00', '2024-05-18 05:11:23.160923+00', 'H0NXhPT1cQI4Koi3inMmZw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 32, 'SrZhSVJO1pdG9-064Q9w6w', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 05:11:23.17647+00', '2024-05-18 06:52:28.162827+00', 'SRxQW9RuK8PKVaME2MtDtQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 33, 'rns8GsCoREJrSjwG3jcShg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 06:52:28.180252+00', '2024-05-18 09:25:06.619093+00', 'SrZhSVJO1pdG9-064Q9w6w', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 34, 'Ja3tzzFj7W8BDMdFPeJXLw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 09:25:06.64362+00', '2024-05-18 10:26:07.169476+00', 'rns8GsCoREJrSjwG3jcShg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 35, 'Ba_LfjScGxC-mJg-C19J2w', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 10:26:07.184179+00', '2024-05-18 11:27:08.606193+00', 'Ja3tzzFj7W8BDMdFPeJXLw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 36, 'gf2g1PKL3I103V8NzDjcQQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 11:27:08.619878+00', '2024-05-18 12:28:08.844532+00', 'Ba_LfjScGxC-mJg-C19J2w', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 37, 'LdzwsNKbMS0168bSYwZjfA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 12:28:08.853641+00', '2024-05-18 13:38:43.959407+00', 'gf2g1PKL3I103V8NzDjcQQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 38, 'MV5UI5hyWzwkptvnAZGzAg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 13:38:43.970477+00', '2024-05-18 15:14:03.007893+00', 'LdzwsNKbMS0168bSYwZjfA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 39, 'N8oknJ4YhKe22GJJTAs_lg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 15:14:03.030957+00', '2024-05-18 16:12:33.27158+00', 'MV5UI5hyWzwkptvnAZGzAg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 40, 'mC0Pw1ZCoV1BWs8pAx5Smw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 16:12:33.287963+00', '2024-05-18 17:10:33.936046+00', 'N8oknJ4YhKe22GJJTAs_lg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 24, '9IDci4NTOSOEH8_d8JTCDw', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', true, '2024-05-17 20:05:10.536653+00', '2024-05-18 17:59:38.866759+00', '71D4WhqU2JgK7GKKbNwV3w', '317cf8cf-a24d-4c30-a135-3223f84e48b5'),
	('00000000-0000-0000-0000-000000000000', 14, 'HD74mL1a1uEQX3Uml52-lQ', 'db30c333-c34c-4aff-8b8b-069aa557ba47', true, '2024-05-17 14:01:12.611243+00', '2024-05-18 17:59:50.500455+00', 'TV5Kfg2LwDj0coeH8c-R8A', 'daaa620c-3464-4c0c-bf5a-36c369fb1168'),
	('00000000-0000-0000-0000-000000000000', 41, 'f_YWHn2lowYpnpgEZRK5xw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 17:10:33.951054+00', '2024-05-18 18:08:34.343776+00', 'mC0Pw1ZCoV1BWs8pAx5Smw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 44, 'nQAUNG5yJ0U6FLuZOxLzUA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 18:08:34.359562+00', '2024-05-18 19:06:34.839981+00', 'f_YWHn2lowYpnpgEZRK5xw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 45, 'hsWiVdskJtnBDu1tF3VElA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 19:06:34.854897+00', '2024-05-18 20:04:35.380604+00', 'nQAUNG5yJ0U6FLuZOxLzUA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 42, 'YI2KTR36QfxVM6yeuJ7EwQ', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', true, '2024-05-18 17:59:38.875903+00', '2024-05-18 22:01:57.960593+00', '9IDci4NTOSOEH8_d8JTCDw', '317cf8cf-a24d-4c30-a135-3223f84e48b5'),
	('00000000-0000-0000-0000-000000000000', 57, 'DGYeNtVL8IeAufmarURw-A', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 05:45:40.0836+00', '2024-05-19 06:44:10.500799+00', 'gQWVaJy-3peKZhzJQ9FEnw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 46, 'eE0pHxBesPx8HWvY10yBEA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 20:04:35.39536+00', '2024-05-18 21:02:35.890566+00', 'hsWiVdskJtnBDu1tF3VElA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 58, 'B-yyO_t2lkXjZw6je44GTw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 06:44:10.512745+00', '2024-05-19 07:42:10.821362+00', 'DGYeNtVL8IeAufmarURw-A', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 47, '0wVaq63KEveWbS6N05SD9g', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 21:02:35.907937+00', '2024-05-18 22:00:36.286214+00', 'eE0pHxBesPx8HWvY10yBEA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 48, 'DKFojptEU2cst2nmJnz4rA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 22:00:36.301972+00', '2024-05-18 22:58:36.705977+00', '0wVaq63KEveWbS6N05SD9g', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 59, 'V08wMCbu6w_F3K71f3KBYA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 07:42:10.847534+00', '2024-05-19 08:40:11.25197+00', 'B-yyO_t2lkXjZw6je44GTw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 50, 'YO5y_ZOVDNTJiMV8uljv_g', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 22:58:36.719146+00', '2024-05-18 23:56:37.456004+00', 'DKFojptEU2cst2nmJnz4rA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 51, 'mg4g8IAY-C4FrGBxAH3q9w', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-18 23:56:37.47437+00', '2024-05-19 00:54:37.649331+00', 'YO5y_ZOVDNTJiMV8uljv_g', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 60, 'SvPqvfrhp8yQscGLhKrR6Q', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 08:40:11.264456+00', '2024-05-19 09:38:41.619232+00', 'V08wMCbu6w_F3K71f3KBYA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 52, 'QshChYeSnNTuEG8fJTcYdA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 00:54:37.663998+00', '2024-05-19 01:52:38.235312+00', 'mg4g8IAY-C4FrGBxAH3q9w', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 53, '2X56GKMP6FbQS1M6KPn93g', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 01:52:38.258837+00', '2024-05-19 02:51:08.562992+00', 'QshChYeSnNTuEG8fJTcYdA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 61, 'eJEYiOUIgrebz_OF8ljvWQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 09:38:41.634867+00', '2024-05-19 10:36:42.106104+00', 'SvPqvfrhp8yQscGLhKrR6Q', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 54, 'taBSwRRt4MXL7XKMX2VxmQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 02:51:08.575491+00', '2024-05-19 03:49:09.204293+00', '2X56GKMP6FbQS1M6KPn93g', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 55, 'iXpHBvjSam3Fa2-tqt_8rw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 03:49:09.219239+00', '2024-05-19 04:47:39.565315+00', 'taBSwRRt4MXL7XKMX2VxmQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 62, 'KDDZ6y6Mq8kYBI4xy5wMFA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 10:36:42.123483+00', '2024-05-19 11:35:12.314694+00', 'eJEYiOUIgrebz_OF8ljvWQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 56, 'gQWVaJy-3peKZhzJQ9FEnw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 04:47:39.583576+00', '2024-05-19 05:45:40.05817+00', 'iXpHBvjSam3Fa2-tqt_8rw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 63, '-foW4Ee9Zs9TGkVQ4ou8sw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 11:35:12.329971+00', '2024-05-19 12:33:13.033852+00', 'KDDZ6y6Mq8kYBI4xy5wMFA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 64, 'LS3WlLwXyCwFFDiIfP8zbw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 12:33:13.0518+00', '2024-05-19 13:31:43.248538+00', '-foW4Ee9Zs9TGkVQ4ou8sw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 65, '76Fz3mZaFyCSGbGCMhqE5A', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 13:31:43.261662+00', '2024-05-19 14:29:43.729071+00', 'LS3WlLwXyCwFFDiIfP8zbw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 66, 'wSXWuk_vHLSh2rsWiIHfAw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 14:29:43.740955+00', '2024-05-19 15:27:44.326926+00', '76Fz3mZaFyCSGbGCMhqE5A', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 67, 'D4rCIKIUgVxF3V1NLcNW_Q', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 15:27:44.343693+00', '2024-05-19 16:25:45.414507+00', 'wSXWuk_vHLSh2rsWiIHfAw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 68, 'tW8lEFEogXx2jcDPhPvCvA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 16:25:45.435406+00', '2024-05-19 17:23:46.159832+00', 'D4rCIKIUgVxF3V1NLcNW_Q', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 69, 'SsKj-1-_cdGnOFUeChMqVg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 17:23:46.179093+00', '2024-05-19 18:22:16.735099+00', 'tW8lEFEogXx2jcDPhPvCvA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 70, 'xAD6LEuR8ZBNy-qkm2oBtA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 18:22:16.749279+00', '2024-05-19 19:20:17.150095+00', 'SsKj-1-_cdGnOFUeChMqVg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 71, 'RHrp7uJpWRVgnwWuiFJnGA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 19:20:17.161818+00', '2024-05-19 20:18:17.944956+00', 'xAD6LEuR8ZBNy-qkm2oBtA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 72, 'ZWVCBajpmjhljgkudkLcHg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 20:18:17.956505+00', '2024-05-19 21:16:18.993891+00', 'RHrp7uJpWRVgnwWuiFJnGA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 73, 'uksLUGpvooTWENXq3uE-mQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 21:16:19.010091+00', '2024-05-19 22:14:20.369733+00', 'ZWVCBajpmjhljgkudkLcHg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 74, 'BuG2A0wYWQW0XwYMswVRuw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 22:14:20.390676+00', '2024-05-19 23:12:20.860837+00', 'uksLUGpvooTWENXq3uE-mQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 75, 'ACl4PtXpYdsG6u8nuy_vwg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-19 23:12:20.87543+00', '2024-05-20 00:10:21.384187+00', 'BuG2A0wYWQW0XwYMswVRuw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 76, 'U-JaBtWl1plD5U8bE9e2sg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 00:10:21.400981+00', '2024-05-20 01:08:51.708065+00', 'ACl4PtXpYdsG6u8nuy_vwg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 77, '5rkAo5ZuNr_QQd7lfbcyUw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 01:08:51.722702+00', '2024-05-20 02:06:52.164892+00', 'U-JaBtWl1plD5U8bE9e2sg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 78, '8yrSlbj9EqRBorTx5JJbXw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 02:06:52.183996+00', '2024-05-20 03:05:22.261021+00', '5rkAo5ZuNr_QQd7lfbcyUw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 79, 'XJPz89xS3Ynkrxn7MKrmHA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 03:05:22.275237+00', '2024-05-20 04:03:28.257155+00', '8yrSlbj9EqRBorTx5JJbXw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 80, 'eB0dseRyx6U8LM-9APFGCw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 04:03:28.278672+00', '2024-05-20 05:01:58.72089+00', 'XJPz89xS3Ynkrxn7MKrmHA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 81, '4Gbfs10vnuiwoYquKkdlqg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 05:01:58.742631+00', '2024-05-20 05:59:59.162714+00', 'eB0dseRyx6U8LM-9APFGCw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 82, 'vuT6LmaRYeC8JlmaiiXJWg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 05:59:59.183542+00', '2024-05-20 06:58:29.545926+00', '4Gbfs10vnuiwoYquKkdlqg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 83, 'f6KiY57sLpy9UDBSGWBLiQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 06:58:29.562104+00', '2024-05-20 07:56:29.899118+00', 'vuT6LmaRYeC8JlmaiiXJWg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 84, '4ytino_pk3D8UGUNadYrnQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 07:56:29.919146+00', '2024-05-20 08:54:30.193646+00', 'f6KiY57sLpy9UDBSGWBLiQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 85, 'DDY2VkXlkYvNWS9L6YQ3cA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 08:54:30.211284+00', '2024-05-20 09:53:00.810105+00', '4ytino_pk3D8UGUNadYrnQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 86, '7rjpIwDgiTT8D7HEdlJrcw', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 09:53:00.829712+00', '2024-05-20 10:51:01.158107+00', 'DDY2VkXlkYvNWS9L6YQ3cA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 87, 'Fr18NAF_guTYp8ThBv5-JQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 10:51:01.174304+00', '2024-05-20 11:49:31.642287+00', '7rjpIwDgiTT8D7HEdlJrcw', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 88, 'qmjAseP26FGKxp0Jy2h5pA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 11:49:31.662743+00', '2024-05-20 12:47:31.898698+00', 'Fr18NAF_guTYp8ThBv5-JQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 89, 'ckcqGqGbLyIOsq08C-nD5g', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 12:47:31.919069+00', '2024-05-20 13:45:32.878792+00', 'qmjAseP26FGKxp0Jy2h5pA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 90, 'eEIAhKPJaBOIyeJpe23Otg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 13:45:32.906421+00', '2024-05-20 14:43:34.62439+00', 'ckcqGqGbLyIOsq08C-nD5g', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 49, 'kqKfYu7MnFyQg9gxzjIa9A', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', true, '2024-05-18 22:01:57.969888+00', '2024-05-21 00:42:27.350473+00', 'YI2KTR36QfxVM6yeuJ7EwQ', '317cf8cf-a24d-4c30-a135-3223f84e48b5'),
	('00000000-0000-0000-0000-000000000000', 91, '4Rx1QDN6VgmctFkMfQvhCQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 14:43:34.638902+00', '2024-05-20 15:41:35.113536+00', 'eEIAhKPJaBOIyeJpe23Otg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 92, 'pbZ2Ch8lgEpj5zKDNLxUvQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 15:41:35.137082+00', '2024-05-20 16:40:05.308946+00', '4Rx1QDN6VgmctFkMfQvhCQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 93, 'K8mrrHJnMPRlqtLVqcOIUQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 16:40:05.330283+00', '2024-05-20 17:38:35.516644+00', 'pbZ2Ch8lgEpj5zKDNLxUvQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 94, 'xkmnw3ylQ2LwYMeNwHglxA', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 17:38:35.541053+00', '2024-05-20 18:36:35.974708+00', 'K8mrrHJnMPRlqtLVqcOIUQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 95, 'I9xu4L4iRmD1TCcZwbBc9w', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 18:36:35.99903+00', '2024-05-20 19:35:06.392605+00', 'xkmnw3ylQ2LwYMeNwHglxA', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 96, '1ezjqkOlTHa_XATUZF0z5Q', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 19:35:06.411535+00', '2024-05-20 20:33:06.804119+00', 'I9xu4L4iRmD1TCcZwbBc9w', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 97, 'AaC8T_U1E9QoVB1M5bS9GQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 20:33:06.821933+00', '2024-05-20 21:31:07.251708+00', '1ezjqkOlTHa_XATUZF0z5Q', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 98, 'mcm7nAch8diYpZc_nmDfdQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 21:31:07.266998+00', '2024-05-20 22:29:07.683588+00', 'AaC8T_U1E9QoVB1M5bS9GQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 99, 'G7tjSFXxW0eyzjgLjnp2ig', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 22:29:07.699295+00', '2024-05-20 23:27:08.131192+00', 'mcm7nAch8diYpZc_nmDfdQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 100, 'OSBKaRkL7-EWJMitkkcNUQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-20 23:27:08.145625+00', '2024-05-21 00:25:38.674134+00', 'G7tjSFXxW0eyzjgLjnp2ig', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 102, 'F5V4hq1i6iW5zsoM9EXZuw', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', false, '2024-05-21 00:42:27.362002+00', '2024-05-21 00:42:27.362002+00', 'kqKfYu7MnFyQg9gxzjIa9A', '317cf8cf-a24d-4c30-a135-3223f84e48b5'),
	('00000000-0000-0000-0000-000000000000', 101, 'S7T3KxYljsKpG3y8NpV2JQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 00:25:38.694158+00', '2024-05-21 01:23:38.810386+00', 'OSBKaRkL7-EWJMitkkcNUQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 103, 'mqfdGExp8UXLbNsHxYFjHQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 01:23:38.832981+00', '2024-05-21 02:21:39.445153+00', 'S7T3KxYljsKpG3y8NpV2JQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 104, '7j071e52zhVpppy4yK2nDg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 02:21:39.466939+00', '2024-05-21 03:19:39.962549+00', 'mqfdGExp8UXLbNsHxYFjHQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 105, 'Bw36AYxZGcPZ7jwl8pdmaQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 03:19:39.98495+00', '2024-05-21 04:17:40.480102+00', '7j071e52zhVpppy4yK2nDg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 106, 'kPPOcE2OHq84vlzOArJIfg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 04:17:40.498355+00', '2024-05-21 05:16:10.641656+00', 'Bw36AYxZGcPZ7jwl8pdmaQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 107, '_TCnpakeBf_26enbr5GRZg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 05:16:10.658918+00', '2024-05-21 06:14:11.048788+00', 'kPPOcE2OHq84vlzOArJIfg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 108, 'E_91VD17LId-rusgAeVn-w', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 06:14:11.063468+00', '2024-05-21 07:12:41.537685+00', '_TCnpakeBf_26enbr5GRZg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 109, '0j6Be8tGkFuAv1czw-K2UQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 07:12:41.558442+00', '2024-05-21 08:10:41.992962+00', 'E_91VD17LId-rusgAeVn-w', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 110, 'EAJSJlEYMAlcRdZajoYy7A', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 08:10:42.009196+00', '2024-05-21 09:09:12.238214+00', '0j6Be8tGkFuAv1czw-K2UQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 111, '2WMF9dS-cLjuEYpvQqqy7w', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 09:09:12.257195+00', '2024-05-21 10:07:42.673851+00', 'EAJSJlEYMAlcRdZajoYy7A', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 112, '5Nr08RJU1HzgULp7hK8lPg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 10:07:42.695808+00', '2024-05-21 11:05:42.985092+00', '2WMF9dS-cLjuEYpvQqqy7w', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 113, 'tH4_K8QhjsECCuCIDaZ3UQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 11:05:43.000634+00', '2024-05-21 12:04:13.44408+00', '5Nr08RJU1HzgULp7hK8lPg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 114, 'wMqAvPKw5ZwQpqEx1mybcQ', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 12:04:13.467145+00', '2024-05-21 13:02:43.513751+00', 'tH4_K8QhjsECCuCIDaZ3UQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 116, 'rkXIT3x0mgwUsZNQyWNK5g', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 13:02:43.527099+00', '2024-05-21 14:00:44.224151+00', 'wMqAvPKw5ZwQpqEx1mybcQ', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 115, 'hmMzyhYSMihJgtwf8Ahzhg', 'db30c333-c34c-4aff-8b8b-069aa557ba47', true, '2024-05-21 12:55:14.127793+00', '2024-05-21 14:06:07.26588+00', 'IDNY7p6fcXNHY65pKjSyNA', 'daaa620c-3464-4c0c-bf5a-36c369fb1168'),
	('00000000-0000-0000-0000-000000000000', 118, 'VK_9Ucf_VWlAXNIlkxd92Q', 'db30c333-c34c-4aff-8b8b-069aa557ba47', false, '2024-05-21 14:06:07.283632+00', '2024-05-21 14:06:07.283632+00', 'hmMzyhYSMihJgtwf8Ahzhg', 'daaa620c-3464-4c0c-bf5a-36c369fb1168'),
	('00000000-0000-0000-0000-000000000000', 117, 'v11tmuo63OaceqM6zScPDg', '943b7c7b-9275-4557-b288-7f990b4ae105', true, '2024-05-21 14:00:44.240909+00', '2024-05-21 14:58:45.185431+00', 'rkXIT3x0mgwUsZNQyWNK5g', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b'),
	('00000000-0000-0000-0000-000000000000', 119, 'O0Q1bgqfkocD5xTzJVzgyw', '943b7c7b-9275-4557-b288-7f990b4ae105', false, '2024-05-21 14:58:45.200987+00', '2024-05-21 14:58:45.200987+00', 'v11tmuo63OaceqM6zScPDg', 'c6b1cf31-a1fc-470d-a6df-b5267b46b04b');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: communities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."communities" ("id", "created_at", "community_title", "community_style", "community_owner", "channels", "community_photos", "community_members", "community_profile_pic", "about", "city", "location") VALUES
	(1, '2024-05-17 14:00:50.743+00', 'Blended Athletics', 'Gym', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', NULL, '{8d2bdb49-30e0-4af7-b791-4f7249d29efd/1715954449296.true}', NULL, '8d2bdb49-30e0-4af7-b791-4f7249d29efd/1715954449296.true', NULL, 'Halifax', NULL);


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "created_at", "username", "first_name", "last_name", "gender", "intentions", "activities", "birthday", "photos_url", "community_created", "onboard", "connected_users", "ignored_users", "sexuality", "community_preference", "actvitiy_time", "pinned_channels", "profile_pic", "bucket_list", "city", "fitness_goals", "fitness_lvl", "fitness_records", "hobbies", "music_pref", "primary_gym", "secondary_gym") VALUES
	('9adff67a-f0e3-4109-94ad-1b07d0e67689', '2024-05-16 23:03:21.279984', NULL, 'Jonson', 'Allen', 'Male', NULL, NULL, '2000-04-20 20:03:59', '{NULL}', NULL, false, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Halifax', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('943b7c7b-9275-4557-b288-7f990b4ae105', '2024-05-17 00:08:33.974932', NULL, 'Jonson', '', 'Male', NULL, NULL, '2000-05-17 00:08:00', '{NULL}', NULL, true, NULL, NULL, 'Prefer not to say', NULL, NULL, NULL, NULL, NULL, 'Halifax', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('425588a8-51ad-42a4-acad-809be609cf09', '2024-05-17 14:04:26.327515', NULL, 'Jonson', 'Allen', 'Male', NULL, NULL, '1997-05-17 14:04:00', '{NULL}', NULL, true, NULL, NULL, 'Prefer not to say', NULL, NULL, NULL, NULL, NULL, 'Halifax', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('8d2bdb49-30e0-4af7-b791-4f7249d29efd', '2024-05-17 08:52:49.495754', NULL, 'David', 'Rafuse', 'Male', NULL, '{Aerobics,Crossfit}', '1986-06-22 08:53:00', '{NULL,8d2bdb49-30e0-4af7-b791-4f7249d29efd/1715936213160.true,8d2bdb49-30e0-4af7-b791-4f7249d29efd/1715954527739.true}', NULL, true, '{db30c333-c34c-4aff-8b8b-069aa557ba47}', NULL, 'Straight', NULL, 'Afternoon', NULL, '8d2bdb49-30e0-4af7-b791-4f7249d29efd/1715936116803.true', NULL, 'Halifax', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('db30c333-c34c-4aff-8b8b-069aa557ba47', '2024-05-17 12:03:47.930268', NULL, 'Kimberley', 'Kidd', 'Female', NULL, '{Aerobics,Crossfit}', '1987-06-20 12:04:00', '{NULL,db30c333-c34c-4aff-8b8b-069aa557ba47/1715947576193.true,db30c333-c34c-4aff-8b8b-069aa557ba47/1715954529691.true}', NULL, true, '{943b7c7b-9275-4557-b288-7f990b4ae105,8d2bdb49-30e0-4af7-b791-4f7249d29efd,9adff67a-f0e3-4109-94ad-1b07d0e67689}', NULL, 'Prefer not to say', NULL, 'Afternoon', NULL, 'db30c333-c34c-4aff-8b8b-069aa557ba47/1715947557843.true', '{"Complete an Ironman Triathlon"}', 'Halifax', NULL, 'Professional', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: chat_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."chat_sessions" ("id", "created_at", "user1", "user2", "messages") VALUES
	('2a15a367-da3f-4283-9d90-fb01d1c8c619', '2024-05-17 12:07:53.243+00', 'db30c333-c34c-4aff-8b8b-069aa557ba47', '943b7c7b-9275-4557-b288-7f990b4ae105', NULL),
	('7f132989-50b8-4a46-a202-ffd5c3aaecb6', '2024-05-17 14:04:38.103+00', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', 'db30c333-c34c-4aff-8b8b-069aa557ba47', NULL),
	('2464f63a-a9f4-4efe-9bca-dbd5fa3cf822', '2024-05-18 18:00:06.955+00', 'db30c333-c34c-4aff-8b8b-069aa557ba47', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', NULL),
	('9b4a32b8-c93c-4a73-bf41-3dc6f34c7858', '2024-05-18 18:00:07.99+00', 'db30c333-c34c-4aff-8b8b-069aa557ba47', '9adff67a-f0e3-4109-94ad-1b07d0e67689', NULL);


--
-- Data for Name: community_channels; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: community_channel_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: community_members; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: community_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."community_requests" ("id", "created_at", "requested_community", "user_id", "first_name") VALUES
	('845bc42f-7558-423f-9fbb-5da96a9504bd', '2024-05-17 14:03:19.294364+00', 1, '8d2bdb49-30e0-4af7-b791-4f7249d29efd', 'David'),
	('6b687faa-7840-4137-9a43-148ca79d4032', '2024-05-17 14:03:47.537675+00', 1, 'db30c333-c34c-4aff-8b8b-069aa557ba47', 'Kimberley'),
	('e6033b83-1e61-4ee7-9129-0654c4b0c21e', '2024-05-17 14:04:53.539284+00', 1, '425588a8-51ad-42a4-acad-809be609cf09', 'Jonson');


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: events_users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."messages" ("id", "sent_at", "message", "chat_session", "sender", "read") VALUES
	('97e3e221-8356-44ce-8d8a-947ca1b5199a', '2024-05-17 12:07:53.575+00', 'Howdy man', '2a15a367-da3f-4283-9d90-fb01d1c8c619', 'db30c333-c34c-4aff-8b8b-069aa557ba47', false),
	('474e30f6-346a-4bdc-bc25-844910059168', '2024-05-17 14:04:38.366+00', 'Hi Kimberley', '7f132989-50b8-4a46-a202-ffd5c3aaecb6', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', false),
	('671ce1df-f019-4c63-bdc8-016e2213e6e5', '2024-05-18 18:00:07.244+00', 'Yo', '2464f63a-a9f4-4efe-9bca-dbd5fa3cf822', 'db30c333-c34c-4aff-8b8b-069aa557ba47', false),
	('fb551adf-6264-4806-94f4-4057ec402081', '2024-05-18 18:00:08.245+00', 'Yo', '9b4a32b8-c93c-4a73-bf41-3dc6f34c7858', 'db30c333-c34c-4aff-8b8b-069aa557ba47', false),
	('eadb5fd9-383a-4970-a207-488f406f1785', '2024-05-18 18:03:15.821+00', 'What’s uo', '2464f63a-a9f4-4efe-9bca-dbd5fa3cf822', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', false);


--
-- Data for Name: user_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('photos', 'photos', NULL, '2024-04-12 22:53:32.21081+00', '2024-04-12 22:53:32.21081+00', false, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id") VALUES
	('6a66fd40-92a1-4f18-98ab-0fb023cb794a', 'photos', '8d2bdb49-30e0-4af7-b791-4f7249d29efd/1715936116803.true', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', '2024-05-17 08:55:17.724027+00', '2024-05-17 08:55:17.724027+00', '2024-05-17 08:55:17.724027+00', '{"eTag": "\"d0afa768a5f5c9184b64f4e26f26a35c\"", "size": 594587, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-17T08:55:18.000Z", "contentLength": 594587, "httpStatusCode": 200}', 'b582f7e8-f5ed-4c0c-9473-e1a708924b78', '8d2bdb49-30e0-4af7-b791-4f7249d29efd'),
	('fa972f16-11f9-4be6-8437-42c488c56b95', 'photos', '8d2bdb49-30e0-4af7-b791-4f7249d29efd/1715936155525.true', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', '2024-05-17 08:55:56.934014+00', '2024-05-17 08:55:56.934014+00', '2024-05-17 08:55:56.934014+00', '{"eTag": "\"aa012db3b25bc3c08d15606ec43ad8ee\"", "size": 2382065, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-17T08:55:57.000Z", "contentLength": 2382065, "httpStatusCode": 200}', '2e2b83d7-1bba-49b9-be23-2f8b792122e3', '8d2bdb49-30e0-4af7-b791-4f7249d29efd'),
	('246f9f3f-c214-4686-a797-db84083d91e4', 'photos', '8d2bdb49-30e0-4af7-b791-4f7249d29efd/1715936213160.true', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', '2024-05-17 08:56:54.180634+00', '2024-05-17 08:56:54.180634+00', '2024-05-17 08:56:54.180634+00', '{"eTag": "\"db97e6135a9ffc9eb73d0954e381d2af\"", "size": 759909, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-17T08:56:55.000Z", "contentLength": 759909, "httpStatusCode": 200}', '48dd55a8-928d-453f-b634-937f5e5797a3', '8d2bdb49-30e0-4af7-b791-4f7249d29efd'),
	('f71e45b8-7774-4167-853f-23368b83f5e8', 'photos', '8d2bdb49-30e0-4af7-b791-4f7249d29efd/1715954449296.true', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', '2024-05-17 14:00:50.307917+00', '2024-05-17 14:00:50.307917+00', '2024-05-17 14:00:50.307917+00', '{"eTag": "\"6a5826742cc4e30679737bcfaae01c25\"", "size": 177336, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-17T14:00:51.000Z", "contentLength": 177336, "httpStatusCode": 200}', 'cb7549d3-a990-4e30-ac4a-5fdba9fee437', '8d2bdb49-30e0-4af7-b791-4f7249d29efd'),
	('8f985e9c-48ba-4d8c-bd3d-2d3e3883e1bc', 'photos', 'db30c333-c34c-4aff-8b8b-069aa557ba47/1715947557843.true', 'db30c333-c34c-4aff-8b8b-069aa557ba47', '2024-05-17 12:06:00.727326+00', '2024-05-17 12:06:00.727326+00', '2024-05-17 12:06:00.727326+00', '{"eTag": "\"7b822cfece7e4914e999eaac57b06492\"", "size": 1802646, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-17T12:06:01.000Z", "contentLength": 1802646, "httpStatusCode": 200}', '576ec47b-d2aa-4573-aa29-1a6f371c3d98', 'db30c333-c34c-4aff-8b8b-069aa557ba47'),
	('712456e2-1c6f-4adc-ba55-45880474d781', 'photos', 'db30c333-c34c-4aff-8b8b-069aa557ba47/1715947576193.true', 'db30c333-c34c-4aff-8b8b-069aa557ba47', '2024-05-17 12:06:23.628523+00', '2024-05-17 12:06:23.628523+00', '2024-05-17 12:06:23.628523+00', '{"eTag": "\"35ad7281b1a7d4f2b57cdb25fb1c989a-2\"", "size": 6367550, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-17T12:06:24.000Z", "contentLength": 6367550, "httpStatusCode": 200}', '2aa2e723-592c-4960-b21a-cd9646b65530', 'db30c333-c34c-4aff-8b8b-069aa557ba47'),
	('7c518fe8-e6e6-4dd1-b581-7fa40e202f66', 'photos', '8d2bdb49-30e0-4af7-b791-4f7249d29efd/1715954527739.true', '8d2bdb49-30e0-4af7-b791-4f7249d29efd', '2024-05-17 14:02:10.906565+00', '2024-05-17 14:02:10.906565+00', '2024-05-17 14:02:10.906565+00', '{"eTag": "\"ba0d90723e237265b700883c69b04d2f\"", "size": 1596753, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-17T14:02:11.000Z", "contentLength": 1596753, "httpStatusCode": 200}', '9bab7809-11a7-460f-9c2f-a5563f74ba6b', '8d2bdb49-30e0-4af7-b791-4f7249d29efd'),
	('296433b2-7b81-4ad9-9199-d729fda91a5d', 'photos', 'db30c333-c34c-4aff-8b8b-069aa557ba47/1715954529691.true', 'db30c333-c34c-4aff-8b8b-069aa557ba47', '2024-05-17 14:02:12.782238+00', '2024-05-17 14:02:12.782238+00', '2024-05-17 14:02:12.782238+00', '{"eTag": "\"40119da76eb0bbac21a56bfaede5e194\"", "size": 2121972, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-17T14:02:13.000Z", "contentLength": 2121972, "httpStatusCode": 200}', 'ee41af24-695b-4111-a75a-5de1213d6dd7', 'db30c333-c34c-4aff-8b8b-069aa557ba47'),
	('227d0dd1-dec9-4c69-973a-7bf8c132ebd5', 'photos', 'TWU-Logo.png', NULL, '2024-05-02 19:37:05.795636+00', '2024-05-02 19:37:31.609618+00', '2024-05-02 19:37:05.795636+00', '{"eTag": "\"f91939d03c5f0b50d2df08601bf2dffd\"", "size": 603193, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-05-02T19:37:32.000Z", "contentLength": 603193, "httpStatusCode": 200}', 'ce6e98b6-e085-4226-9e9a-1e1196431b16', NULL);


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 119, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."events_id_seq"', 1, false);


--
-- Name: gyms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."gyms_id_seq"', 1, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
