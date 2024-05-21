import { View, Text, SafeAreaView, TextInput, Pressable } from "react-native"
import React, { useState } from "react"
import NewPhoto from "../../components/NewPhoto"
import BasicButton from "../../components/BasicButton"
import addNewCommunity from "../../supabaseFunctions/addFuncs/addNewCommunity"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { NavigationType } from "../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import { add } from "date-fns"
import supabase from "../../../lib/supabase"

const CreateCommunity = () => {
  const { user } = useAuth()
  const [communityName, setCommunityName] = useState("")
  const [communityStyle, setCommunityStyle] = useState("")

  const [communityProfilePic, setCommunityProfilePic] =
    useState<ImagePicker.ImagePickerAsset>({} as ImagePicker.ImagePickerAsset)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NavigationType>()

  const addNewCommunityToUser = async (communityId: string) => {
    const { error } = await supabase.from("profiles").upsert({
      id: user?.id,
      community_created: communityId,
    })

    if (error) throw error
  }

  const createCommunity = async () => {
    if (user === null) return
    const id = await addNewCommunity(
      setLoading,
      communityProfilePic,
      communityName,
      user!.id,
      communityStyle
    )

    await addNewCommunityToUser(id)
    navigation.goBack()
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center">
        <Text className="font-bold text-2xl">Create your Community</Text>
      </View>

      <View>
        <NewPhoto setProfilePic={setCommunityProfilePic} />
      </View>

      <View className="flex flex-row mx-5">
        <View>
          <Text className="font-medium text-lg">Community Name</Text>
          <View className="border rounded-lg p-2 w-full">
            <TextInput
              value={communityName} // Binds the TextInput value to the state
              onChangeText={setCommunityName}
            />
          </View>
          <Text className="font-medium text-lg">Community Style</Text>
          <View className="border rounded-lg p-2 w-full">
            <TextInput
              value={communityStyle} // Binds the TextInput value to the state
              onChangeText={setCommunityStyle}
            />
          </View>

          <Text className="font-medium text-sm">
            By creating a server, you agree to Train With Us's{" "}
            <Pressable>
              <Text className="text-blue-600 underline">
                Community Guidlines
              </Text>
            </Pressable>
          </Text>
        </View>
      </View>
      <View className="flex flex-row justify-center my-2">
        <BasicButton
          text="Create Community"
          buttonFunction={async () => {
            await createCommunity()
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default CreateCommunity
