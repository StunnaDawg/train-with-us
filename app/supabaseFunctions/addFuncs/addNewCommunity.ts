import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"

const addNewCommunity = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  communityName: string,
  communityOwner: string,
  communityStyle: string
) => {
  try {
    setLoading(true)
    const { error } = await supabase.from("communities").insert([
      {
        community_title: communityName,
        community_owner: communityOwner,
        created_at: new Date(),
        community_style: communityStyle,
      },
    ])

    if (error) throw error
    console.log("Community added")
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default addNewCommunity
