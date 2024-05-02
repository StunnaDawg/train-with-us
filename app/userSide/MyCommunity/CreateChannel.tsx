import { View, Text, SafeAreaView, TextInput, Pressable } from "react-native"
import React, { useState } from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import supabase from "../../../lib/supabase"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { useNavigation } from "@react-navigation/native"

type ChannelTypeOption = "Text" | "Annoucement" | "Forum"

const CreateChannel = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedChannelType, setChannelType] =
    useState<ChannelTypeOption>("Text")
  const [channelName, setChannelName] = useState<string>("")
  const route = useRoute<RouteProp<RootStackParamList, "CreateChannel">>()
  const communityId = route.params.communityId
  const navigation = useNavigation()

  const handleSelectType = (type: ChannelTypeOption) => {
    setChannelType(selectedChannelType === type ? "Text" : type)
  }

  const handleChannelCreation = async () => {
    // create channel
    try {
      setLoading(true)
      if (communityId === null) throw new Error("Community ID is null")
      const { error } = await supabase.from("community_channels").insert([
        {
          channel_title: channelName,
          channel_type: selectedChannelType,
          community_owner: user?.id,
          community: communityId,
        },
      ])

      if (error) throw error
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const channelOptions: ChannelTypeOption[] = ["Text", "Annoucement", "Forum"]
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-between border-b w-full p-3">
        <Text className="text-2xl font-semibold">Create Channel</Text>

        <Pressable
          onPress={async () => {
            await handleChannelCreation()
            navigation.goBack()
          }}
        >
          <Text className="text-lg font-bold underline">Done</Text>
        </Pressable>
      </View>
      <View className="border w-full rounded-none p-3">
        <TextInput
          value={channelName}
          onChangeText={(text: string) => setChannelName(text)}
          placeholder="new-channel"
        />
      </View>

      <View className="w-full rounded-none p-3 mt-5">
        <Text className="text-lg font-bold">Channel Type</Text>

        {channelOptions.map((type, index) => (
          <View key={index} className="flex flex-row justify-between m-2">
            <Text className="text-lg font-bold">#{type}</Text>
            <BouncyCheckbox
              isChecked={selectedChannelType === type}
              onPress={() => handleSelectType(type)}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default CreateChannel
