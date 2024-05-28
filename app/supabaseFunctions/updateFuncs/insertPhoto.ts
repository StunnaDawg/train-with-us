import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { Communities } from "../../@types/supabaseTypes"
import { da } from "date-fns/locale"

const insertPhoto = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  photoUrl: string,
  userId: string | number,
  tableName: string,
  arrayColumn: string
) => {
  try {
    setLoading(true)

    const { data, error: currentArrayError } = (await supabase
      .from(tableName)
      .select(arrayColumn)
      .eq("id", userId)
      .single()) as { data: Communities; error: any }

    if (currentArrayError) throw currentArrayError

    const currentArray = data?.community_photos

    const { data: photoPath } = supabase.storage
      .from("photos")
      .getPublicUrl(photoUrl)

    console.log("photoPath", photoPath)

    const newArray = [...(currentArray || []), photoUrl]

    console.log("id in insert", userId)

    const { error } = await supabase
      .from(tableName)
      .upsert({ id: userId, [arrayColumn]: newArray })

    if (error) throw error

    console.log("Photo inserted successfully")
  } catch (error) {
    console.error("Failed to insert photo:", error)
  } finally {
    setLoading(false)
  }
}

export default insertPhoto
