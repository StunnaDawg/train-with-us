drop policy "Enable select and update for users based on user1 or user2" on "public"."chat_sessions";

drop policy "Update Community" on "public"."communities";

drop policy "Enable delete for users based on user_id" on "public"."community_channel_membership";

drop policy "Enable delete for users based on user_id" on "public"."community_requests";

drop policy "Enable delete for users based on user_id" on "public"."events";

create table "public"."community_class_schedule" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "community_id" bigint not null,
    "class_id" uuid not null default gen_random_uuid(),
    "start_time" timestamp with time zone not null,
    "end_time" timestamp with time zone,
    "recurrence_end" date,
    "selected_days_of_week" text[] not null,
    "recurring_class" boolean not null default false,
    "schedule_name" text not null,
    "community_owner" uuid not null,
    "class_name" text not null,
    "class_duration" numeric not null
);


alter table "public"."community_class_schedule" enable row level security;

create table "public"."community_classes" (
    "id" uuid not null default gen_random_uuid(),
    "community_id" bigint,
    "class_name" text not null default ''::text,
    "description" text,
    "duration" numeric,
    "created_at" timestamp with time zone default now(),
    "class_tags" text[],
    "community_owner" uuid
);


alter table "public"."community_classes" enable row level security;

create table "public"."event_chat" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "event_id" bigint not null
);


alter table "public"."event_chat" enable row level security;

create table "public"."event_messages" (
    "id" uuid not null default gen_random_uuid(),
    "sent_at" timestamp with time zone not null default now(),
    "event_id" bigint not null,
    "event_chat" uuid not null default gen_random_uuid(),
    "message" text default ''::text,
    "sender_id" uuid not null default gen_random_uuid(),
    "sender_name" text not null default ''::text,
    "image" text,
    "sender_profile_pic" text
);


alter table "public"."event_messages" enable row level security;

create table "public"."event_waitlist" (
    "id" uuid not null default gen_random_uuid(),
    "waitlist_joined" timestamp with time zone not null default now(),
    "user_id" uuid default gen_random_uuid(),
    "event_id" bigint not null,
    "first_name" text not null,
    "last_name" text not null default ''::text
);


alter table "public"."event_waitlist" enable row level security;

alter table "public"."communities" add column "community_tags" text[];

alter table "public"."events" add column "event_tags" text[];

CREATE UNIQUE INDEX community_class_schedule_pkey ON public.community_class_schedule USING btree (id);

CREATE UNIQUE INDEX community_classes_pkey ON public.community_classes USING btree (id);

CREATE UNIQUE INDEX event_chat_event_id_key ON public.event_chat USING btree (event_id);

CREATE UNIQUE INDEX event_chat_pkey ON public.event_chat USING btree (id);

CREATE UNIQUE INDEX event_messages_pkey ON public.event_messages USING btree (id);

CREATE UNIQUE INDEX event_waitlist_pkey ON public.event_waitlist USING btree (id);

CREATE INDEX eventhost ON public.events USING btree (event_host);

alter table "public"."community_class_schedule" add constraint "community_class_schedule_pkey" PRIMARY KEY using index "community_class_schedule_pkey";

alter table "public"."community_classes" add constraint "community_classes_pkey" PRIMARY KEY using index "community_classes_pkey";

alter table "public"."event_chat" add constraint "event_chat_pkey" PRIMARY KEY using index "event_chat_pkey";

alter table "public"."event_messages" add constraint "event_messages_pkey" PRIMARY KEY using index "event_messages_pkey";

alter table "public"."event_waitlist" add constraint "event_waitlist_pkey" PRIMARY KEY using index "event_waitlist_pkey";

alter table "public"."community_class_schedule" add constraint "public_community_class_schedule_class_id_fkey" FOREIGN KEY (class_id) REFERENCES community_classes(id) ON DELETE CASCADE not valid;

alter table "public"."community_class_schedule" validate constraint "public_community_class_schedule_class_id_fkey";

alter table "public"."community_class_schedule" add constraint "public_community_class_schedule_community_id_fkey" FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE not valid;

alter table "public"."community_class_schedule" validate constraint "public_community_class_schedule_community_id_fkey";

alter table "public"."community_class_schedule" add constraint "public_community_class_schedule_community_owner_fkey" FOREIGN KEY (community_owner) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."community_class_schedule" validate constraint "public_community_class_schedule_community_owner_fkey";

alter table "public"."community_classes" add constraint "public_community_classes_community_id_fkey" FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE not valid;

alter table "public"."community_classes" validate constraint "public_community_classes_community_id_fkey";

alter table "public"."community_classes" add constraint "public_community_classes_community_owner_fkey" FOREIGN KEY (community_owner) REFERENCES profiles(id) not valid;

alter table "public"."community_classes" validate constraint "public_community_classes_community_owner_fkey";

alter table "public"."event_chat" add constraint "event_chat_event_id_key" UNIQUE using index "event_chat_event_id_key";

alter table "public"."event_chat" add constraint "public_event_chat_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_chat" validate constraint "public_event_chat_event_id_fkey";

alter table "public"."event_messages" add constraint "public_event_messages_event_chat_fkey" FOREIGN KEY (event_chat) REFERENCES event_chat(id) ON DELETE CASCADE not valid;

alter table "public"."event_messages" validate constraint "public_event_messages_event_chat_fkey";

alter table "public"."event_messages" add constraint "public_event_messages_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_messages" validate constraint "public_event_messages_event_id_fkey";

alter table "public"."event_messages" add constraint "public_event_messages_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."event_messages" validate constraint "public_event_messages_sender_id_fkey";

alter table "public"."event_waitlist" add constraint "public_event_waitlist_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."event_waitlist" validate constraint "public_event_waitlist_event_id_fkey";

alter table "public"."event_waitlist" add constraint "public_event_waitlist_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."event_waitlist" validate constraint "public_event_waitlist_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_compatible_communities(user_id uuid)
 RETURNS TABLE(id bigint, community_title text, community_tags text[], community_profile_pic text, compatibility_score numeric)
 LANGUAGE plpgsql
AS $function$BEGIN
    RETURN QUERY
    SELECT 
        c.id, 
        c.community_title, 
        c.community_tags, 
        c.community_profile_pic,
        -- Example of compatibility score calculation
        (SELECT COUNT(*) FROM unnest(c.community_tags) tag WHERE tag = ANY(p.activities))::NUMERIC / NULLIF(array_length(p.activities, 1), 0) * 100 AS compatibility_score
    FROM communities c
    JOIN profiles p ON p.id = user_id -- Compare profile tags with community tags
    ORDER BY compatibility_score DESC;
END;$function$
;

CREATE OR REPLACE FUNCTION public.get_compatible_events(user_id uuid)
 RETURNS TABLE(id bigint, event_title text, event_tags text[], event_cover_photo text, date timestamp without time zone, price numeric, compatibility_score numeric)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        e.id, 
        e.event_title, 
        e.event_tags, 
        e.event_cover_photo,
        e.date::TIMESTAMP,
        e.price,
        -- Example of compatibility score calculation
        (SELECT COUNT(*) FROM unnest(e.event_tags) tag WHERE tag = ANY(p.activities))::NUMERIC / NULLIF(array_length(p.activities, 1), 0) * 100 AS compatibility_score
    FROM events e
    JOIN profiles p ON p.id = user_id -- Compare profile tags with community tags
    ORDER BY compatibility_score DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.promote_next_waitlist_user(p_event_id bigint)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  next_user RECORD;
BEGIN
  -- Find the next user on the waitlist for the event
  SELECT ew.user_id, p.first_name
  INTO next_user
  FROM public.event_waitlist ew
  JOIN public.profiles p ON ew.user_id = p.id
  WHERE ew.event_id = p_event_id
  ORDER BY ew.waitlist_joined
  LIMIT 1;

  IF next_user IS NOT NULL THEN
    -- Add the user to the event's participants
    INSERT INTO public.events_users (event_id, user_id, first_name)
    VALUES (p_event_id, next_user.user_id, next_user.first_name);

    -- Remove the user from the waitlist
    DELETE FROM public.event_waitlist ew
    WHERE ew.event_id = p_event_id AND ew.user_id = next_user.user_id;

    -- Return the user_id of the promoted user
    RETURN next_user.user_id;
  ELSE
    -- No user was promoted, return NULL
    RETURN NULL;
  END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.promote_next_waitlist_user_return_token(p_event_id bigint)
 RETURNS TABLE(user_id uuid, expo_push_token text)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  next_user RECORD;
BEGIN
  -- Find the next user on the waitlist for the event
  SELECT ew.user_id, p.first_name, p.last_name, p.expo_push_token
  INTO next_user
  FROM public.event_waitlist ew
  JOIN public.profiles p ON ew.user_id = p.id
  WHERE ew.event_id = p_event_id
  ORDER BY ew.waitlist_joined
  LIMIT 1;

  IF next_user IS NOT NULL THEN
    -- Add the user to the event's participants
    INSERT INTO public.events_users (event_id, user_id, first_name, last_name)
    VALUES (p_event_id, next_user.user_id, next_user.first_name, next_user.last_name);

    -- Remove the user from the waitlist
    DELETE FROM public.event_waitlist ew
    WHERE ew.event_id = p_event_id AND ew.user_id = next_user.user_id;

    -- Return the desired data
    RETURN QUERY SELECT next_user.user_id, next_user.expo_push_token;
  END IF;
END;
$function$
;

grant delete on table "public"."community_class_schedule" to "anon";

grant insert on table "public"."community_class_schedule" to "anon";

grant references on table "public"."community_class_schedule" to "anon";

grant select on table "public"."community_class_schedule" to "anon";

grant trigger on table "public"."community_class_schedule" to "anon";

grant truncate on table "public"."community_class_schedule" to "anon";

grant update on table "public"."community_class_schedule" to "anon";

grant delete on table "public"."community_class_schedule" to "authenticated";

grant insert on table "public"."community_class_schedule" to "authenticated";

grant references on table "public"."community_class_schedule" to "authenticated";

grant select on table "public"."community_class_schedule" to "authenticated";

grant trigger on table "public"."community_class_schedule" to "authenticated";

grant truncate on table "public"."community_class_schedule" to "authenticated";

grant update on table "public"."community_class_schedule" to "authenticated";

grant delete on table "public"."community_class_schedule" to "service_role";

grant insert on table "public"."community_class_schedule" to "service_role";

grant references on table "public"."community_class_schedule" to "service_role";

grant select on table "public"."community_class_schedule" to "service_role";

grant trigger on table "public"."community_class_schedule" to "service_role";

grant truncate on table "public"."community_class_schedule" to "service_role";

grant update on table "public"."community_class_schedule" to "service_role";

grant delete on table "public"."community_classes" to "anon";

grant insert on table "public"."community_classes" to "anon";

grant references on table "public"."community_classes" to "anon";

grant select on table "public"."community_classes" to "anon";

grant trigger on table "public"."community_classes" to "anon";

grant truncate on table "public"."community_classes" to "anon";

grant update on table "public"."community_classes" to "anon";

grant delete on table "public"."community_classes" to "authenticated";

grant insert on table "public"."community_classes" to "authenticated";

grant references on table "public"."community_classes" to "authenticated";

grant select on table "public"."community_classes" to "authenticated";

grant trigger on table "public"."community_classes" to "authenticated";

grant truncate on table "public"."community_classes" to "authenticated";

grant update on table "public"."community_classes" to "authenticated";

grant delete on table "public"."community_classes" to "service_role";

grant insert on table "public"."community_classes" to "service_role";

grant references on table "public"."community_classes" to "service_role";

grant select on table "public"."community_classes" to "service_role";

grant trigger on table "public"."community_classes" to "service_role";

grant truncate on table "public"."community_classes" to "service_role";

grant update on table "public"."community_classes" to "service_role";

grant delete on table "public"."event_chat" to "anon";

grant insert on table "public"."event_chat" to "anon";

grant references on table "public"."event_chat" to "anon";

grant select on table "public"."event_chat" to "anon";

grant trigger on table "public"."event_chat" to "anon";

grant truncate on table "public"."event_chat" to "anon";

grant update on table "public"."event_chat" to "anon";

grant delete on table "public"."event_chat" to "authenticated";

grant insert on table "public"."event_chat" to "authenticated";

grant references on table "public"."event_chat" to "authenticated";

grant select on table "public"."event_chat" to "authenticated";

grant trigger on table "public"."event_chat" to "authenticated";

grant truncate on table "public"."event_chat" to "authenticated";

grant update on table "public"."event_chat" to "authenticated";

grant delete on table "public"."event_chat" to "service_role";

grant insert on table "public"."event_chat" to "service_role";

grant references on table "public"."event_chat" to "service_role";

grant select on table "public"."event_chat" to "service_role";

grant trigger on table "public"."event_chat" to "service_role";

grant truncate on table "public"."event_chat" to "service_role";

grant update on table "public"."event_chat" to "service_role";

grant delete on table "public"."event_messages" to "anon";

grant insert on table "public"."event_messages" to "anon";

grant references on table "public"."event_messages" to "anon";

grant select on table "public"."event_messages" to "anon";

grant trigger on table "public"."event_messages" to "anon";

grant truncate on table "public"."event_messages" to "anon";

grant update on table "public"."event_messages" to "anon";

grant delete on table "public"."event_messages" to "authenticated";

grant insert on table "public"."event_messages" to "authenticated";

grant references on table "public"."event_messages" to "authenticated";

grant select on table "public"."event_messages" to "authenticated";

grant trigger on table "public"."event_messages" to "authenticated";

grant truncate on table "public"."event_messages" to "authenticated";

grant update on table "public"."event_messages" to "authenticated";

grant delete on table "public"."event_messages" to "service_role";

grant insert on table "public"."event_messages" to "service_role";

grant references on table "public"."event_messages" to "service_role";

grant select on table "public"."event_messages" to "service_role";

grant trigger on table "public"."event_messages" to "service_role";

grant truncate on table "public"."event_messages" to "service_role";

grant update on table "public"."event_messages" to "service_role";

grant delete on table "public"."event_waitlist" to "anon";

grant insert on table "public"."event_waitlist" to "anon";

grant references on table "public"."event_waitlist" to "anon";

grant select on table "public"."event_waitlist" to "anon";

grant trigger on table "public"."event_waitlist" to "anon";

grant truncate on table "public"."event_waitlist" to "anon";

grant update on table "public"."event_waitlist" to "anon";

grant delete on table "public"."event_waitlist" to "authenticated";

grant insert on table "public"."event_waitlist" to "authenticated";

grant references on table "public"."event_waitlist" to "authenticated";

grant select on table "public"."event_waitlist" to "authenticated";

grant trigger on table "public"."event_waitlist" to "authenticated";

grant truncate on table "public"."event_waitlist" to "authenticated";

grant update on table "public"."event_waitlist" to "authenticated";

grant delete on table "public"."event_waitlist" to "service_role";

grant insert on table "public"."event_waitlist" to "service_role";

grant references on table "public"."event_waitlist" to "service_role";

grant select on table "public"."event_waitlist" to "service_role";

grant trigger on table "public"."event_waitlist" to "service_role";

grant truncate on table "public"."event_waitlist" to "service_role";

grant update on table "public"."event_waitlist" to "service_role";

create policy "Enable insert for authenticated users only"
on "public"."community_class_schedule"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."community_class_schedule"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on email"
on "public"."community_class_schedule"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = community_owner))
with check ((( SELECT auth.uid() AS uid) = community_owner));


create policy "Enable insert for authenticated users only"
on "public"."community_classes"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."community_classes"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on id"
on "public"."community_classes"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = community_owner))
with check ((( SELECT auth.uid() AS uid) = community_owner));


create policy "Enable insert for authenticated users only"
on "public"."event_messages"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."event_messages"
as permissive
for select
to public
using (true);


create policy "Enable delete for users based on user_id"
on "public"."event_waitlist"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for authenticated users only"
on "public"."event_waitlist"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."event_waitlist"
as permissive
for select
to public
using (true);


create policy "Enable select and update for users based on user1 or user2"
on "public"."chat_sessions"
as permissive
for all
to public
using (( SELECT ((chat_sessions.user1 = auth.uid()) OR (chat_sessions.user2 = auth.uid()))))
with check (( SELECT ((chat_sessions.user1 = auth.uid()) OR (chat_sessions.user2 = auth.uid()))));


create policy "Update Community"
on "public"."communities"
as permissive
for update
to authenticated
using (( SELECT ( SELECT (( SELECT auth.uid() AS uid) = communities.community_owner))));


create policy "Enable delete for users based on user_id"
on "public"."community_channel_membership"
as permissive
for delete
to public
using (( SELECT (( SELECT auth.uid() AS uid) = community_channel_membership.user_id)));


create policy "Enable delete for users based on user_id"
on "public"."community_requests"
as permissive
for delete
to authenticated
using (( SELECT ( SELECT true)));


create policy "Enable delete for users based on user_id"
on "public"."events"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = event_host));

alter table "public"."communities" add column "classes" boolean not null default false;

alter table "public"."community_channel_messages" drop column "sender_profile_pic";

alter table "public"."event_chat" add column "event_chat_name" text not null default ''::text;

alter table "public"."event_chat" add column "event_creator" uuid not null;

alter table "public"."event_chat" add column "recent_message" text;

alter table "public"."event_chat" add column "recent_sender_name" text;

alter table "public"."event_chat" add column "updated_at" timestamp with time zone;

alter table "public"."events" add column "event_chat" uuid;

alter table "public"."events_users" add column "event_chat" uuid;

alter table "public"."events_users" add column "expo_push_token" text;

alter table "public"."messages" drop column "sender_profile_pic";

alter table "public"."news_posts" add column "author_profile_pic" text;

alter table "public"."news_posts" add column "event_link" bigint;

alter table "public"."news_posts" add column "likes" text[];

alter table "public"."news_posts" add column "news_image" text;

alter table "public"."event_chat" add constraint "public_event_chat_event_creator_fkey" FOREIGN KEY (event_creator) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."event_chat" validate constraint "public_event_chat_event_creator_fkey";

alter table "public"."events" add constraint "public_events_event_chat_fkey" FOREIGN KEY (event_chat) REFERENCES event_chat(id) not valid;

alter table "public"."events" validate constraint "public_events_event_chat_fkey";

alter table "public"."events_users" add constraint "public_events_users_event_chat_fkey" FOREIGN KEY (event_chat) REFERENCES event_chat(id) not valid;

alter table "public"."events_users" validate constraint "public_events_users_event_chat_fkey";

alter table "public"."news_posts" add constraint "public_news_posts_event_link_fkey" FOREIGN KEY (event_link) REFERENCES events(id) ON DELETE CASCADE not valid;

alter table "public"."news_posts" validate constraint "public_news_posts_event_link_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_compatible_communities(user_id uuid)
 RETURNS TABLE(id bigint, community_title text, community_tags text[], community_profile_pic text, compatibility_score numeric)
 LANGUAGE plpgsql
AS $function$BEGIN
    RETURN QUERY
    SELECT 
        c.id, 
        c.community_title, 
        c.community_tags, 
        c.community_profile_pic,
        -- Example of compatibility score calculation
        (SELECT COUNT(*) FROM unnest(c.community_tags) tag WHERE tag = ANY(p.activities))::NUMERIC / NULLIF(array_length(p.activities, 1), 0) * 500 AS compatibility_score
    FROM communities c
    JOIN profiles p ON p.id = user_id -- Compare profile tags with community tags
    ORDER BY compatibility_score DESC;
END;$function$
;

CREATE OR REPLACE FUNCTION public.get_compatible_events(user_id uuid)
 RETURNS TABLE(id bigint, event_title text, event_tags text[], event_cover_photo text, date timestamp without time zone, price numeric, compatibility_score numeric)
 LANGUAGE plpgsql
AS $function$BEGIN
    RETURN QUERY
    SELECT 
        e.id, 
        e.event_title, 
        e.event_tags, 
        e.event_cover_photo,
        e.date::TIMESTAMP,
        e.price,
        -- Example of compatibility score calculation
        (SELECT COUNT(*) FROM unnest(e.event_tags) tag WHERE tag = ANY(p.activities))::NUMERIC / NULLIF(array_length(p.activities, 1), 0) * 500 AS compatibility_score
    FROM events e
    JOIN profiles p ON p.id = user_id -- Compare profile tags with community tags
    ORDER BY compatibility_score DESC;
END;$function$
;

create policy "Enable insert for authenticated users only"
on "public"."event_chat"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."event_chat"
as permissive
for select
to public
using (true);


create policy "event recent message update"
on "public"."event_chat"
as permissive
for update
to public
using (true);


create policy "update"
on "public"."news_posts"
as permissive
for update
to public
using (true);