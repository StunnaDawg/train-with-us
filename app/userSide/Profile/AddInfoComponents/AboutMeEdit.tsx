import { View, Text, Pressable, ScrollView } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { Profile } from "../../../@types/supabaseTypes"
import formatBirthdate from "../../../utilFunctions/calculateDOB"
import { FontAwesome6 } from "@expo/vector-icons"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import returnCommunityName from "../../../utilFunctions/returnCommunityName"

type AboutMeEditProps = {
  currentUserId: string
}

const AboutMeEdit = ({ currentUserId }: AboutMeEditProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [currentUserState, setCurrentUserState] = useState<Profile | null>(null)
  const [PrimaryGymName, setPrimaryGymName] = useState<string>("")
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
    <View className="m-3">
      <View className="px-2">
        <Text className="text-sm text-slate-400 font-bold">Basic Info</Text>
      </View>
      <View className="border-b border-black/45 p-2 py-3">
        <Pressable
          onPress={() => {
            if (currentUserState) {
              navigation.navigate("EditBio", {
                userProfile: currentUserState,
              })
            }
          }}
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xs">About Me</Text>
          <FontAwesome6 name="edit" size={16} color="gray" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2 py-3">
        <Pressable className="flex flex-row justify-between items-center">
          <Text className=" font-bold text-xs">
            {!loading && currentUserState
              ? formatBirthdate(currentUserState.birthday)
              : "Add Birthday"}
          </Text>
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2 py-3">
        <Pressable
          onPress={() => navigation.navigate("QuestionThree")}
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xs">
            Gender - {currentUserState?.gender || "Add Gender"}
          </Text>
          <FontAwesome6 name="edit" size={16} color="gray" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2 py-3">
        <Pressable
          onPress={() => navigation.navigate("SexualityEdit")}
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xs">
            Sexuality - {currentUserState?.sexuality || "Add Sexuality"}
          </Text>
          <FontAwesome6 name="edit" size={16} color="gray" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2 py-3">
        <Pressable className="flex flex-row justify-between items-center">
          <Text className=" font-bold text-xs">Location - Halifax NS</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default AboutMeEdit
