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

  alter table "public"."communities" add column "member_count" numeric not null default '1'::numeric;

alter table "public"."community_members" add column "expo_push_token" text;

alter table "public"."community_requests" add column "expo_push_token" text;

alter table "public"."profiles" add column "about" text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_profiles_with_min_urls(user_id uuid)
 RETURNS SETOF profiles
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT *
  FROM profiles
  WHERE id != user_id
    AND array_length(photos_url, 1) >= 2;
END;
$function$
;

create policy "Enable delete for users based on user_id"
on "public"."community_channels"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = community_owner));
alter table "public"."messages" add column "community_or_event_link" boolean not null default false;

alter table "public"."messages" add column "eventId" bigint;

alter table "public"."profiles" add column "new_update_modal" boolean not null default false;

alter table "public"."messages" add constraint "public_messages_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "public_messages_eventId_fkey";

create policy "Enable leave for users based on user_id"
on "public"."community_members"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable delete for users based on user_id"
on "public"."events_users"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));