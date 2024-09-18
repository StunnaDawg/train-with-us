import { View, Text, Platform, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import AddEventToCalendar from "./AddEventToCalendar"
import { FontAwesome6 } from "@expo/vector-icons"
import openInMaps from "../../../utilFunctions/openMaps"
import openInGoogleMaps from "../../../utilFunctions/openGoogleMaps"
import getEventAttendees from "../../../supabaseFunctions/getFuncs/getEventAttendees"
import { Profile } from "../../../@types/supabaseTypes"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import SinglePicCommunity from "../../../components/SinglePicCommunity"

type ViewEventDetailsProps = {
  date: string | null | undefined
  eventId: number
  location: string | null | undefined
  price: number | null | undefined
  attendanceLimit: number | null | undefined
  eventProfiles: Profile[] | null
}

const ViewEventDetails = ({
  date,
  eventId,
  location,
  price,
  attendanceLimit,
  eventProfiles,
}: ViewEventDetailsProps) => {
  const navigation = useNavigation<NavigationType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [isPressed, setIsPressed] = useState<{ [key: string]: boolean }>({})
  const maxDisplayCount = 2

  const displayProfiles =
    eventProfiles && eventProfiles?.slice(0, maxDisplayCount)
  const additionalCount =
    eventProfiles && eventProfiles!.length - maxDisplayCount

  const handlePressIn = (name: string) => {
    setIsPressed((prev) => ({ ...prev, [name]: true }))
  }

  const handlePressOut = (name: string) => {
    setIsPressed((prev) => ({ ...prev, [name]: false }))
  }

  return (
    <View>
      <AddEventToCalendar eventId={eventId} date={date} />

      {/* Location */}
      {Platform.OS === "ios" ? (
        <Pressable
          className={`${isPressed["location"] ? "opacity-50" : null}`}
          onPressIn={() => handlePressIn("location")}
          onPressOut={() => handlePressOut("location")}
          onPress={() => {
            if (location) {
              openInMaps(location)
            }
          }}
        >
          <View className=" mb-2 mt-2">
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row items-center">
                <FontAwesome6 name="location-arrow" size={20} color="white" />
                <Text className="font-bold text-sm text-white mx-1 ">
                  {/* {String.fromCodePoint("&#128205")}{" "} */}
                  {location ? location : "No Street Address"}
                </Text>
              </View>

              <FontAwesome6 name="chevron-right" size={20} color="white" />
            </View>
          </View>
        </Pressable>
      ) : (
        <Pressable
          className={`${isPressed["locationAndroid"] ? "opacity-50" : null}`}
          onPressIn={() => handlePressIn("locationAndroid")}
          onPressOut={() => handlePressOut("locationAndroid")}
          onPress={() => {
            if (location) {
              openInGoogleMaps(location)
            }
          }}
        >
          <View className=" mb-1 mt-2">
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row items-center">
                <FontAwesome6 name="location-arrow" size={20} color="white" />
                <Text className="font-bold text-sm text-white mx-1 ">
                  {/* {String.fromCodePoint("&#128205")}{" "} */}
                  {location ? location : "No Street Address"}
                </Text>
              </View>

              <FontAwesome6 name="chevron-right" size={20} color="white" />
            </View>
          </View>
        </Pressable>
      )}

      <View className="flex flex-row  justify-between items-center mb-2 mt-2">
        <View className="flex flex-row items-center">
          <FontAwesome6 name="dollar-sign" size={20} color="white" />
          <Text className="font-bold text-sm text-white mx-1  ">
            {price === 0 ? "Free" : price?.toString()}
          </Text>
        </View>
      </View>

      <Pressable
        className={`${isPressed["attendees"] ? "opacity-50" : null}`}
        onPressIn={() => handlePressIn("attendees")}
        onPressOut={() => handlePressOut("attendees")}
        onPress={() => {
          navigation.navigate("ViewEventAttendees", { profile: eventProfiles })
        }}
      >
        <View className="flex flex-row  justify-between items-center mb-1 mt-2">
          <View>
            <Text className="font-bold text-sm text-white mx-1  ">
              Attendees{" "}
              {attendanceLimit && eventProfiles
                ? `(${eventProfiles?.length}/${attendanceLimit})`
                : ""}
            </Text>
          </View>

          <View className="flex flex-row items-center">
            {displayProfiles?.map((profile) => (
              <SinglePicCommunity
                key={profile.id}
                item={profile.profile_pic}
                size={30}
                avatarRadius={100}
                noAvatarRadius={100}
              />
            ))}
            <View>
              {additionalCount && additionalCount > 0 ? (
                <Text className="font-bold text-sm text-white mx-1  ">
                  +{additionalCount} more
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default ViewEventDetails
