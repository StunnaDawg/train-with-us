import { View, Text, SafeAreaView, TextInput, Pressable } from "react-native"
import React, { useState } from "react"
import NewPhoto from "../../components/NewPhoto"
import BasicButton from "../../components/BasicButton"
import addNewCommunity from "../../supabaseFunctions/addFuncs/addNewCommunity"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { NavigationType } from "../../@types/navigation"
import { useNavigation } from "@react-navigation/native"

const CreateCommunity = () => {
  const { user } = useAuth()
  const [communityName, setCommunityName] = useState("")
  const [communityStyle, setCommunityStyle] = useState("")
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NavigationType>()

  const createCommunity = () => {
    if (user === null) return
    addNewCommunity(setLoading, communityName, user!.id, communityStyle)
    navigation.goBack()
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center">
        <Text className="font-bold text-2xl">Create your Community</Text>
      </View>

      <View>
        <NewPhoto type="community" />
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
        <BasicButton text="Create Community" buttonFunction={createCommunity} />
      </View>
    </SafeAreaView>
  )
}

export default CreateCommunity
