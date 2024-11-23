import { View, Text, Platform, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { Profile } from "../../../@types/supabaseTypes"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

type ViewEventDetailsProps = {
  date: string | null | undefined
  eventId: number
  location: string | null | undefined
  price: number | null | undefined
  attendanceLimit: number | null | undefined
  eventProfiles: Profile[] | null
  waitlistProfiles: Profile[] | null
  description: string | null | undefined
}

const ViewEventDetails = ({
  date,
  eventId,
  location,
  price,
  attendanceLimit,
  eventProfiles,
  waitlistProfiles,
}: ViewEventDetailsProps) => {
  const navigation = useNavigation<NavigationType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [isPressed, setIsPressed] = useState<{ [key: string]: boolean }>({})
  const maxDisplayCount = 2

  const displayProfiles =
    eventProfiles && eventProfiles?.slice(0, maxDisplayCount)

  const waitlistDisplayProfiles =
    waitlistProfiles && waitlistProfiles?.slice(0, maxDisplayCount)

  const additionalCount =
    eventProfiles && eventProfiles!.length - maxDisplayCount

  const additionalWaitlistCount =
    waitlistProfiles && waitlistProfiles!.length - maxDisplayCount

  const handlePressIn = (name: string) => {
    setIsPressed((prev) => ({ ...prev, [name]: true }))
  }

  const handlePressOut = (name: string) => {
    setIsPressed((prev) => ({ ...prev, [name]: false }))
  }

  return (
    <View className="flex flex-row justify-around">
      <View className=" flex flex-row  flex-grow  bg-primary-300 rounded-lg px-2 py-1 mx-1">
        <View className="flex flex-row items-center">
          <Text className="text-white/80 text-sm font-bold">65 </Text>
          <Text className="text-white/80 text-[10px] font-semibold">Going</Text>
        </View>
      </View>
      <View className="flex flex-row  flex-grow  bg-blue-600 rounded-lg px-2 py-1 mx-1">
        <View className="flex flex-row items-center">
          <Text className="text-white/80 text-sm font-bold">10 </Text>
          <Text className="text-white/80 text-[10px] font-semibold">
            Friends
          </Text>
        </View>
      </View>
      <View className="flex flex-row  flex-grow bg-green-600 rounded-lg px-2 py-1 mx-1">
        <View className="flex flex-row items-center">
          <Text className="text-white/80 text-sm font-bold">8 </Text>
          <Text className="text-white/80 text-[10px] font-semibold">
            Matches
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ViewEventDetails
