alter table "public"."chat_sessions" add column "recent_message" text;

alter table "public"."chat_sessions" add column "updated_at" timestamp with time zone;

alter table "public"."communities" drop column "location";

alter table "public"."communities" add column "address" text;

alter table "public"."communities" add column "phone_number" text;

alter table "public"."community_channel_messages" add column "sender_name" text;

alter table "public"."community_channels" add column "recent_message" text;

alter table "public"."community_channels" add column "updated_at" timestamp with time zone;

alter table "public"."events" add column "event_style" text;

alter table "public"."profiles" add column "allowed_create_community" boolean not null default false;

alter table "public"."profiles" add column "expo_push_token" text;

alter table "public"."profiles" alter column "bucket_list" set data type text using "bucket_list"::text;

alter table "public"."profiles" alter column "hobbies" set data type text using "hobbies"::text;

alter table "public"."profiles" alter column "music_pref" set data type text using "music_pref"::text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.firstname_lastname(profiles)
 RETURNS text
 LANGUAGE sql
 IMMUTABLE
AS $function$
  select $1.first_name|| ' ' || $1.last_name;
$function$
;

create policy "Enable select and update for users based on user1 or user2"
on "public"."chat_sessions"
as permissive
for all
to public
using (((user1 = auth.uid()) OR (user2 = auth.uid())))
with check (((user1 = auth.uid()) OR (user2 = auth.uid())));


create policy "update_community_channels"
on "public"."community_channels"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM community_members cm
  WHERE ((cm.user_id = auth.uid()) AND (cm.community_id = community_channels.community)))));