import { View, Text, Platform, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import formatTimestamp from "../../../utilFunctions/formatTimeStamp"
import GenericButton from "../../../components/GenericButton"
import AddEventToCalendar from "./AddEventToCalendar"
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons"
import openInMaps from "../../../utilFunctions/openMaps"
import openInGoogleMaps from "../../../utilFunctions/openGoogleMaps"
import getEventAttendees from "../../../supabaseFunctions/getFuncs/getEventAttendees"
import { Profile } from "../../../@types/supabaseTypes"
import SinglePic from "../../../components/SinglePic"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

type ViewEventDetailsProps = {
  date: string | null | undefined
  eventId: number
  location: string | null | undefined
  price: number | null | undefined
  attendanceLimit: number | null | undefined
}

const ViewEventDetails = ({
  date,
  eventId,
  location,
  price,
  attendanceLimit,
}: ViewEventDetailsProps) => {
  const navigation = useNavigation<NavigationType>()
  const [handlePress, setHandlePress] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [eventProfiles, setEventProfiles] = useState<Profile[] | null>([])
  const maxDisplayCount = 2

  const displayProfiles = eventProfiles?.slice(0, maxDisplayCount)
  const additionalCount = eventProfiles!.length - maxDisplayCount
  //
  useEffect(() => {
    getEventAttendees(eventId, setLoading, setEventProfiles)
  }, [eventId])

  return (
    <View>
      <AddEventToCalendar eventId={eventId} date={date} />

      {/* Location */}
      {Platform.OS === "ios" ? (
        <Pressable
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
        onPress={() => {
          navigation.navigate("ViewEventAttendees", { profile: eventProfiles })
        }}
      >
        <View className="flex flex-row  justify-between items-center mb-1 mt-2">
          <View>
            <Text className="font-bold text-sm text-white mx-1  ">
              Attendees
            </Text>
          </View>

          <View className="flex flex-row items-center">
            {displayProfiles?.map((profile) => (
              <SinglePic
                key={profile.id}
                item={profile.profile_pic}
                size={30}
                avatarRadius={100}
                noAvatarRadius={100}
              />
            ))}
            <View>
              {additionalCount > 0 ? (
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
