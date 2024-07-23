import { View, Text, SafeAreaView, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
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

const ViewFullUserProfile = () => {
  const { user } = useAuth()
  const [primaryGym, setPrimaryGym] = useState<Communities | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const route = useRoute<RouteProp<RootStackParamList, "ViewFullUserProfile">>()
  const profile = route.params.user

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row justify-center mt-1 mb-2 ">
          <View className="bg-white rounded-xl p-2">
            <SinglePicCommunity
              size={250}
              avatarRadius={10}
              noAvatarRadius={10}
              item={imageFiles?.[0]}
            />
            <View className="flex flex-row justify-between items-center">
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

        {imageFiles?.[1] ? (
          <View className="flex flex-row justify-center mt-1 mb-2">
            <View className="bg-white rounded-xl p-2">
              <SinglePicCommunity
                size={250}
                avatarRadius={10}
                noAvatarRadius={10}
                item={imageFiles?.[1]}
              />
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

        {imageFiles?.[2] ? (
          <View className="flex flex-row justify-center mt-1 mb-2">
            <View className="bg-white rounded-xl p-2">
              <SinglePicCommunity
                size={250}
                avatarRadius={10}
                noAvatarRadius={10}
                item={imageFiles?.[2]}
              />
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

        {imageFiles?.[3] ? (
          <View className="flex flex-row justify-center mt-1 mb-2">
            <View className="bg-white rounded-xl p-2">
              <SinglePicCommunity
                size={250}
                avatarRadius={10}
                noAvatarRadius={10}
                item={imageFiles?.[2]}
              />
            </View>
          </View>
        ) : null}

        {imageFiles?.[4] ? (
          <View className="flex flex-row justify-center mt-1 mb-2">
            <View className="bg-white rounded-xl p-2">
              <SinglePicCommunity
                size={250}
                avatarRadius={10}
                noAvatarRadius={10}
                item={imageFiles?.[2]}
              />
            </View>
          </View>
        ) : null}

        {imageFiles?.[5] ? (
          <View className="flex flex-row justify-center mt-1 mb-2">
            <View className="bg-white rounded-xl p-2">
              <SinglePicCommunity
                size={250}
                avatarRadius={10}
                noAvatarRadius={10}
                item={imageFiles?.[2]}
              />
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
