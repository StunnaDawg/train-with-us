import { Dispatch, SetStateAction } from "react"
import { User } from "@supabase/supabase-js"
import { FileObject } from "@supabase/storage-js"
import supabase from "../../../lib/supabase"

const loadOtherUsersImages = async (
  setFiles: Dispatch<SetStateAction<FileObject[]>>,
  userId: string,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const { data } = await supabase.storage.from("photos").list(userId)
    if (data) {
      setFiles(data)
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default loadOtherUsersImages
