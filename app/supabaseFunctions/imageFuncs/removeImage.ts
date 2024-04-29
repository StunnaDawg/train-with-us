import supabase from "../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"

const onRemoveImage = async (item: FileObject, userId: string) => {
  supabase.storage.from("files").remove([`${userId}/${item.name}`])
}

export default onRemoveImage
