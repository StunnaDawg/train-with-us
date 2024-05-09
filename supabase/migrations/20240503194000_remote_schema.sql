alter table "public"."events_users" add column "first_name" text;

alter table "public"."events_users" add column "last_name" text;

alter table "public"."events" add column "community_host_name" text;

create policy "Enable insert for authenticated users only"
on "public"."events_users"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."events_users"
as permissive
for select
to public
using (true);