import supabase from "../../../lib/supabase"

const addNotification = async (
  description: string,
  navigationPath: string,
  title: string,
  userId: string,
  notificationType: string,
  notificationData: any,
  image: string | null
) => {
  const { data, error } = await supabase.from("notifications").insert([
    {
      description: description,
      is_read: false,
      navigation_path: navigationPath,
      title: title,
      user_id: userId,
      notification_type: notificationType,
      data: notificationData,
      image: image,
    },
  ])
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export default addNotification
