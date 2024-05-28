import { View, Text, Pressable, Platform } from "react-native"
import React from "react"
import ShowMap from "./ShowMap"
import formatBirthdate from "../../../utilFunctions/calculateDOB"
import formatTimestamp from "../../../utilFunctions/formatTimeStamp"
import GenericButton from "../../../components/GenericButton"
import openInAppleMaps from "../../../utilFunctions/openAppleMaps"
import openInGoogleMaps from "../../../utilFunctions/openGoogleMaps"
import AddEventToCalendar from "./AddEventToCalendar"
import { Events } from "../../../@types/supabaseTypes"

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
      {/* Date and Time */}
      <View className="mb-2">
        <Text className=" font-bold text-lg pb-1 text-white">
          Date and Time:
        </Text>
        <Text className="font-bold text-lg text-white ">
          {date ? formatTimestamp(date) : "No Date"}
        </Text>

        <View className="mt-2">
          <AddEventToCalendar eventId={eventId} />
        </View>
      </View>

      {/* Location */}
      <View className=" flex flex-row justify-between mb-1">
        <View>
          <Text className="pb-1 font-bold text-lg text-white ">Location:</Text>
          <Text className="font-bold text-lg text-white ">
            {location ? location : "No Street Address"}
          </Text>
          <Text className="font-bold text-lg text-white ">Halifax, NS</Text>
        </View>

        {Platform.OS === "ios" ? (
          <View>
            <View className="my-2">
              <GenericButton
                text="Open in Apple Maps"
                buttonFunction={() =>
                  openInAppleMaps("580 Wright Ave, Dartmouth NS")
                }
                roundness="rounded-xl"
                textSize="text-sm"
                width={130}
                colourPressed="bg-slate-200"
                colourDefault="bg-white"
                borderColourPressed="border-gray-200"
                borderColourDefault="border-black"
              />
            </View>

            <View className="my-2">
              <GenericButton
                text="Open in Google Maps"
                buttonFunction={() =>
                  openInGoogleMaps("580 Wright Ave, Dartmouth NS")
                }
                roundness="rounded-xl"
                textSize="text-sm"
                width={130}
                colourPressed="bg-slate-200"
                colourDefault="bg-white"
                borderColourPressed="border-gray-200"
                borderColourDefault="border-black"
              />
            </View>
          </View>
        ) : (
          <View className="my-2">
            <GenericButton
              text="Open in Google Maps"
              buttonFunction={() =>
                openInGoogleMaps("580 Wright Ave, Dartmouth NS")
              }
              roundness="rounded-xl"
              textSize="text-sm"
              width={130}
              colourPressed="bg-slate-200"
              colourDefault="bg-white"
              borderColourPressed="border-gray-200"
              borderColourDefault="border-black"
            />
          </View>
        )}
      </View>
    </View>
  )
}

export default ViewEventDetails
