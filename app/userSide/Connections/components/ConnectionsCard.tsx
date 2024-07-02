import { View, Text, Platform, Dimensions, Pressable } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import PhotoArray from "./PhotoArray"
import ActivitySection from "../../Profile/components/ActivitySection"
import UserAboutSection from "../../Profile/components/UserAboutSection"
import UserTopGyms from "../../Profile/components/UserTopGyms"
import MessageButton from "./MessageButton"
import { Profile } from "../../../@types/supabaseTypes"
import returnCommunityName from "../../../utilFunctions/returnCommunityName"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

type ConnectionsCardProps = {
  profile?: Profile | null
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  isLast: boolean
  setScroll: Dispatch<SetStateAction<boolean>>
}

const ConnectionsCard = ({
  profile,
  loading,
  setLoading,
  isLast,
  setScroll,
}: ConnectionsCardProps) => {
  const [primaryGymName, setPrimaryGymName] = useState<string>("")
  const screenHeight = Dimensions.get("window").height
  const cardHeight = Platform.OS == "android" ? screenHeight * 0.75 : 600
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
    <View className="flex-1" style={{ height: cardHeight }}>
      {!isLast && profile ? (
        <>
          <View className="flex flex-row justify-center mt-1 mb-2">
            <Text className="text-xl font-bold">
              {profile?.first_name} {profile?.last_name}
            </Text>
          </View>
          <View>
            <PhotoArray
              index1={0}
              index2={1}
              index3={2}
              profileId={profile?.id}
            />
          </View>

          <View>
            <MessageButton
              setLoading={setLoading}
              loading={loading}
              profileId={profile?.id}
              coach={false}
            />
            <Pressable
              onPress={() =>
                navigation.navigate("ViewFullUserProfile", {
                  user: profile,
                })
              }
            >
              <Text>View Profile</Text>
            </Pressable>
          </View>
          <View className="mt-1 mx-2">
            <UserAboutSection profile={profile} />
            <UserTopGyms
              communityName={primaryGymName}
              borderB={false}
              mt={false}
            />
          </View>

          <View className="mt-1">
            <PhotoArray
              index1={3}
              index2={4}
              index3={5}
              profileId={profile?.id}
            />
          </View>

          {profile?.activities?.length && profile?.activities?.length > 0 && (
            <View className="flex flex-row items-center">
              <ActivitySection profile={profile} />
            </View>
          )}
        </>
      ) : (
        <>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text className="font-bold text-lg">No New Users left!</Text>
            <Text className="font-semibold text-sm">Come back later</Text>
          </View>
        </>
      )}
    </View>
  )
}

export default ConnectionsCard
