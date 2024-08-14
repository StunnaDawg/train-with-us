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
      const PrimaryGymName = await returnCommunityName(
        currentUserState?.primary_gym
      )
      setPrimaryGymName(PrimaryGymName)
    }

    getPrimaryGymName()
  }, [currentUserState])
  return (
    <View className="m-3">
      <View className="px-2">
        <Text className="text-sm text-slate-400 font-bold">
          Fitness related Info
        </Text>
      </View>
      <View className="border-b border-black/45 p-2 py-3">
        <Pressable
          onPress={() =>
            navigation.navigate("PrimaryGym", {
              userProfile: currentUserState,
            })
          }
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xs">Primary Community:</Text>
          <Text className=" font-bold text-xs">{PrimaryGymName}</Text>
          <View />
          <View />
          <View />
          <View className="items-center">
            <FontAwesome6 name="edit" size={16} color="gray" />
          </View>
        </Pressable>
      </View>
      <View className="border-b border-black/45 p-2 py-3">
        <Pressable
          onPress={() => {
            navigation.navigate("ActivityTimePreference")
          }}
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xs">
            Preferred Activity Time -{" "}
            {currentUserState?.actvitiy_time || "Add Time"}
          </Text>

          <FontAwesome6 name="edit" size={16} color="gray" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2 py-3">
        <Pressable
          onPress={() => {
            if (currentUserState) {
              navigation.navigate("EditFitnessInterests", {
                userProfile: currentUserState,
              })
            }
          }}
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xs">
            Fitness Interests - Not yet Rendered
          </Text>
          <FontAwesome6 name="edit" size={16} color="gray" />
        </Pressable>
      </View>

      {/* <View className="border-b border-black/45 p-2">
        <Pressable
          onPress={() => {
            if (currentUserState) {
              navigation.navigate("FitnessGoals", {
                userProfile: currentUserState,
              })
            }
          }}
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xs">Fitness Goals -</Text>
          <FontAwesome6 name="edit" size={16} color="gray" />
        </Pressable>
      </View> */}

      <View className="border-b border-black/45 p-2 py-3">
        <Pressable
          onPress={() => {
            if (currentUserState) {
              navigation.navigate("FitnessBucketList", {
                userProfile: currentUserState,
              })
            }
          }}
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xs">Fitness Bucket List</Text>
          <FontAwesome6 name="edit" size={16} color="gray" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2 py-3">
        <Pressable
          onPress={() => {
            if (currentUserState) {
              navigation.navigate("FitnessLevel", {
                userProfile: currentUserState,
              })
            }
          }}
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xs">Fitness Experience Level</Text>
          <FontAwesome6 name="edit" size={16} color="gray" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2 py-3">
        <Pressable
          onPress={() => {
            if (currentUserState) {
              navigation.navigate("Hobbies", {
                userProfile: currentUserState,
              })
            }
          }}
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xs">Hobbies</Text>
          <FontAwesome6 name="edit" size={16} color="gray" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2 py-3">
        <Pressable
          onPress={() => {
            if (currentUserState) {
              navigation.navigate("MusicPreference", {
                userProfile: currentUserState,
              })
            }
          }}
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xs">Music Preference</Text>
          <FontAwesome6 name="edit" size={16} color="gray" />
        </Pressable>
      </View>
    </View>
  )
}

export default InterestsEdit
