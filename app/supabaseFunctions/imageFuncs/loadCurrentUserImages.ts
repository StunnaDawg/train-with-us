import { Dispatch, SetStateAction } from "react"
import { User } from "@supabase/supabase-js"
import { FileObject } from "@supabase/storage-js"
import supabase from "../../../lib/supabase"

const loadCurrentUsersImages = async (
  setFiles: Dispatch<SetStateAction<FileObject[]>>,
  user: User | null | undefined,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const { data } = await supabase.storage.from("photos").list(user!.id)
    if (data) {
      setFiles(data)
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default loadCurrentUsersImages
