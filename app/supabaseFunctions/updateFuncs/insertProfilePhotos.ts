import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Communities, Profile } from "../../@types/supabaseTypes"

const insertProfilePhoto = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  photoUrl: string,
  userId: string | number
) => {
  try {
    setLoading(true)
    console.log("photoUrl", photoUrl, userId)
    const { data, error: currentArrayError } = (await supabase
      .from("profiles")
      .select("photos_url")
      .eq("id", userId)
      .single()) as { data: Profile; error: any }

    if (currentArrayError) throw currentArrayError

    const currentArray = data.photos_url

    const { data: photoPath } = supabase.storage
      .from("photos")
      .getPublicUrl(photoUrl)

    console.log("photoPath", photoPath)

    const newArray = [...(currentArray || []), photoUrl]

    console.log("id in insert", userId)

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: userId, ["photos_url"]: newArray })

    if (error) throw error

    console.log("Photo inserted successfully")
  } catch (error) {
    console.error("Failed to insert photo:", error)
  } finally {
    setLoading(false)
  }
}

export default insertProfilePhoto
