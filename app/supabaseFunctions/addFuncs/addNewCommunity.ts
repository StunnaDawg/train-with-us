import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"

const addNewCommunity = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  communityName: string,
  communityOwner: string,
  communityStyle: number,
  communityAbout: string
) => {
  try {
    setLoading(true)
    const { error } = await supabase.from("community").insert([
      {
        community_title: communityName,
        community_host: communityOwner,
        created_at: new Date(),
        community_style: communityStyle,
        community_about: communityAbout,
      },
    ])

    if (error) throw error
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default addNewCommunity
