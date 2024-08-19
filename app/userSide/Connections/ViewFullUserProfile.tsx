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
          <View className="flex flex-row justify-center mt-2">
            {profile?.photos_url?.map((_, index) => (
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
              {profile?.first_name} {profile?.last_name}
            </Text>
            <View>
              <Text className="text-2xl font-bold">
                {calculateAge(profile.birthday)}
              </Text>
              <Text>{profile.gender}</Text>
            </View>
          </View>
          {profile.about ? (
            <View className="flex flex-row justify-center mt-1 mb-2">
              <View className="bg-white rounded-xl p-2">
                <Text className="font-semibold">About me</Text>
                <Text>{profile.about}</Text>
              </View>
            </View>
          ) : null}
          {profile?.activities && profile.activities.length > 0 ? (
            <ScrollView horizontal={true}>
              <View className="flex flex-row flex-wrap  ">
                {profile.activities.map((activity) => (
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
          {profile.actvitiy_time ? (
            <View className="flex flex-row justify-start mt-1 mb-2">
              <View className="bg-white rounded-xl p-2 w-full">
                <Text className="font-semibold">My preferred workout time</Text>
                <Text>{profile.actvitiy_time}</Text>
              </View>
            </View>
          ) : null}

          {profile.bucket_list ? (
            <View className="flex flex-row mt-1 mb-2 justify-start items-center">
              <View className="bg-white rounded-xl p-2 w-full">
                <Text className="font-semibold">My Fitness bucket list</Text>
                <Text>{profile.bucket_list}</Text>
              </View>
            </View>
          ) : null}

          {profile.hobbies ? (
            <View className="flex flex-row mt-1 mb-2 justify-start items-center">
              <View className="bg-white rounded-xl p-2 w-full">
                <Text className="font-semibold">
                  Outside of the gym I enjoy
                </Text>
                <Text>{profile.hobbies}</Text>
              </View>
            </View>
          ) : null}

          {profile.music_pref ? (
            <View className="flex flex-row mt-1 mb-2 justify-start items-center">
              <View className="bg-white rounded-xl p-2 w-full">
                <Text className="font-semibold">
                  During my workout I love to listen to
                </Text>
                <Text>{profile.music_pref}</Text>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
      <View>
        {profile.id !== user?.id ? (
          <MessageButton
            setLoading={setLoading}
            loading={loading}
            profileId={profile?.id}
            coach={false}
            profilePic={profile?.profile_pic || ""}
          />
        ) : null}
      </View>
    </SafeAreaView>
  )
}

export default ViewFullUserProfile
