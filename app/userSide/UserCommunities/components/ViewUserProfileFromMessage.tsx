import { View, Text, SafeAreaView, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"

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

const ViewFullUserProfileFromMessages = () => {
  const { user } = useAuth()
  const [primaryGym, setPrimaryGym] = useState<Communities | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const route =
    useRoute<RouteProp<RootStackParamList, "ViewFullUserProfileFromMessages">>()
  const profile = route.params.userId

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
                {currentProfile?.first_name} {currentProfile?.last_name}
              </Text>
              <View>
                <Text className="text-2xl font-bold">
                  {currentProfile
                    ? calculateAge(currentProfile.birthday)
                    : null}
                </Text>
                <Text>{currentProfile ? currentProfile.gender : null}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex flex-row justify-center mt-1 mb-2">
          <View className="bg-white rounded-xl p-2">
            <Text className="text-lg font-bold">About me</Text>
            <Text className="font-semibold">{currentProfile?.about}</Text>
          </View>
        </View>

        {currentProfile?.activities && currentProfile.activities.length > 0 ? (
          <View className="flex flex-row justify-center mt-1 mb-2">
            <View className="bg-white rounded-xl p-2">
              <Text className="text-lg font-bold">My Interests</Text>
              <View className="flex flex-row flex-wrap mt-3 ml-2 mr-7">
                {currentProfile.activities.map((activity) => (
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

        {currentProfile?.actvitiy_time ? (
          <View className="flex flex-row justify-start mt-1 mb-2">
            <View className="bg-white rounded-xl p-2 w-full">
              <Text className="text-lg font-bold">
                My preferred workout time
              </Text>
              <Text className="font-semibold">
                {currentProfile.actvitiy_time}
              </Text>
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
        {currentProfile?.bucket_list ? (
          <View className="flex flex-row mt-1 mb-2 justify-start items-center">
            <View className="bg-white rounded-xl p-2 w-full">
              <Text className="text-lg font-bold">My Fitness bucket list</Text>
              <Text className="font-semibold">
                {currentProfile.bucket_list}
              </Text>
            </View>
          </View>
        ) : null}

        {currentProfile?.hobbies ? (
          <View className="flex flex-row mt-1 mb-2 justify-start items-center">
            <View className="bg-white rounded-xl p-2 w-full">
              <Text className="text-lg font-bold">
                Outside of the gym I enjoy
              </Text>
              <Text className="font-semibold">{currentProfile?.hobbies}</Text>
            </View>
          </View>
        ) : null}

        {currentProfile?.music_pref ? (
          <View className="flex flex-row mt-1 mb-2 justify-start items-center">
            <View className="bg-white rounded-xl p-2 w-full">
              <Text className="text-lg font-bold">
                During my workout I love to listen to
              </Text>
              <Text className="font-semibold">
                {currentProfile?.music_pref}
              </Text>
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
          profileId={currentProfile?.id}
          coach={false}
        />
      </View>
    </SafeAreaView>
  )
}

export default ViewFullUserProfileFromMessages
