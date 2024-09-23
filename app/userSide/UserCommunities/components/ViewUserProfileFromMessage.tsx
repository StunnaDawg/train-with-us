import { View, Text, SafeAreaView, ScrollView } from "react-native"
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
import { FlatList } from "react-native-gesture-handler"

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

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="p-2">
        <BackButton colour="white" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-white p-2 rounded-xl">
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
          <View className="flex flex-row justify-center mt-2">
            {currentProfile?.photos_url?.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 50,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: index === currentIndex ? "black" : "gray",
                  margin: 5,
                }}
              />
            ))}
          </View>
          <View className="flex flex-row justify-between items-center mt-4">
            <Text className="text-2xl font-bold">
              {currentProfile?.first_name} {currentProfile?.last_name}
            </Text>
            <View>
              {currentProfile?.birthday ? (
                <Text className="text-2xl font-bold">
                  {calculateAge(currentProfile?.birthday)}
                </Text>
              ) : null}
              <Text>{currentProfile?.gender}</Text>
            </View>
          </View>
          <View className="flex flex-row justify-center mt-1 mb-2">
            <View className="bg-white rounded-xl p-2">
              <Text className="font-semibold">About me</Text>
              <Text>{currentProfile?.about}</Text>
            </View>
          </View>
          {currentProfile?.activities &&
          currentProfile.activities.length > 0 ? (
            <ScrollView horizontal={true}>
              <View className="flex flex-row flex-wrap  ">
                {currentProfile.activities.map((activity) => (
                  <ActivityTags key={activity} activity={activity} />
                ))}
              </View>
            </ScrollView>
          ) : null}
          {primaryGym ? (
            <View className="bg-white border-2 rounded-xl mt-2 mb-2 p-3">
              <View className="border-b">
                <Text className="font-semibold">My Primary Gym</Text>
              </View>
              <View className="mx-1">
                <PrimaryGymCard
                  community={primaryGym}
                  addPrimary={false}
                  userId={user!.id}
                />
              </View>
            </View>
          ) : null}
          {currentProfile?.actvitiy_time ? (
            <View className="flex flex-row justify-start mt-1 mb-2">
              <View className="bg-white rounded-xl p-2 w-full">
                <Text className="font-semibold">My preferred workout time</Text>
                <Text>{currentProfile.actvitiy_time}</Text>
              </View>
            </View>
          ) : null}

          {currentProfile?.bucket_list ? (
            <View className="flex flex-row mt-1 mb-2 justify-start items-center">
              <View className="bg-white rounded-xl p-2 w-full">
                <Text className="font-semibold">My Fitness bucket list</Text>
                <Text>{currentProfile.bucket_list}</Text>
              </View>
            </View>
          ) : null}

          {currentProfile?.hobbies ? (
            <View className="flex flex-row mt-1 mb-2 justify-start items-center">
              <View className="bg-white rounded-xl p-2 w-full">
                <Text className="font-semibold">
                  Outside of the gym I enjoy
                </Text>
                <Text>{currentProfile.hobbies}</Text>
              </View>
            </View>
          ) : null}

          {currentProfile?.music_pref ? (
            <View className="flex flex-row mt-1 mb-2 justify-start items-center">
              <View className="bg-white rounded-xl p-2 w-full">
                <Text className="font-semibold">
                  During my workout I love to listen to
                </Text>
                <Text>{currentProfile.music_pref}</Text>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
      <View>
        {currentProfile?.id !== user?.id ? (
          <MessageButton
            setLoading={setLoading}
            loading={loading}
            profileId={currentProfile?.id}
            coach={false}
            profilePic={currentProfile?.profile_pic || ""}
          />
        ) : null}
      </View>
    </SafeAreaView>
  )
}

export default ViewFullUserProfileFromMessages
