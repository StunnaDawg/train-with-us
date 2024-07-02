import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"

const requestConnection = async (
  message: string,
  userId: string,
  user2Id: string
) => {
  try {
    const { error } = await supabase.from("connection_requests").insert([
      {
        message: message,
        request_sent: new Date(),
        requester: userId,
        requested: user2Id,
      },
    ])

    if (error) {
      console.log("Message error", error)
      throw error
    }

    showAlert({
      title: "Request sent",
      message: "Your connection request has been sent.",
    })
  } catch (error) {
    console.log(error)
  } finally {
    console.log("Connection request sent")
  }
}

export default requestConnection
