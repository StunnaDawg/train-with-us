import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  Animated,
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"
import MessageButton from "./components/MessageButton"
import calculateAge from "../../utilFunctions/calculateAge"
import ActivityTags from "../../components/AcvitivityTags"
import { Communities } from "../../@types/supabaseTypes"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"
import { useAuth } from "../../supabaseFunctions/authcontext"
import PrimaryGymCard from "./components/PrimaryGymCard"
import SinglePicCommunity from "../../components/SinglePicCommunity"
import BackButton from "../../components/BackButton"

const ViewFullUserProfile = () => {
  const { user } = useAuth()
  const [primaryGym, setPrimaryGym] = useState<Communities | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const route = useRoute<RouteProp<RootStackParamList, "ViewFullUserProfile">>()
  const profile = route.params.user
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
    const getPrimaryGymName = async () => {
      if (profile?.primary_gym === null) {
        setPrimaryGym(null)
        return
      }
      getSingleCommunity(setLoading, profile?.primary_gym, setPrimaryGym)
    }

    getPrimaryGymName()
  }, [profile])

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
            data={profile?.photos_url}
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
            {profile?.photos_url?.map((_, index) => (
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
                {profile?.first_name} {profile?.last_name}
              </Text>
              <View className="bg-primary-100 px-3 py-1 rounded-full">
                <Text className="text-xl font-semibold text-primary-600">
                  {calculateAge(profile.birthday)}
                </Text>
                <Text className="text-sm text-primary-500 text-center">
                  {profile.gender}
                </Text>
              </View>
            </View>
            {profile.about && (
              <View className="mb-4">
                <Text className="text-lg font-semibold text-gray-700 mb-2">
                  About me
                </Text>
                <Text className="text-gray-600">{profile.about}</Text>
              </View>
            )}
            {profile?.activities && profile.activities.length > 0 && (
              <View className="mb-4">
                <Text className="text-lg font-semibold text-gray-700 mb-2">
                  Activities
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <View className="flex flex-row">
                    {profile.activities.map((activity) => (
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
                <PrimaryGymCard
                  community={primaryGym}
                  addPrimary={false}
                  userId={user!.id}
                />
              </View>
            )}
            {profile.actvitiy_time &&
              renderProfileSection(
                "My preferred workout time",
                profile.actvitiy_time || ""
              )}
            {profile.bucket_list &&
              renderProfileSection(
                "My Fitness bucket list",
                profile.bucket_list || ""
              )}
            {profile.hobbies &&
              renderProfileSection(
                "Outside of the gym I enjoy",
                profile.hobbies || ""
              )}
            {profile.music_pref &&
              renderProfileSection(
                "During my workout I love to listen to",
                profile.music_pref || ""
              )}
          </View>
        </View>
      </ScrollView>
      <View className="px-4 pb-4">
        {profile.id !== user?.id && (
          <MessageButton
            setLoading={setLoading}
            loading={loading}
            profileId={profile?.id}
            coach={false}
            profilePic={profile?.profile_pic || ""}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const renderProfileSection = (title: string, content: string | undefined) => {
  if (!content) return null
  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold text-gray-700 mb-2">{title}</Text>
      <Text className="text-gray-600">{content}</Text>
    </View>
  )
}

export default ViewFullUserProfile
