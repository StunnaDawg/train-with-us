import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import supabase from "../../../../lib/supabase"
import formatBirthdate from "../../../utilFunctions/calculateDOB"
import { Skeleton } from "moti/skeleton"
import { Ionicons } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import formatEventTime from "../../../utilFunctions/formatEventTime"

type EventCardProps = {
  eventId: number
  title: string | null
  date: string | null
  communityId: number | null
  eventCoverPhoto: string | null
  eventPrice: number | null
  eventCompatibility?: number | null
  eventAddress: string | null
}

const EventCard = ({
  title,
  date,
  communityId,
  eventId,
  eventCoverPhoto,
  eventAddress,
  eventPrice,
  eventCompatibility,
}: EventCardProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()

  const handlePressIn = () => {
    setIsPressed(true)
  }
  const handlePressOut = () => {
    setIsPressed(false)
  }

  return (
    <Skeleton show={loading}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className={`mx-1 w-[175px] ${isPressed ? "opacity-25" : ""}`}
        onPress={() => navigation.navigate("ViewEvent", { eventId })}
      >
        <View className="rounded-xl border-transparent bg-primary-900 overflow-hidden">
          <View className="relative">
            <SinglePicCommunity
              item={eventCoverPhoto}
              size={175}
              avatarRadius={15}
              noAvatarRadius={0}
            />

            <View className="">
              <View className="absolute bottom-0 left-0 right-0 bg-primary-900 p-3">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-1">
                    <FontAwesome5 name="fire-alt" size={16} color="green" />
                    <Text className="text-lg font-bold text-white">98%</Text>
                  </View>

                  <View className="flex-row items-center gap-1">
                    <View className="flex-row items-center rounded-full bg-orange-400 px-1 py-1">
                      <Text className="text-[8px] font-bold text-slate-50/80">
                        Interested
                      </Text>
                    </View>

                    <View className="flex-row items-center rounded-full bg-green-900 px-1 py-1">
                      <Text className="text-[8px] font-bold text-slate-50/80">
                        Free
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View className="flex-row items-center justify-between px-3">
              <Text className="text-xs text-white font-bold flex-1 mr-1">
                {title}
              </Text>
            </View>
            <View className="flex items-start p-3">
              <View className="flex-row items-center gap-1 p-1">
                <Ionicons name="rocket-outline" size={12} color="white" />
                <Text className="text-xs text-white">Single Day</Text>
              </View>
              <View className="flex-row items-center gap-1 p-1">
                <Ionicons name="calendar-number" size={12} color="white" />
                <Text className="text-xs text-white">
                  {formatBirthdate(date)}
                </Text>
              </View>
              <View className="flex-row items-center gap-1 p-1">
                <Ionicons name="time-outline" size={12} color="white" />
                <Text className="text-xs text-white">
                  {formatEventTime(date)}
                </Text>
              </View>
              {eventAddress && (
                <View className="flex-row items-center gap-1 p-1">
                  <Ionicons name="location-outline" size={12} color="white" />
                  <Text className="text-xs text-white">{eventAddress}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Skeleton>
  )
}

export default EventCard
