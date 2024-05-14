import { View, Text, Pressable, ScrollView } from "react-native"
import React, { useCallback, useState } from "react"
import { Profile } from "../../../@types/supabaseTypes"
import { FontAwesome6 } from "@expo/vector-icons"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"

type InterestsEditProps = {
  currentUserId: string
}

const InterestsEdit = ({ currentUserId }: InterestsEditProps) => {
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
  return (
    <ScrollView className="mx-7">
      <View className="border-b border-black/45 p-2">
        <Pressable
          onPress={() => {
            navigation.navigate("ActivityTimePreference")
          }}
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xl">
            Preferred Activity Time -{" "}
            {currentUserState?.actvitiy_time || "Add Time"}
          </Text>

          <FontAwesome6 name="edit" size={20} color="blue" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2">
        <Pressable
          onPress={() => {
            if (currentUserState) {
              navigation.navigate("FitnessInterests", {
                userProfile: currentUserState,
              })
            }
          }}
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xl">
            Fitness Interests - Not yet Rendered
          </Text>
          <FontAwesome6 name="edit" size={20} color="blue" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2">
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
          <Text className=" font-bold text-xl">Fitness Goals -</Text>
          <FontAwesome6 name="edit" size={20} color="blue" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2">
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
          <Text className=" font-bold text-xl">Fitness Bucket List</Text>
          <FontAwesome6 name="edit" size={20} color="blue" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2">
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
          <Text className=" font-bold text-xl">Fitness Experience Level</Text>
          <FontAwesome6 name="edit" size={20} color="blue" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2">
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
          <Text className=" font-bold text-xl">Hobbies and Interests</Text>
          <FontAwesome6 name="edit" size={20} color="blue" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2">
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
          <Text className=" font-bold text-xl">Music Preference</Text>
          <FontAwesome6 name="edit" size={20} color="blue" />
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default InterestsEdit
