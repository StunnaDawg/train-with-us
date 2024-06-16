import { View, Text, Platform, Pressable } from "react-native"
import React from "react"
import formatTimestamp from "../../../utilFunctions/formatTimeStamp"
import GenericButton from "../../../components/GenericButton"
import AddEventToCalendar from "./AddEventToCalendar"
import { FontAwesome5 } from "@expo/vector-icons"
import openInMaps from "../../../utilFunctions/openMaps"
import openInGoogleMaps from "../../../utilFunctions/openGoogleMaps"

type ViewEventDetailsProps = {
  date: string | null | undefined
  eventId: number
  location: string | null | undefined
}

const ViewEventDetails = ({
  date,
  eventId,
  location,
}: ViewEventDetailsProps) => {
  return (
    <View>
      <View className="flex flex-row  justify-between items-center">
        <View>
          <Text className=" font-bold text-lg pb-1 text-white">
            Date and Time:
          </Text>
          <Text className="font-bold text-sm text-white ">
            {date ? formatTimestamp(date) : "No Date"}
          </Text>
        </View>

        <View className="mt-2">
          <AddEventToCalendar eventId={eventId} />
        </View>
      </View>

      {/* Location */}
      <View className=" mb-1 mt-2">
        <Text className="pb-1 font-bold text-lg text-white ">Location:</Text>
        <View className="flex flex-row justify-between items-center">
          <View className=" items-center">
            <Text className="font-bold text-sm text-white ">
              {/* {String.fromCodePoint("&#128205")}{" "} */}
              {location ? location : "No Street Address"}
            </Text>
          </View>

          {Platform.OS === "ios" ? (
            <>
              <Pressable
                className="bg-white rounded-xl p-1"
                onPress={() => {
                  if (location) {
                    openInMaps(location)
                  }
                }}
              >
                <FontAwesome5 name="directions" size={22} color="black" />
              </Pressable>
            </>
          ) : (
            <Pressable
              className="bg-white rounded-xl p-1"
              onPress={() => {
                if (location) {
                  openInGoogleMaps(location)
                }
              }}
            >
              <FontAwesome5 name="directions" size={22} color="black" />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  )
}

export default ViewEventDetails
