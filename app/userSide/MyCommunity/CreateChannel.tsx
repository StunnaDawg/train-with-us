import { View, Text, SafeAreaView, TextInput, Pressable } from "react-native"
import React, { useState } from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import supabase from "../../../lib/supabase"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { useNavigation } from "@react-navigation/native"
import NewPhoto from "../../components/NewPhoto"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { decode } from "base64-arraybuffer"
import BackButton from "../../components/BackButton"
import Loading from "../../components/Loading"

type ChannelTypeOption = "Text" | "Annoucement" | "Forum"

const CreateChannel = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [channelPic, setChannelPic] = useState<ImagePicker.ImagePickerAsset>(
    {} as ImagePicker.ImagePickerAsset
  )
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

      const base64 = await FileSystem.readAsStringAsync(channelPic.uri, {
        encoding: "base64",
      })
      const filePath = `${user?.id}/channels/${new Date().getTime()}.${
        channelPic.type === "image"
      }`
      const contentType = "image/png"
      await supabase.storage.from("photos").upload(filePath, decode(base64), {
        contentType: contentType,
      })

      const { error } = await supabase.from("community_channels").insert([
        {
          channel_title: channelName,
          channel_type: selectedChannelType,
          community_owner: user?.id,
          community: communityId,
          channel_pic: filePath,
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
      {!loading ? (
        <>
          <View className="flex flex-row justify-between w-full p-3">
            <View className="flex flex-row items-center">
              <BackButton />
              <Text className="text-lg font-semibold mx-3">Create Channel</Text>
            </View>

            <Pressable
              onPress={async () => {
                await handleChannelCreation()
                navigation.goBack()
              }}
            >
              <Text className="text-lg font-bold underline">Done</Text>
            </Pressable>
          </View>

          <NewPhoto setProfilePic={setChannelPic} />
          <View className="border w-full rounded-none p-3">
            <TextInput
              value={channelName}
              onChangeText={(text: string) => setChannelName(text)}
              placeholder="new-channel"
            />
          </View>

          <View className="w-full rounded-none p-3 mt-5">
            <Text className="text-sm font-bold">Channel Type</Text>

            {channelOptions.map((type, index) => (
              <View key={index} className="flex flex-row justify-between m-2">
                <Text className="text-sm font-bold">#{type}</Text>
                <BouncyCheckbox
                  size={20}
                  isChecked={selectedChannelType === type}
                  onPress={() => handleSelectType(type)}
                />
              </View>
            ))}
          </View>
        </>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  )
}

export default CreateChannel
