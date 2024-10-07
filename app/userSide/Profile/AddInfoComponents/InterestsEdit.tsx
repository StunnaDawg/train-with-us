import { View, Text, Pressable, ScrollView } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { Profile } from "../../../@types/supabaseTypes"
import { FontAwesome6 } from "@expo/vector-icons"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import returnCommunityName from "../../../utilFunctions/returnCommunityName"

type InterestsEditProps = {
  currentUserId: string
}

const InterestsEdit = ({ currentUserId }: InterestsEditProps) => {
  const [PrimaryGymName, setPrimaryGymName] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [currentUserState, setCurrentUserState] = useState<Profile | null>(null)
  const navigation = useNavigation<NavigationType>()

  useFocusEffect(
    useCallback(() => {
      const getUser = async () => {
        setLoading(true)
        await useCurrentUser(currentUserId, setCurrentUserState)
        setLoading(false)
      }

      getUser()

      return () => {
        // Optional cleanup actions
      }
    }, [currentUserId, setCurrentUserState])
  )

  useEffect(() => {
    const getPrimaryGymName = async () => {
      if (!currentUserState?.primary_gym) return
      const PrimaryGymNameVar = await returnCommunityName(
        currentUserState?.primary_gym
      )
      setPrimaryGymName(PrimaryGymNameVar)
    }

    getPrimaryGymName()
  }, [currentUserState])

  const renderInfoItem = (
    label: string,
    value: string | undefined,
    onPress: () => void
  ) => (
    <Pressable
      onPress={onPress}
      className="flex-row justify-between items-center border-b border-gray-200 py-4"
    >
      <View>
        <Text className="text-sm font-medium text-gray-600">{label}</Text>
        <Text className="text-base font-semibold mt-1">{value || "Add"}</Text>
      </View>
      <FontAwesome6 name="chevron-right" size={16} color="gray" />
    </Pressable>
  )

  return (
    <View className="bg-white rounded-lg shadow-sm mx-4 my-2 p-4">
      <Text className="text-lg font-bold mb-4">Fitness & Interests</Text>
      {renderInfoItem("Primary Community", PrimaryGymName, () =>
        navigation.navigate("PrimaryGym", { userProfile: currentUserState })
      )}
      {renderInfoItem(
        "Preferred Activity Time",
        currentUserState?.actvitiy_time || "",
        () => navigation.navigate("ActivityTimePreference")
      )}
      {renderInfoItem("Fitness Interests", "Not yet Rendered", () => {
        if (currentUserState) {
          navigation.navigate("EditFitnessInterests", {
            userProfile: currentUserState,
          })
        }
      })}
      {renderInfoItem(
        "Fitness Bucket List",
        currentUserState?.bucket_list || "",
        () => {
          if (currentUserState) {
            navigation.navigate("FitnessBucketList", {
              userProfile: currentUserState,
            })
          }
        }
      )}
      {renderInfoItem(
        "Fitness Experience Level",
        currentUserState?.fitness_lvl || "",
        () => {
          if (currentUserState) {
            navigation.navigate("FitnessLevel", {
              userProfile: currentUserState,
            })
          }
        }
      )}
      {renderInfoItem("Hobbies", currentUserState?.hobbies || "", () => {
        if (currentUserState) {
          navigation.navigate("Hobbies", { userProfile: currentUserState })
        }
      })}
      {renderInfoItem(
        "Music Preference",
        currentUserState?.music_pref || "",
        () => {
          if (currentUserState) {
            navigation.navigate("MusicPreference", {
              userProfile: currentUserState,
            })
          }
        }
      )}
    </View>
  )
}

export default InterestsEdit
