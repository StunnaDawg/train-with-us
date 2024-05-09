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

drop policy "Enable insert for authenticated users only" on "public"."events";

create policy "Enable delete for users based on user_id"
on "public"."events"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = event_host));


create policy "Enable insert for users based on user_id"
on "public"."events"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = event_host));


create policy "event update"
on "public"."events"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = event_host));