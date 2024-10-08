import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Communities } from "../../@types/supabaseTypes"

const insertCommunityPhoto = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  photoUrl: string,
  userId: string | number
) => {
  try {
    setLoading(true)

    const { data, error: currentArrayError } = (await supabase
      .from("communities")
      .select("community_photos")
      .eq("id", userId)
      .single()) as { data: Communities; error: any }

    if (currentArrayError) throw currentArrayError

    const currentArray = data.community_photos

    const { data: photoPath } = supabase.storage
      .from("photos")
      .getPublicUrl(photoUrl)

    console.log("photoPath", photoPath)

    const newArray = [...(currentArray || []), photoUrl]

    console.log("id in insert", userId)

    const { error } = await supabase
      .from("communities")
      .upsert({ id: userId, ["community_photos"]: newArray })

    if (error) throw error

    console.log("Photo inserted successfully")
  } catch (error) {
    console.error("Failed to insert photo:", error)
  } finally {
    setLoading(false)
  }
}

export default insertCommunityPhoto
