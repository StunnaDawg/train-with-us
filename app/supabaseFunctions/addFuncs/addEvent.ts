import { Dispatch, SetStateAction } from "react"
import supabase from "../../../lib/supabase"
import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"
import { decode } from "base64-arraybuffer"

const addNewEvent = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  user_id: string,
  eventName: string,
  communityId: number | null,
  eventDate: Date,
  price: number,
  event_description: string,
  photoCover: ImagePicker.ImagePickerAsset,
  location: string
) => {
  try {
    setLoading(true)
    if (communityId === null) throw new Error("Community ID is null")

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

    const { error } = await supabase.from("events").insert([
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
      },
    ])

    if (error) throw error
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

export default addNewEvent
