
create extension if not exists "postgis" with schema "extensions";


alter table "public"."profiles" drop constraint "public_profiles_community_created_fkey";

alter table "public"."profiles" add column "last_location_update" timestamp with time zone;

alter table "public"."profiles" add column "location" geography(Point,4326);

alter table "public"."profiles" add column "radius" double precision default '50'::double precision;

CREATE INDEX profile_geo_index ON public.profiles USING gist (location);

alter table "public"."profiles" add constraint "public_profiles_community_created_fkey" FOREIGN KEY (community_created) REFERENCES communities(id) ON DELETE SET NULL not valid;

alter table "public"."profiles" validate constraint "public_profiles_community_created_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_communities_with_search(user_id uuid, search_term text)
 RETURNS TABLE(id uuid, community_title text, community_tags text[], community_profile_pic text, compatibility_score numeric)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        c.id, 
        c.community_title, 
        c.community_tags, 
        c.community_profile_pic,
        (SELECT COUNT(*) FROM unnest(c.community_tags) tag WHERE tag = ANY(p.activities))::NUMERIC / NULLIF(array_length(p.activities, 1), 0) * 500 AS compatibility_score
    FROM communities c
    JOIN profiles p ON p.id = user_id
    WHERE 
        search_term IS NULL OR 
        c.community_title ILIKE '%' || search_term || '%' OR
        search_term = ANY(c.community_tags)
    ORDER BY compatibility_score DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_community_friend_count(user_id uuid, community_id bigint)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  friend_count integer;
begin
  select count(distinct cm.user_id) into friend_count
  from chat_sessions cs
  cross join lateral (
    select 
      case 
        when cs.user1 = get_community_friend_count.user_id then cs.user2 
        else cs.user1 
      end as friend_id
  ) as friends
  inner join community_members cm on cm.user_id = friends.friend_id
  where 
    (cs.user1 = get_community_friend_count.user_id or cs.user2 = get_community_friend_count.user_id)
    and cm.community_id = get_community_friend_count.community_id;

  return friend_count;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_event_friend_count(user_id uuid, event_id bigint)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  friend_count integer;
begin
  select count(distinct eu.user_id) into friend_count
  from chat_sessions cs
  cross join lateral (
    select 
      case 
        when cs.user1 = get_event_friend_count.user_id then cs.user2 
        else cs.user1 
      end as friend_id
  ) as friends
  inner join events_users eu on eu.user_id = friends.friend_id
  where 
    (cs.user1 = get_event_friend_count.user_id or cs.user2 = get_event_friend_count.user_id)
    and eu.event_id = get_event_friend_count.event_id;

  return friend_count;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.get_users_communities(user_id uuid)
 RETURNS SETOF communities
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
  select c.*
  from communities c
  inner join community_members cm on cm.community_id = c.id
  where cm.user_id = $1;
$function$
;

CREATE OR REPLACE FUNCTION public.st_astext(wkb text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
begin
  return st_astext(st_geomfromewkb(decode(wkb, 'hex')));
end;
$function$
;