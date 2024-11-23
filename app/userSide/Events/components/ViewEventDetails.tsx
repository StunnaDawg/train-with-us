import { View, Text } from "react-native"
import React, { useState } from "react"
import { Events, Profile } from "../../../@types/supabaseTypes"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import Checkout from "./Checkout"
import Ionicons from "@expo/vector-icons/Ionicons"

type ViewEventDetailsProps = {
  date: string | null | undefined
  event: Events | null
  location: string | null | undefined
  price: number | null | undefined
  attendanceLimit: number | null | undefined
  eventProfiles: Profile[] | null
  waitlistProfiles: Profile[] | null
  description: string | null | undefined
}

const ScheduleCard = () => {
  return (
    <View className="rounded-lg bg-primary-300 p-4">
      <View className="flex flex-row justify-between items-center">
        <View>
          <View>
            <Text className="text-white text-[14px] font-bold">Friday</Text>
          </View>
          <View>
            <Text className="text-white/80 text-[12px] font-normal">
              November, 23rd
            </Text>
          </View>
        </View>
        <View>
          <Text className=" text-orange-500 text-[12px] font-normal">
            8:00 PM - 10:00 PM
          </Text>
        </View>
      </View>

      <View className="my-4">
        <View>
          <View className="mb-2">
            <Text className="text-white/80 text-[12px] font-normal">
              - Check-in starts 30 minutes before the event
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-white/80 text-[12px] font-normal">
              - Welcome and Walkthrough
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-white/80 text-[12px] font-normal">
              - Socializing and Networking
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const ViewEventDetails = ({
  date,
  event,
  location,
  price,
  attendanceLimit,
  eventProfiles,
  waitlistProfiles,
  description,
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
    <>
      <View className="flex flex-row justify-around">
        <View className=" flex flex-row  flex-grow  bg-primary-300 rounded-lg px-2 py-1 mx-1">
          <View className="flex flex-row items-center">
            <Text className="text-white/80 text-sm font-bold">65 </Text>
            <Text className="text-white/80 text-[10px] font-semibold">
              Going
            </Text>
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

      <View className="my-4">
        <Checkout
          ticketPrice={price ? price : 0}
          event={event}
          eventProfiles={eventProfiles}
        />
      </View>

      <View className="my-4">
        <View className="flex">
          <View className="mb-3">
            <Text className="text-white/80 text-sm font-bold">
              About This Event
            </Text>
          </View>
          <View>
            <Text className="text-white/80 text-xs font-normal">
              {description}
            </Text>
          </View>
        </View>
      </View>

      <View className="rounded-lg bg-primary-300 p-4">
        <View>
          <View>
            <View className="mb-1">
              <Text className="text-white text-[16px] font-bold">
                Spartan Grounds
              </Text>
            </View>

            <View className="mb-1">
              <Text className="text-white/80 text-xs font-normal">
                {location}
              </Text>
            </View>

            <View className="flex flex-row items-center mb-1">
              <Ionicons name="location-outline" size={16} color="white" />
              <Text className="text-white/80 text-xs font-normal">
                8.0 km away
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="my-4">
        <View className="mb-3">
          <Text className="text-white/80 text-xs font-bold">Schedule</Text>
        </View>
        <ScheduleCard />
      </View>

      <View className="my-4">
        <Checkout
          ticketPrice={price ? price : 0}
          event={event}
          eventProfiles={eventProfiles}
        />
      </View>
    </>
  )
}

export default ViewEventDetails
