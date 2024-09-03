import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"
import { decode } from "base64-arraybuffer"
import { FunctionsHttpError } from "@supabase/supabase-js"
import showAlert from "../../utilFunctions/showAlert"

const sendNotification = async (
  token: string,
  title: string,
  body: string,
  eventId: number
) => {
  console.log("Sending notification to", token)
  const { data, error } = await supabase.functions.invoke("push", {
    body: {
      token,
      titleWords: title,
      bodyWords: body,
      data: { eventId, type: "new_event" },
    },
  })

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json()
    console.log("Function returned an error", errorMessage)
  }

  console.log("Notification sent:", data)
}

const sendEventNotification = async (
  communityId: number,
  titleWords: string,
  bodyWords: string,
  eventId: number
) => {
  const { data, error } = await supabase
    .from("community_members")
    .select("expo_push_token")
    .eq("community_id", communityId)

  if (error) throw error

  const tokens = data
    .filter((member) => member.expo_push_token !== null)
    .map((member) => member.expo_push_token)

  console.log("Sending notification to", tokens)

  tokens.forEach(async (token) => {
    await sendNotification(token, titleWords, bodyWords, eventId)
  })
}

const addNewEvent = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  user_id: string,
  eventName: string,
  communityId: number | null,
  eventDate: Date,
  price: number,
  event_description: string,
  photoCover: ImagePicker.ImagePickerAsset,
  location: string,
  eventStyle: string,
  eventLimit: number | null
) => {
  try {
    setLoading(true)
    if (communityId === null) throw new Error("Community ID is null")

    const { data: community, error: communityError } = await supabase
      .from("communities")
      .select("community_title")
      .eq("id", communityId)

    if (communityError) throw communityError

    const base64 = await FileSystem.readAsStringAsync(photoCover.uri, {
      encoding: "base64",
    })
    const filePath = `${user_id}/events/${new Date().getTime()}.${
      photoCover.type === "image"
    }`
    const contentType = "image/png"
    await supabase.storage.from("photos").upload(filePath, decode(base64), {
      contentType: contentType,
    })

    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          event_title: eventName,
          community_host: communityId,
          event_host: user_id,
          created_at: new Date(),
          date: eventDate,
          event_cover_photo: filePath,
          price: price,
          event_description: event_description,
          location: location,
          community_host_name: community![0].community_title,
          event_style: eventStyle,
          event_limit: eventLimit,
        },
      ])
      .select()

    if (error) throw error

    if (!data || data.length === 0)
      throw new Error("No data returned from insert")

    showAlert({
      title: "Success",
      message: "Event created successfully",
    })

    const eventId = data[0].id

    console.log("Event created:", data)
    await sendEventNotification(
      communityId,
      `New Event ${eventName}`,
      `From ${community![0].community_title}`,
      eventId
    )
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default addNewEvent
