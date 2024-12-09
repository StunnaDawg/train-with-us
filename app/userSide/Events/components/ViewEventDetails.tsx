import { View, Text, Platform } from "react-native"
import React, { useEffect, useState } from "react"
import { Events, Profile } from "../../../@types/supabaseTypes"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import Checkout from "./Checkout"
import Ionicons from "@expo/vector-icons/Ionicons"
import * as Location from "expo-location"
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps"
import getDistanceFromUserWithAddress from "../../../utilFunctions/getDistanceFromUserWithAddress"
import { getLongAndLat } from "../../../utilFunctions/getLongAndLat"

type ViewEventDetailsProps = {
  date: string | null | undefined
  event: Events | null
  location: string | null | undefined
  price: number | null | undefined
  attendanceLimit: number | null | undefined
  eventProfiles: Profile[] | null
  waitlistProfiles: Profile[] | null
  description: string | null | undefined
  userProfile: Profile | null | undefined
}

// Going to need to update data in backend to get the actual schedule
// Add a section to add schedule instructions
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
  userProfile,
}: ViewEventDetailsProps) => {
  const navigation = useNavigation<NavigationType>()
  const [distance, setDistance] = useState<number | null>(null)
  const [eventCoords, setEventCoords] = useState<
    Location.LocationObject["coords"] | null
  >(null)
  useEffect(() => {
    if (location && userProfile?.location) {
      console.log("location", location)
      const getDistance = async () => {
        const distance = await getDistanceFromUserWithAddress(
          userProfile?.location,
          location
        )
        setDistance(distance)
      }
      getDistance()
    }
  }, [location, userProfile?.location])

  useEffect(() => {
    if (location) {
      const getLongAndLatFunc = async () => {
        await getLongAndLat(location, setEventCoords)
      }
      getLongAndLatFunc()
    }
  }, [location])

  return (
    <>
      <View className="flex flex-row justify-around">
        <View className=" flex flex-row  flex-grow  bg-primary-300 rounded-lg px-2 py-1 mx-1">
          <View className="flex flex-row items-center">
            <Text className="text-white/80 text-sm font-bold">
              {eventProfiles?.length}{" "}
              <Text className="text-white/80 text-[10px] font-semibold">
                {""}Going
              </Text>
              {""}
            </Text>
          </View>
        </View>
        <View className="flex flex-row  flex-grow  bg-blue-600 rounded-lg px-2 py-1 mx-1">
          <View className="flex flex-row items-center">
            {/* TODO: Add friends count using backend rpc function */}
            <Text className="text-white/80 text-sm font-bold">
              10{" "}
              <Text className="text-white/80 text-[10px] font-semibold">
                Friends
              </Text>
            </Text>
          </View>
        </View>
        <View className="flex flex-row  flex-grow bg-green-600 rounded-lg px-2 py-1 mx-1">
          <View className="flex flex-row items-center">
            {/* TODO: Add matches count */}
            <Text className="text-white/80 text-sm font-bold">
              8{" "}
              <Text className="text-white/80 text-[10px] font-semibold">
                Matches
              </Text>
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
                {location}
              </Text>
            </View>

            <View className="flex flex-row items-center mb-1">
              <Ionicons name="location-outline" size={16} color="white" />
              <Text className="text-white/80 text-xs font-normal">
                {distance ? distance.toFixed(1) : 0} km away
              </Text>
            </View>
            {eventCoords && (
              <MapView
                initialRegion={{
                  latitude: eventCoords?.latitude,
                  longitude: eventCoords?.longitude,
                  latitudeDelta: 0.01, // Controls zoom level - smaller number = more zoomed in
                  longitudeDelta: 0.01, // Controls zoom level - smaller number = more zoomed in
                }}
                showsUserLocation={true}
                zoomEnabled={true}
                provider={
                  Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
                }
                style={{ height: 200, width: "100%" }}
              >
                <Marker
                  coordinate={{
                    latitude: eventCoords?.latitude,
                    longitude: eventCoords?.longitude,
                  }}
                />
              </MapView>
            )}
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
