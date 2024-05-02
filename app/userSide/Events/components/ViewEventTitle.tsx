import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import { Events } from "../../../@types/supabaseTypes"
import getSingleEvent from "../../../supabaseFunctions/getFuncs/getSingleEvent"

type ViewEventTitleProps = {
  title: string | null | undefined
  date: string | null | undefined
  eventId: number | null | undefined
}

const ViewEventTitle = ({ title, date, eventId }: ViewEventTitleProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentEvent, setCurrentEvent] = useState<Events | null>({} as Events)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user && eventId) return

    getSingleEvent(setLoading, eventId, setCurrentEvent)
  }, [user])

  useEffect(() => {
    if (currentEvent?.event_photos === null || undefined) return
    setImageFiles(currentEvent?.event_photos)
  }, [currentEvent])
  return (
    <View className="flex flex-row items-center justify-center">
      <View className="m-5 items-center">
        <Text className="text-xl font-bold">{date}</Text>
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
          item={imageFiles?.[0]}
        />
      </View>
    </View>
  )
}

export default ViewEventTitle
