create extension if not exists "pg_jsonschema" with schema "extensions";


drop policy "Enable insert for users based on user_id" on "public"."community_channels";

drop policy "update_community_channels" on "public"."community_channels";

alter table "public"."events_users" drop constraint "events_users_event_id_fkey";

alter table "public"."events_users" drop constraint "events_users_user_id_fkey";

create table "public"."community_channel_membership" (
    "user_id" uuid not null default gen_random_uuid(),
    "channel_id" uuid not null default gen_random_uuid(),
    "muted" boolean default false,
    "expo_push_token" text,
    "community_id" bigint not null
);


alter table "public"."community_channel_membership" enable row level security;

create table "public"."connection_requests" (
    "requester" uuid not null default gen_random_uuid(),
    "requested" uuid not null default gen_random_uuid(),
    "request_sent" timestamp with time zone default now(),
    "message" text not null default 'Hello'::text
);


alter table "public"."connection_requests" enable row level security;

create table "public"."news_posts" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "title" text default 'Title'::text,
    "content" text not null default 'No Content'::text,
    "author" uuid not null,
    "community_id" bigint not null,
    "author_name" text not null default ''::text
);


alter table "public"."news_posts" enable row level security;

alter table "public"."chat_sessions" add column "user1_read" boolean not null default false;

alter table "public"."chat_sessions" add column "user2_read" boolean not null default false;

alter table "public"."communities" add column "public_community" boolean not null default false;

alter table "public"."community_channels" add column "members_of_channel" uuid[];

alter table "public"."community_channels" add column "private" boolean not null default false;

alter table "public"."events" add column "event_limit" numeric default '20'::numeric;

alter table "public"."events" add column "public_event" boolean not null default true;

alter table "public"."messages" add column "community_id" bigint;

CREATE UNIQUE INDEX community_channel_membership_pkey ON public.community_channel_membership USING btree (community_id, user_id, channel_id);

CREATE UNIQUE INDEX connection_requests_pkey ON public.connection_requests USING btree (requester, requested);

CREATE UNIQUE INDEX news_posts_pkey ON public.news_posts USING btree (id);

alter table "public"."community_channel_membership" add constraint "community_channel_membership_pkey" PRIMARY KEY using index "community_channel_membership_pkey";

alter table "public"."connection_requests" add constraint "connection_requests_pkey" PRIMARY KEY using index "connection_requests_pkey";

alter table "public"."news_posts" add constraint "news_posts_pkey" PRIMARY KEY using index "news_posts_pkey";

alter table "public"."community_channel_membership" add constraint "public_community_channel_membership_channel_id_fkey" FOREIGN KEY (channel_id) REFERENCES community_channels(id) ON DELETE CASCADE not valid;

alter table "public"."community_channel_membership" validate constraint "public_community_channel_membership_channel_id_fkey";

alter table "public"."community_channel_membership" add constraint "public_community_channel_membership_community_id_fkey" FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE not valid;

alter table "public"."community_channel_membership" validate constraint "public_community_channel_membership_community_id_fkey";

alter table "public"."community_channel_membership" add constraint "public_community_channel_membership_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."community_channel_membership" validate constraint "public_community_channel_membership_user_id_fkey";

alter table "public"."connection_requests" add constraint "public_connection_requests_requested_fkey" FOREIGN KEY (requested) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."connection_requests" validate constraint "public_connection_requests_requested_fkey";

alter table "public"."connection_requests" add constraint "public_connection_requests_requester_fkey" FOREIGN KEY (requester) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."connection_requests" validate constraint "public_connection_requests_requester_fkey";

alter table "public"."events_users" add constraint "public_events_users_event_id_fkey" FOREIGN KEY (event_id) REFERENCES events(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."events_users" validate constraint "public_events_users_event_id_fkey";

alter table "public"."events_users" add constraint "public_events_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."events_users" validate constraint "public_events_users_user_id_fkey";

alter table "public"."messages" add constraint "public_messages_community_id_fkey" FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "public_messages_community_id_fkey";

alter table "public"."news_posts" add constraint "public_news_posts_author_fkey" FOREIGN KEY (author) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."news_posts" validate constraint "public_news_posts_author_fkey";

alter table "public"."news_posts" add constraint "public_news_posts_community_id_fkey" FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE not valid;

alter table "public"."news_posts" validate constraint "public_news_posts_community_id_fkey";

grant delete on table "public"."community_channel_membership" to "anon";

grant insert on table "public"."community_channel_membership" to "anon";

grant references on table "public"."community_channel_membership" to "anon";

grant select on table "public"."community_channel_membership" to "anon";

grant trigger on table "public"."community_channel_membership" to "anon";

grant truncate on table "public"."community_channel_membership" to "anon";

grant update on table "public"."community_channel_membership" to "anon";

grant delete on table "public"."community_channel_membership" to "authenticated";

grant insert on table "public"."community_channel_membership" to "authenticated";

grant references on table "public"."community_channel_membership" to "authenticated";

grant select on table "public"."community_channel_membership" to "authenticated";

grant trigger on table "public"."community_channel_membership" to "authenticated";

grant truncate on table "public"."community_channel_membership" to "authenticated";

grant update on table "public"."community_channel_membership" to "authenticated";

grant delete on table "public"."community_channel_membership" to "service_role";

grant insert on table "public"."community_channel_membership" to "service_role";

grant references on table "public"."community_channel_membership" to "service_role";

grant select on table "public"."community_channel_membership" to "service_role";

grant trigger on table "public"."community_channel_membership" to "service_role";

grant truncate on table "public"."community_channel_membership" to "service_role";

grant update on table "public"."community_channel_membership" to "service_role";

grant delete on table "public"."connection_requests" to "anon";

grant insert on table "public"."connection_requests" to "anon";

grant references on table "public"."connection_requests" to "anon";

grant select on table "public"."connection_requests" to "anon";

grant trigger on table "public"."connection_requests" to "anon";

grant truncate on table "public"."connection_requests" to "anon";

grant update on table "public"."connection_requests" to "anon";

grant delete on table "public"."connection_requests" to "authenticated";

grant insert on table "public"."connection_requests" to "authenticated";

grant references on table "public"."connection_requests" to "authenticated";

grant select on table "public"."connection_requests" to "authenticated";

grant trigger on table "public"."connection_requests" to "authenticated";

grant truncate on table "public"."connection_requests" to "authenticated";

grant update on table "public"."connection_requests" to "authenticated";

grant delete on table "public"."connection_requests" to "service_role";

grant insert on table "public"."connection_requests" to "service_role";

grant references on table "public"."connection_requests" to "service_role";

grant select on table "public"."connection_requests" to "service_role";

grant trigger on table "public"."connection_requests" to "service_role";

grant truncate on table "public"."connection_requests" to "service_role";

grant update on table "public"."connection_requests" to "service_role";

grant delete on table "public"."news_posts" to "anon";

grant insert on table "public"."news_posts" to "anon";

grant references on table "public"."news_posts" to "anon";

grant select on table "public"."news_posts" to "anon";

grant trigger on table "public"."news_posts" to "anon";

grant truncate on table "public"."news_posts" to "anon";

grant update on table "public"."news_posts" to "anon";

grant delete on table "public"."news_posts" to "authenticated";

grant insert on table "public"."news_posts" to "authenticated";

grant references on table "public"."news_posts" to "authenticated";

grant select on table "public"."news_posts" to "authenticated";

grant trigger on table "public"."news_posts" to "authenticated";

grant truncate on table "public"."news_posts" to "authenticated";

grant update on table "public"."news_posts" to "authenticated";

grant delete on table "public"."news_posts" to "service_role";

grant insert on table "public"."news_posts" to "service_role";

grant references on table "public"."news_posts" to "service_role";

grant select on table "public"."news_posts" to "service_role";

grant trigger on table "public"."news_posts" to "service_role";

grant truncate on table "public"."news_posts" to "service_role";

grant update on table "public"."news_posts" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."community_channel_membership"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for authenticated users only"
on "public"."community_channel_membership"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."community_channel_membership"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on email"
on "public"."community_channel_membership"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for authenticated users only"
on "public"."community_channels"
as permissive
for insert
to authenticated
with check (true);


create policy "update recent message"
on "public"."community_channels"
as permissive
for update
to public
using (true);


create policy "Enable delete for users based on user_id"
on "public"."connection_requests"
as permissive
for delete
to public
using (((auth.uid() = requester) OR (auth.uid() = requested)));


create policy "Enable insert for authenticated users only"
on "public"."connection_requests"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."connection_requests"
as permissive
for select
to public
using (true);


create policy "Enable delete for users based on user_id"
on "public"."news_posts"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = author));


create policy "Enable insert for authenticated users only"
on "public"."news_posts"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."news_posts"
as permissive
for select
to public
using (true);



