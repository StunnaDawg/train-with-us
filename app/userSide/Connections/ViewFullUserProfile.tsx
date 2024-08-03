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
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
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

  useEffect(() => {
    if (profile?.photos_url === null || undefined) return
    setImageFiles(profile?.photos_url)
  }, [profile])

  return (
    <SafeAreaView className="flex-1 mx-2">
      <BackButton />
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
            data={imageFiles}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ width: imageWidth, alignItems: "center" }}>
                <SinglePicCommunity
                  size={imageWidth}
                  avatarRadius={10}
                  noAvatarRadius={10}
                  item={item}
                />
              </View>
            )}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
          <View className="flex flex-row justify-center mt-2">
            {imageFiles?.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: index === currentIndex ? "blue" : "gray",
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
        </View>

        <View className="flex flex-row justify-center mt-1 mb-2">
          <View className="bg-white rounded-xl p-2">
            <Text className="text-lg font-bold">About me</Text>
            <Text className="font-semibold">{profile.about}</Text>
          </View>
        </View>

        {profile?.activities && profile.activities.length > 0 ? (
          <View className="flex flex-row justify-center mt-1 mb-2">
            <View className="bg-white rounded-xl p-2">
              <Text className="text-lg font-bold">My Interests</Text>
              <View className="flex flex-row flex-wrap mt-3 ml-2 mr-7">
                {profile.activities.map((activity) => (
                  <ActivityTags key={activity} activity={activity} />
                ))}
              </View>
            </View>
          </View>
        ) : null}

        {primaryGym ? (
          <View className="bg-white rounded-xl mt-1 mb-2 p-3">
            <View className="border-b">
              <Text className="text-lg font-bold">My Primary Gym</Text>
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
              <Text className="text-lg font-bold">
                My preferred workout time
              </Text>
              <Text className="font-semibold">{profile.actvitiy_time}</Text>
            </View>
          </View>
        ) : null}

        {profile.bucket_list ? (
          <View className="flex flex-row mt-1 mb-2 justify-start items-center">
            <View className="bg-white rounded-xl p-2 w-full">
              <Text className="text-lg font-bold">My Fitness bucket list</Text>
              <Text className="font-semibold">{profile.bucket_list}</Text>
            </View>
          </View>
        ) : null}

        {profile.hobbies ? (
          <View className="flex flex-row mt-1 mb-2 justify-start items-center">
            <View className="bg-white rounded-xl p-2 w-full">
              <Text className="text-lg font-bold">
                Outside of the gym I enjoy
              </Text>
              <Text className="font-semibold">{profile.hobbies}</Text>
            </View>
          </View>
        ) : null}

        {profile.music_pref ? (
          <View className="flex flex-row mt-1 mb-2 justify-start items-center">
            <View className="bg-white rounded-xl p-2 w-full">
              <Text className="text-lg font-bold">
                During my workout I love to listen to
              </Text>
              <Text className="font-semibold">{profile.music_pref}</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
      <View>
        <MessageButton
          setLoading={setLoading}
          loading={loading}
          profileId={profile?.id}
          coach={false}
        />
      </View>
    </SafeAreaView>
  )
}

export default ViewFullUserProfile
