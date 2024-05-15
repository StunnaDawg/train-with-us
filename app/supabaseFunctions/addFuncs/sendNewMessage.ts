import supabase from "../../../lib/supabase"
import getChatSession from "../getFuncs/getChatSession"
import createNewChatSession from "./newChatSession"

const sendNewMessage = async (
  message: string,
  userId: string,
  user2Id: string
) => {
  try {
    const chatSessionId = await createNewChatSession(userId, user2Id)
    const { error } = await supabase.from("messages").insert([
      {
        message: message,
        sent_at: new Date(),
        sender: userId,
        chat_session: chatSessionId?.id,
      },
    ])

    if (error) {
      console.log("Message error", error)
      throw error
    }

    // Function to update connected users array safely
    const updateConnection = async (
      userIdToUpdate: string,
      otherUserId: string
    ) => {
      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("connected_users")
        .eq("id", userIdToUpdate)
        .single()

      if (fetchError) {
        console.error("Error fetching user profile:", fetchError)
        return
      }

      // Prevent duplicate entries

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          connected_users: data.connected_users
            ? [...data.connected_users, otherUserId]
            : [otherUserId],
        })
        .eq("id", userIdToUpdate)

      if (updateError) {
        console.error("Failed to update connected users", updateError)
        return
      }
    }

    // Update connections for both users
    await Promise.all([
      updateConnection(userId, user2Id),
      updateConnection(user2Id, userId),
    ])
  } catch (error) {
    console.error("sendNewMessage error:", error)
  }
}

export default sendNewMessage
