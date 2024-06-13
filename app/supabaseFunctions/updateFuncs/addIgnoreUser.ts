// import { Dispatch, SetStateAction } from "react"
// import supabase from "../../../lib/supabase"
// import { Profile } from "../../@types/supabaseTypes"
// import getConnectedIgnoredProfiles from "../getFuncs/getConnectedIgnoredProfiles"
// import { fi } from "date-fns/locale"

// const insertIgnoreUser = async (
//   setLoading: Dispatch<SetStateAction<boolean>>,
//   userId: string,
//   ignoreUserId: string
// ) => {
//   try {
//     setLoading(true)
//     console.log("Inserting user...", ignoreUserId)
//     const currentArray = await getConnectedIgnoredProfiles(userId)

//     // Inserting the ignored user into the current user's ignored_users array

//     const newArray = [...(currentArray?.ignored_users || []), ignoreUserId]
//     console.log("Inserting ignored user...", newArray)

//     const { error } = await supabase
//       .from("profiles")
//       .upsert({ id: userId, ignored_users: newArray })

//     if (error) throw error

//     console.log("User inserted successfully")
//   } catch (error) {
//     console.error("Failed to insert user:", error)
//   } finally {
//     setLoading(false)
//   }
// }

// export default insertIgnoreUser
