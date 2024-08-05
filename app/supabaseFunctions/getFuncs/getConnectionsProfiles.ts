import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import getConnectedIgnoredProfiles from "./getConnectedIgnoredProfiles"
import { Profile } from "../../@types/supabaseTypes"

function shuffleArray(array: any[]) {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

const getConnectionProfiles = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  userId: string,
  appendProfiles: (newProfiles: Profile[]) => void,
  offSet: number
) => {
  try {
    const PAGE_COUNT = 10
    const from = offSet * PAGE_COUNT
    const to = from + PAGE_COUNT - 1
    setLoading(true)
    const connections = await getConnectedIgnoredProfiles(userId)

    console.log("Connections", connections)
    const { data: profiles, error: rpcError } = await supabase
      .from("profiles")
      .select("*")
      .neq("id", userId)
      .range(from, to)

    // const { data: profiles, error: rpcError } = await supabase.rpc(
    //   "get_profiles_with_min_urls",
    //   {
    //     user_id: userId,
    //   }
    // )

    if (rpcError) {
      throw rpcError
    }

    let filteredProfiles = profiles.filter(
      (profile: Profile) => profile.id !== userId
    )

    if (connections) {
      const excludeIds = new Set(connections)
      console.log("Exclude ids", excludeIds)

      filteredProfiles = filteredProfiles.filter(
        (profile: Profile) => !excludeIds.has(profile.id)
      )
    }

    const fakeProfile: Profile = {
      id: "fake",
      first_name: "fake",
      last_name: "fake",
      profile_pic: "fake",
      about: "fake",
      activities: ["fake"],
      hobbies: "Yersinia pestis",
      actvitiy_time: null,
      allowed_create_community: false,
      birthday: null,
      bucket_list: null,
      city: "Halifax",
      community_created: null,
      community_preference: null,

      created_at: null,
      expo_push_token: null,
      fitness_goals: null,
      fitness_lvl: null,
      fitness_records: null,
      gender: null,
      ignored_users: null,
      intentions: null,
      music_pref: null,
      onboard: false,
      photos_url: null,
      pinned_channels: null,
      primary_gym: null,
      secondary_gym: null,
      sexuality: null,
      username: null,
      firstname_lastname: null,
      new_update_modal: false,
    }
    const shuffledProfiles = shuffleArray(filteredProfiles || [])
    appendProfiles([...shuffledProfiles])
  } catch (error) {
    console.error("Error in getting profiles:", error)
  } finally {
    setLoading(false)
  }
}

export default getConnectionProfiles
