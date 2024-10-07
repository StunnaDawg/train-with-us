import { View, Text, Pressable, ScrollView } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { Profile } from "../../../@types/supabaseTypes"
import formatBirthdate from "../../../utilFunctions/calculateDOB"
import { FontAwesome6 } from "@expo/vector-icons"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
type AboutMeEditProps = {
  currentUserId: string
}

const AboutMeEdit = ({ currentUserId }: AboutMeEditProps) => {
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
      <Text className="text-lg font-bold mb-4">Basic Info</Text>
      {renderInfoItem("About Me", currentUserState?.about || "", () => {
        if (currentUserState) {
          navigation.navigate("EditBio", { userProfile: currentUserState })
        }
      })}
      {renderInfoItem(
        "Birthday",
        currentUserState
          ? formatBirthdate(currentUserState.birthday)
          : undefined,
        () => {}
      )}
      {renderInfoItem("Gender", currentUserState?.gender || "", () =>
        navigation.navigate("EditGender")
      )}
      {renderInfoItem("Sexuality", currentUserState?.sexuality || "", () =>
        navigation.navigate("SexualityEdit")
      )}
      {renderInfoItem("Location", "Halifax NS", () => {})}
    </View>
  )
}

export default AboutMeEdit
