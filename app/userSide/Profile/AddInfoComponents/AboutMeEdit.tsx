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
    <ScrollView className=" mx-7">
      <View className="border-b border-black/45 p-2">
        <Pressable className="flex flex-row justify-between items-center">
          <Text className=" font-bold text-xl">
            {!loading && currentUserState
              ? formatBirthdate(currentUserState.birthday)
              : "Add Birthday"}
          </Text>

          <FontAwesome6 name="edit" size={20} color="blue" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2">
        <Pressable
          onPress={() =>
            navigation.navigate("PrimaryGym", {
              userProfile: currentUserState,
            })
          }
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xl">Primary Community:</Text>
          <View className="items-center">
            <Text className=" font-bold text-xl">{PrimaryGymName}</Text>

            <FontAwesome6 name="edit" size={20} color="blue" />
          </View>
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2">
        <Pressable
          onPress={() => navigation.navigate("QuestionThree")}
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xl">
            Gender - {currentUserState?.gender || "Add Gender"}
          </Text>
          <FontAwesome6 name="edit" size={20} color="blue" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2">
        <Pressable
          onPress={() => navigation.navigate("Sexuality")}
          className="flex flex-row justify-between items-center"
        >
          <Text className=" font-bold text-xl">
            Sexuality - {currentUserState?.sexuality || "Add Sexuality"}
          </Text>
          <FontAwesome6 name="edit" size={20} color="blue" />
        </Pressable>
      </View>

      <View className="border-b border-black/45 p-2">
        <Pressable className="flex flex-row justify-between items-center">
          <Text className=" font-bold text-xl">Loaction - N/A</Text>
          <FontAwesome6 name="edit" size={20} color="blue" />
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default AboutMeEdit
