import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import { Events } from "../../../@types/supabaseTypes"
import getSingleEvent from "../../../supabaseFunctions/getFuncs/getSingleEvent"
import { set } from "date-fns"
import formatBirthdate from "../../../utilFunctions/calculateDOB"

type ViewEventTitleProps = {
  title: string | null | undefined
  date: string | null | undefined
  eventId: number | null | undefined
  eventPhoto: string | null | undefined
}

const ViewEventTitle = ({
  title,
  date,
  eventId,
  eventPhoto,
}: ViewEventTitleProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentEvent, setCurrentEvent] = useState<Events | null>({} as Events)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const [coverImage, setCoverImage] = useState<string>("")
  const { user } = useAuth()

  useEffect(() => {
    if (!user && eventId) return

    getSingleEvent(setLoading, eventId, setCurrentEvent)
  }, [user])

  useEffect(() => {
    setLoading(true)
    if (
      currentEvent?.event_cover_photo === null ||
      currentEvent?.event_cover_photo === undefined
    )
      return
    console.log("getting currentEvent", currentEvent)
    setCoverImage(currentEvent.event_cover_photo)
    setLoading(false)
  }, [currentEvent])
  return (
    <View className="flex flex-row items-center justify-center">
      <View className="m-5 items-center">
        <Text className="text-xl font-bold">
          {currentEvent?.date ? formatBirthdate(currentEvent?.date) : "No Date"}
        </Text>
        <View className="border rounded-full p-1 px-4 bg-white border-white">
          <Text className="text-xl font-semibold">{title}</Text>
        </View>
        <Text className="text-xl font-bold">Event Type</Text>
      </View>

      <View className="border-white border-4">
        <SinglePic
          size={150}
          avatarRadius={0}
          noAvatarRadius={0}
          item={eventPhoto}
        />
      </View>
    </View>
  )
}

export default ViewEventTitle
