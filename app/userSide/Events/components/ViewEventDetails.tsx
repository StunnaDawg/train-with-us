import { View, Text, Platform } from "react-native"
import React from "react"
import formatTimestamp from "../../../utilFunctions/formatTimeStamp"
import GenericButton from "../../../components/GenericButton"
import openInAppleMaps from "../../../utilFunctions/openGoogleMaps"
import openInGoogleMaps from "../../../utilFunctions/openMaps"
import AddEventToCalendar from "./AddEventToCalendar"

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
      <View className="flex flex-row  justify-between">
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
        <View className="flex flex-row justify-center items-center">
          <Text className="pb-1 font-bold text-md text-white ">Location:</Text>
          <View className="mx-2 items-center">
            <Text className="font-bold text-sm text-white ">
              {location ? location : "No Street Address"}
            </Text>
          </View>
        </View>

        <View className="flex flex-row justify-center">
          {Platform.OS === "ios" ? (
            <>
              <View className="my-2 mx-1">
                <GenericButton
                  text="Open in Apple Maps"
                  buttonFunction={() =>
                    openInAppleMaps("580 Wright Ave, Dartmouth NS")
                  }
                  roundness="rounded-xl"
                  textSize="text-xs"
                  width={100}
                  textCenter={true}
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
                  textSize="text-xs"
                  width={100}
                  textCenter={true}
                  colourPressed="bg-slate-200"
                  colourDefault="bg-white"
                  borderColourPressed="border-gray-200"
                  borderColourDefault="border-black"
                />
              </View>
            </>
          ) : (
            <View className="my-2 mx-1">
              <GenericButton
                text="Open in Google Maps"
                buttonFunction={() =>
                  openInGoogleMaps("580 Wright Ave, Dartmouth NS")
                }
                roundness="rounded-xl"
                textSize="text-xs"
                width={100}
                textCenter={true}
                colourPressed="bg-slate-200"
                colourDefault="bg-white"
                borderColourPressed="border-gray-200"
                borderColourDefault="border-black"
              />
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default ViewEventDetails
