import { View, Text } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import PhotoArray from "./PhotoArray"
import ActivitySection from "../../Profile/components/ActivitySection"
import UserAboutSection from "../../Profile/components/UserAboutSection"
import UserTopGyms from "../../Profile/components/UserTopGyms"
import MessageButton from "./MessageButton"
import { Profile } from "../../../@types/supabaseTypes"
import returnCommunityName from "../../../utilFunctions/returnCommunityName"
import GenericButton from "../../../components/GenericButton"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

// Shares components with profile page

type ConnectionsCardProps = {
  profile: Profile | null
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

const ConnectionsCard = ({
  profile,
  loading,
  setLoading,
}: ConnectionsCardProps) => {
  const [primaryGymName, setPrimaryGymName] = useState<string>("")
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    const getPrimaryGymName = async () => {
      if (profile?.primary_gym === null) {
        setPrimaryGymName("No Primary Gym")
        return
      }
      const PrimaryGymName = await returnCommunityName(profile?.primary_gym)
      setPrimaryGymName(PrimaryGymName)
    }

    getPrimaryGymName()
  }, [profile])
  return (
    <View style={{ height: 1000 }}>
      <View className="flex flex-row justify-center mt-1 mb-2">
        <Text className="text-2xl font-bold">
          {profile?.first_name} {profile?.last_name}
        </Text>
      </View>
      <View>
        <PhotoArray index1={0} index2={1} index3={2} profileId={profile?.id} />
      </View>

      <View>
        <MessageButton
          setLoading={setLoading}
          loading={loading}
          profileId={profile?.id}
          coach={false}
        />

        <View className="flex flex-row justify-center">
          <GenericButton
            colourDefault="bg-transparent"
            borderColourDefault="black"
            text="View Full Profile"
            roundness="rounded-full"
            colourPressed="bg-blue-500"
            borderColourPressed="bg-blue-800"
            buttonFunction={() => {
              if (profile)
                navigation.navigate("ViewFullUserProfile", {
                  user: profile,
                })
            }}
          />
        </View>
      </View>

      <View>
        <UserTopGyms
          communityName={primaryGymName}
          borderB={false}
          mt={false}
        />
      </View>

      {profile?.activities?.length && profile?.activities?.length > 0 && (
        <View className="flex flex-row items-center">
          <View className="ml-7">
            <Text className="font-medium text-lg">My Styles of Fitness:</Text>
          </View>
          <ActivitySection profile={profile} />
        </View>
      )}

      <View className="mt-1">
        <PhotoArray index1={3} index2={4} index3={5} profileId={profile?.id} />
      </View>

      <View>
        <UserAboutSection profile={profile} />
      </View>
    </View>
  )
}

export default ConnectionsCard
