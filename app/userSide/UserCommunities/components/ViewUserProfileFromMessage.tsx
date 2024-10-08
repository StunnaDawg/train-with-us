import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native"
import React, { useEffect, useRef, useState } from "react"

import PrimaryGymCard from "../../Connections/components/PrimaryGymCard"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { Communities, Profile } from "../../../@types/supabaseTypes"
import { RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import calculateAge from "../../../utilFunctions/calculateAge"
import ActivityTags from "../../../components/AcvitivityTags"
import MessageButton from "../../Connections/components/MessageButton"
import BackButton from "../../../components/BackButton"

const ViewFullUserProfileFromMessages = () => {
  const { user } = useAuth()
  const [primaryGym, setPrimaryGym] = useState<Communities | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const route =
    useRoute<RouteProp<RootStackParamList, "ViewFullUserProfileFromMessages">>()
  const profile = route.params.userId
  const imageWidth = 363
  const itemMargin = 0

  const [currentIndex, setCurrentIndex] = useState(0)

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index)
    }
  }).current

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  }

  useEffect(() => {
    useCurrentUser(profile, setCurrentProfile)
  }, [profile])

  useEffect(() => {
    const getPrimaryGymName = async () => {
      if (
        currentProfile?.primary_gym === null ||
        currentProfile?.primary_gym === undefined
      ) {
        setPrimaryGym(null)
        return
      }
      getSingleCommunity(setLoading, currentProfile?.primary_gym, setPrimaryGym)
    }

    getPrimaryGymName()
  }, [currentProfile])

  useEffect(() => {
    if (currentProfile?.photos_url === null || undefined) return
    setImageFiles(currentProfile?.photos_url)
  }, [currentProfile])

  const renderProfileSection = (title: string, content: string | undefined) => {
    if (!content) return null
    return (
      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          {title}
        </Text>
        <Text className="text-gray-600">{content}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="p-4">
        <BackButton colour="white" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        <View className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <FlatList
            showsHorizontalScrollIndicator={false}
            initialNumToRender={3}
            disableIntervalMomentum={true}
            snapToAlignment="center"
            pagingEnabled={true}
            horizontal={true}
            decelerationRate="fast"
            snapToInterval={imageWidth + itemMargin}
            data={currentProfile?.photos_url}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ width: imageWidth, alignItems: "center" }}>
                <SinglePicCommunity
                  size={imageWidth}
                  avatarRadius={10}
                  noAvatarRadius={10}
                  item={item}
                  skeletonRadius={10}
                />
              </View>
            )}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
          <View className="flex flex-row justify-center mt-3 mb-4">
            {currentProfile?.photos_url?.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === currentIndex ? "bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </View>
          <View className="px-4 pb-6">
            <View className="flex flex-row justify-between items-center mb-4">
              <Text className="text-3xl font-bold text-gray-800">
                {currentProfile?.first_name} {currentProfile?.last_name}
              </Text>
              {currentProfile?.birthday && (
                <View className="bg-primary-100 px-3 py-1 rounded-full">
                  <Text className="text-xl font-semibold text-primary-600">
                    {calculateAge(currentProfile.birthday)}
                  </Text>
                  <Text className="text-sm text-primary-500 text-center">
                    {currentProfile.gender}
                  </Text>
                </View>
              )}
            </View>

            {currentProfile?.about &&
              renderProfileSection("About me", currentProfile?.about)}

            {currentProfile?.activities &&
              currentProfile.activities.length > 0 && (
                <View className="mb-4">
                  <Text className="text-lg font-semibold text-gray-700 mb-2">
                    Activities
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <View className="flex flex-row">
                      {currentProfile.activities.map((activity) => (
                        <ActivityTags key={activity} activity={activity} />
                      ))}
                    </View>
                  </ScrollView>
                </View>
              )}

            {primaryGym && (
              <View className="mb-4">
                <Text className="text-lg font-semibold text-gray-700 mb-2">
                  My Primary Gym
                </Text>
                <View className="bg-gray-50 rounded-xl p-3">
                  <PrimaryGymCard
                    community={primaryGym}
                    addPrimary={false}
                    userId={user!.id}
                  />
                </View>
              </View>
            )}

            {currentProfile?.actvitiy_time &&
              renderProfileSection(
                "My preferred workout time",
                currentProfile?.actvitiy_time
              )}
            {currentProfile?.bucket_list &&
              renderProfileSection(
                "My Fitness bucket list",
                currentProfile?.bucket_list
              )}
            {currentProfile?.hobbies &&
              renderProfileSection(
                "Outside of the gym I enjoy",
                currentProfile?.hobbies
              )}
            {currentProfile?.music_pref &&
              renderProfileSection(
                "During my workout I love to listen to",
                currentProfile?.music_pref
              )}
          </View>
        </View>
      </ScrollView>
      <View className="px-4 pb-4">
        {currentProfile?.id !== user?.id && (
          <MessageButton
            setLoading={setLoading}
            loading={loading}
            profileId={currentProfile?.id}
            coach={false}
            profilePic={currentProfile?.profile_pic || ""}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default ViewFullUserProfileFromMessages
