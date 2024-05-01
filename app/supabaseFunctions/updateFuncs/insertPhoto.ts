import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"

const insertPhoto = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  currentArray: string[] | null | undefined,
  photoUrl: string,
  userId: string,
  tableName: string,
  arrayColumn: string
) => {
  try {
    setLoading(true)

    const { data: photoPath } = supabase.storage
      .from("photos")
      .getPublicUrl(photoUrl)

    console.log("photoPath", photoPath)

    const newArray = [...(currentArray || []), photoUrl]

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
