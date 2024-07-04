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
import { FontAwesome6, Foundation, FontAwesome5 } from "@expo/vector-icons"
import calculateAge from "../../../utilFunctions/calculateAge"
import ActivityTags from "../../../components/AcvitivityTags"

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
    <View className="flex-1 mx-5" style={{ height: cardHeight }}>
      {!isLast && profile ? (
        <>
          <View className="bg-white border-slate-200 rounded-md p-2">
            <View className="flex flex-row items-center p-2">
              <Text className="font-bold text-center mx-1">
                {calculateAge(profile.birthday)}
              </Text>
              <FontAwesome6 name="cake-candles" size={24} color="black" />
            </View>
            <View className="flex flex-row items-center p-2">
              <Text className="font-bold text-center mx-1">
                {profile.gender}
              </Text>
              {profile.gender === "Male" ? (
                <Foundation name="male-symbol" size={24} color="black" />
              ) : profile.gender === "Female" ? (
                <Foundation name="female-symbol" size={24} color="black" />
              ) : (
                <FontAwesome5 name="transgender-alt" size={24} color="black" />
              )}
            </View>
            <View className="flex flex-row items-center p-2">
              <View>
                <View className="flex flex-row items-center">
                  <Text className="font-bold mx-1">Fitness Interests</Text>
                  <FontAwesome6 name="person-running" size={24} color="black" />
                </View>
                <View className="flex flex-row flex-wrap mt-1">
                  {profile?.activities && profile.activities.length > 0 ? (
                    profile.activities.map((tag) => (
                      <View className="mb-1">
                        <ActivityTags key={tag} activity={`${tag}`} />
                      </View>
                    ))
                  ) : (
                    <Text>No Activities!</Text>
                  )}
                </View>
              </View>
            </View>
            <View className="flex flex-row items-center p-2">
              <Text className="font-bold text-center mx-1">
                {calculateAge(profile.birthday)}
              </Text>
              <FontAwesome6 name="cake-candles" size={24} color="black" />
            </View>
          </View>

          <View>
            <MessageButton
              setLoading={setLoading}
              loading={loading}
              profileId={profile?.id}
              coach={false}
            />
          </View>
          <View className="mt-1 mx-2">
            <UserAboutSection profile={profile} />
            <UserTopGyms
              communityName={primaryGymName}
              borderB={false}
              mt={false}
            />
          </View>
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
{
  /* <Pressable
              onPress={() =>
                navigation.navigate("ViewFullUserProfile", {
                  user: profile,
                })
              }
            >
              <Text>View Profile</Text>
            </Pressable> */
}
