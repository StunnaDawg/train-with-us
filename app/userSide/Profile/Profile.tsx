import { View, Text, ScrollView, Pressable, SafeAreaView } from "react-native"
import React, { useCallback, useState } from "react"
import { Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import Ionicons from "@expo/vector-icons/Ionicons"
import { NavBar } from "../../../components"
import { TouchableOpacity } from "react-native-gesture-handler"
import SinglePicCommunity from "../../components/SinglePicCommunity"

type CommunityButtonProps = {
  backGroundColour: string
  communityName: string
  numberOfFriends: string
  numberOfMatches: string
}

type EventProfileTabViewProps = {
  eventTitle: string
  eventDate: string
  profileGoingTag: string
  friendsGoing: string
  matchesGoing: string
}

const CommunityButton = ({
  backGroundColour,
  communityName,
  numberOfFriends,
  numberOfMatches,
}: CommunityButtonProps) => {
  return (
    <View
      className={`${backGroundColour} border-transparent rounded-lg mb-1 p-3`}
    >
      <View className="flex flex-row justify-between">
        <View>
          <Text className="text-blue-200 text-xs font-bold">
            {communityName}
          </Text>
        </View>

        <View>
          <Text className="text-blue-200 text-xs font-bold">
            {numberOfFriends} Friends
          </Text>
        </View>

        <View>
          <Text className="text-blue-200 text-xs font-bold">
            {numberOfMatches} Matches
          </Text>
        </View>
      </View>
    </View>
  )
}

const EventProfileTabView = ({
  eventTitle,
  eventDate,
  profileGoingTag,
  friendsGoing,
  matchesGoing,
}: EventProfileTabViewProps) => {
  return (
    <View className=" flex flex-1 rounded-lg bg-blue-700 mx-2 p-4 mb-4">
      <View className="flex flex-row justify-between">
        <View>
          <Text className="text-blue-200 font-bold text-sm">{eventTitle}</Text>
          <Text className="text-white text-xs font-semibold">{eventDate}</Text>
        </View>
        <View className="items-center">
          <View className="border border-transparent rounded-md p-1 bg-orange-400 items-center">
            <Text className="text-orange-900 text-xs">{profileGoingTag}</Text>
          </View>
        </View>
      </View>

      <View className="flex flex-row justify-end mt-4">
        <View>
          <Text className="text-xs font-semibold text-slate-300">
            {friendsGoing} Friends | {matchesGoing} Matches
          </Text>
        </View>
      </View>
    </View>
  )
}

const ProfileView = () => {
  const { user } = useAuth()
  const [userProfile, setUserProfile] = useState<Profile | null>(null)
  const [pressedButton, setPressedButton] = useState<{
    [key: string]: boolean
  }>({})
  const navigation = useNavigation<NavigationType>()

  const handlePressedButtonIn = (buttonName: string) => {
    setPressedButton((prev) => ({ ...prev, [buttonName]: true }))
  }
  const handlePressedButtonOut = (buttonName: string) => {
    setPressedButton((prev) => ({ ...prev, [buttonName]: false }))
  }
  const fetchCurrentUser = async () => {
    if (!user) return
    setUserProfile(null)
    await useCurrentUser(user?.id, setUserProfile)
  }
  useFocusEffect(
    useCallback(() => {
      let isMounted = true
      fetchCurrentUser()
      return () => {
        isMounted = false
      }
    }, [user])
  )

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <NavBar
        textColour="text-white"
        title="My Profile"
        showFriends={true}
        showSearchCommunities={false}
        searchUsers={false}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View className="border-b-0 rounded-xl border-r-2 mb-2">
            {/* Header */}
            <View>
              <View>
                <View className="items-center">
                  <View className="items-center">
                    <SinglePicCommunity
                      size={50}
                      avatarRadius={100}
                      noAvatarRadius={100}
                      item={userProfile?.profile_pic}
                    />
                    <Text className="text-white text-xl font-bold">
                      Blended Athletics
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Text className="text-blue-600">Primary Location</Text>
                  </TouchableOpacity>
                </View>
                {/*<View className="flex flex-row justify-between">
                  <View className="flex flex-1 rounded-lg bg-primary-300 mx-2 my-4 p-4">
                    <Text className="text-blue-200 font-bold text-2xl">12</Text>
                    <Text className="text-white font-semibold">Friends</Text>
                  </View>
                  <View className=" flex flex-1 rounded-lg bg-primary-300 mx-2 my-4 p-4">
                    <Text className="text-blue-200 font-bold text-2xl">12</Text>
                    <Text className="text-white font-semibold">Friends</Text>
                  </View>
                </View>*/}
              </View>
            </View>
          </View>

          {/* Training partners box */}
          <View className="bg-primary-700 flex-1 pt-2 h-full">
            <View>
              <View className="bg-primary-300 flex rounded-lg m-6 ">
                <View className=" flex flex-row justify-between items-center p-4">
                  <View className="flex flex-row items-center">
                    <Ionicons name="people-outline" size={24} color="white" />
                    <Text className="text-white font-bold">
                      Training Partners
                    </Text>
                  </View>
                  <View>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="white"
                    />
                  </View>
                </View>

                <View className="flex flex-row">
                  <View className=" flex flex-1 rounded-lg bg-blue-700 mx-2 p-4 mb-4">
                    <Text className="text-blue-200 font-bold text-2xl">12</Text>
                    <Text className="text-white font-semibold">Friends</Text>
                  </View>

                  <View className=" flex flex-1 rounded-lg bg-blue-700 mx-2 p-4 mb-4">
                    <Text className="text-blue-200 font-bold text-2xl">12</Text>
                    <Text className="text-white font-semibold">Friends</Text>
                  </View>
                </View>
              </View>

              {/* Communties */}
              <View className="bg-primary-300 flex rounded-lg mx-6">
                <View className=" flex flex-row justify-between items-center px-4 py-3">
                  <View className="flex flex-row items-center">
                    <Ionicons name="people-outline" size={24} color="white" />
                    <Text className="text-white font-bold">Communities</Text>
                  </View>
                  <View>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="white"
                    />
                  </View>
                </View>

                <View className="flex">
                  <View className="flex flex-row items-center px-2">
                    <View className="border-slate-400 border rounded-lg px-3 mx-1">
                      <Text className="font-bold text-xl text-blue-200">3</Text>
                    </View>
                    <View className="mx-1">
                      <Text className="text-white font-bold">
                        Active Communities
                      </Text>
                    </View>
                  </View>
                  <View className=" flex flex-1 mx-2 px-4 py-2">
                    <View>
                      <CommunityButton
                        backGroundColour="bg-blue-700"
                        communityName="Blended Athletics"
                        numberOfFriends="12"
                        numberOfMatches="5"
                      />
                      <CommunityButton
                        backGroundColour="bg-blue-700"
                        communityName="Blended Athletics"
                        numberOfFriends="12"
                        numberOfMatches="5"
                      />
                      <CommunityButton
                        backGroundColour="bg-blue-700"
                        communityName="Blended Athletics"
                        numberOfFriends="12"
                        numberOfMatches="5"
                      />
                    </View>
                  </View>

                  <View className="border-0 h-px my-1 bg-primary-700 mx-2" />

                  <View className="flex flex-row items-center mb-2 px-2 py-2">
                    <View className="mx-1">
                      <Text className="text-white font-bold">
                        Suggested Communties
                      </Text>
                    </View>
                  </View>
                  <View className=" flex flex-1 mx-2 px-4 mb-4">
                    <View>
                      <CommunityButton
                        backGroundColour="bg-primary-700"
                        communityName="Blended Athletics"
                        numberOfFriends="12"
                        numberOfMatches="5"
                      />
                      <CommunityButton
                        backGroundColour="bg-primary-700"
                        communityName="Blended Athletics"
                        numberOfFriends="12"
                        numberOfMatches="5"
                      />
                    </View>
                  </View>
                </View>

                {/* Events */}
              </View>

              <View className="bg-primary-300 flex flex-1 rounded-lg m-6">
                <View className=" flex flex-row justify-between items-center px-4 py-3">
                  <View className="flex flex-row items-center">
                    <Ionicons name="rocket-outline" size={24} color="white" />
                    <Text className="text-white font-bold">Events</Text>
                  </View>
                  <View>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="white"
                    />
                  </View>
                </View>
                <View className=" flex flex-1 mx-2 px-4 py-2">
                  <View>
                    <EventProfileTabView
                      eventTitle="Hyrox Event"
                      eventDate="Wednesday, Nov 24th 6:15pm"
                      profileGoingTag="Going"
                      friendsGoing="12"
                      matchesGoing="1"
                    />
                    <EventProfileTabView
                      eventTitle="Hyrox Event"
                      eventDate="Wednesday, Nov 24th 6:15pm"
                      profileGoingTag="Going"
                      friendsGoing="12"
                      matchesGoing="1"
                    />
                    <EventProfileTabView
                      eventTitle="Hyrox Event"
                      eventDate="Wednesday, Nov 24th 6:15pm"
                      profileGoingTag="Going"
                      friendsGoing="12"
                      matchesGoing="1"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileView
