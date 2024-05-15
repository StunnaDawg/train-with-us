import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import { id } from "date-fns/locale"

const updateSingleCommunityTrait = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  communityId: number,
  row: string,
  value: string | number | Date
) => {
  try {
    console.log("updating on event", communityId, row, value)
    setLoading(true)
    const { error } = await supabase
      .from("communities")
      .update({ [row]: value })
      .eq("id", communityId)

    if (error) throw error
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default updateSingleCommunityTrait
