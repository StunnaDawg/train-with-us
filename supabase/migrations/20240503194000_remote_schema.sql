create table "public"."community_channel_messages" (
    "id" uuid not null default gen_random_uuid(),
    "sent_at" timestamp with time zone not null default now(),
    "mesage" text default ''::text,
    "sender_id" uuid default gen_random_uuid(),
    "channel_id" uuid default gen_random_uuid()
);


alter table "public"."community_channel_messages" enable row level security;

alter table "public"."profiles" add column "pinned_channels" uuid[];

CREATE UNIQUE INDEX community_channel_messages_pkey ON public.community_channel_messages USING btree (id);

alter table "public"."community_channel_messages" add constraint "community_channel_messages_pkey" PRIMARY KEY using index "community_channel_messages_pkey";

alter table "public"."community_channel_messages" add constraint "public_community_channel_messages_channel_id_fkey" FOREIGN KEY (channel_id) REFERENCES community_channels(id) ON DELETE CASCADE not valid;

alter table "public"."community_channel_messages" validate constraint "public_community_channel_messages_channel_id_fkey";

alter table "public"."community_channel_messages" add constraint "public_community_channel_messages_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."community_channel_messages" validate constraint "public_community_channel_messages_sender_id_fkey";

grant delete on table "public"."community_channel_messages" to "anon";

grant insert on table "public"."community_channel_messages" to "anon";

grant references on table "public"."community_channel_messages" to "anon";

grant select on table "public"."community_channel_messages" to "anon";

grant trigger on table "public"."community_channel_messages" to "anon";

grant truncate on table "public"."community_channel_messages" to "anon";

grant update on table "public"."community_channel_messages" to "anon";

grant delete on table "public"."community_channel_messages" to "authenticated";

grant insert on table "public"."community_channel_messages" to "authenticated";

grant references on table "public"."community_channel_messages" to "authenticated";

grant select on table "public"."community_channel_messages" to "authenticated";

grant trigger on table "public"."community_channel_messages" to "authenticated";

grant truncate on table "public"."community_channel_messages" to "authenticated";

grant update on table "public"."community_channel_messages" to "authenticated";

grant delete on table "public"."community_channel_messages" to "service_role";

grant insert on table "public"."community_channel_messages" to "service_role";

grant references on table "public"."community_channel_messages" to "service_role";

grant select on table "public"."community_channel_messages" to "service_role";

grant trigger on table "public"."community_channel_messages" to "service_role";

grant truncate on table "public"."community_channel_messages" to "service_role";

grant update on table "public"."community_channel_messages" to "service_role";

create policy "Enable read access for all users"
on "public"."community_channel_messages"
as permissive
for select
to public
using (true);