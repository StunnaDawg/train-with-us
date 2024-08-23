CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


create policy "Anyone can upload an avatar."
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'photos'::text));


create policy "Avatar images are publicly accessible."
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'photos'::text));


create policy "Enable storage access for users based on user_id"
on "storage"."objects"
as permissive
for all
to public
using (((bucket_id = 'photos'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])))
with check (((bucket_id = 'photos'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));