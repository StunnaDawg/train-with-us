import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import EnhancedTextInput from "../../../components/TextInput"
import NextButton from "../../../components/NextButton"
import supabase from "../../../../lib/supabase"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import BackButton from "../../../components/BackButton"
import EditProfileTopBar from "./EditProfileTopBar"

const AddBio = () => {
  const route = useRoute<RouteProp<RootStackParamList, "EditBio">>()
  const userProfile = route.params.userProfile

  const navigation = useNavigation<NavigationType>()

  const [bio, setBio] = useState<string>("")

  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: userProfile.id, about: bio })

      if (error) throw error

      navigation.goBack()
    } catch (error) {
      console.error("Failed to update community preferences:", error)
    }
  }

  useEffect(() => {
    if (userProfile?.about) setBio(userProfile?.about)
  }, [userProfile])
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View>
        <View>
          <EditProfileTopBar
            text="Write a bio!"
            functionProp={async () => await handleUserUpdate()}
          />

          <View className="flex flex-row justify-center">
            <EnhancedTextInput
              text={bio}
              setText={setBio}
              placeholder="Looking for a great community!"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddBio
