import supabase from "../../../lib/supabase"

const updateProfile = async (
  userId: string,
  columnUpdating: string,
  columnData: string
) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: userId, [columnUpdating]: columnData })

    if (error) throw error

    console.log("Profile updated successfully")
  } catch (error) {
    console.error("Failed to update profile:", error)
  }
}

export default updateProfile
