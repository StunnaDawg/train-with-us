import { decode } from "base64-arraybuffer"
import supabase from "../../../lib/supabase"

export const uploadImage = async (imageFile: string) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(imageFile, decode("base64FileData"), {
      contentType: "image/png",
    })

  data
}
