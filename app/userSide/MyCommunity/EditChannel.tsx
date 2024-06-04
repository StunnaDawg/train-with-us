import { View, Text, SafeAreaView, TextInput } from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import BackButton from "../../components/BackButton"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import supabase from "../../../lib/supabase"
import { CommunityChannel } from "../../@types/supabaseTypes"
import GenericButton from "../../components/GenericButton"
import EditChannelProfilePic from "../../components/EditChannelCoverPic"
import showAlert from "../../utilFunctions/showAlert"

type ChannelTypeOption = "Text" | "Annoucement" | "Forum"

const EditChannel = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [communityChannel, setCommunityChannel] =
    useState<CommunityChannel | null>({} as CommunityChannel)
  const [selectedChannelType, setChannelType] =
    useState<ChannelTypeOption>("Text")
  const [channelName, setChannelName] = useState<string>("")
  const route = useRoute<RouteProp<RootStackParamList, "EditChannel">>()
  const channelId = route.params.channelId
  const [singleImageFile, setSingleImageFile] = useState<
    string | null | undefined
  >(null)
  const navigation = useNavigation<NavigationType>()

  const handleSelectType = (type: ChannelTypeOption) => {
    setChannelType(selectedChannelType === type ? "Text" : type)
  }

  const channelOptions: ChannelTypeOption[] = ["Text", "Annoucement", "Forum"]

  const updateChannel = async () => {
    try {
      setLoading(true)
      if (channelId === null) throw new Error("Channel ID is null")

      const { error } = await supabase
        .from("community_channels")
        .update({
          channel_title: channelName,
          channel_type: selectedChannelType,
        })
        .eq("id", channelId)

      if (error) throw error

      navigation.goBack()
      showAlert({
        title: "Channel Updated",
        message: "Channel has been updated",
        buttonText: "OK",
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getChannel = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("community_channels")
        .select("*")
        .eq("id", channelId)

      if (error) {
        console.error("Error fetching community channels:", error.message)
        return
      }

      console.log("Community channels data", data)
      if (data) {
        setCommunityChannel(data[0])
      } else {
        setCommunityChannel(null)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getChannel()
  }, [channelId])

  useEffect(() => {
    if (communityChannel === null) return
    setChannelName(communityChannel?.channel_title || "")
  }, [communityChannel])

  useEffect(() => {
    setSingleImageFile(communityChannel?.channel_pic)
  }, [communityChannel])
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-between mx-1">
        <BackButton size={32} />
        <Text className="text-2xl font-bold">Edit Channel</Text>
        <View />
      </View>

      <EditChannelProfilePic
        channelId={channelId}
        imageUrl={singleImageFile}
        imageUrlToRead={singleImageFile}
        setImageUrl={setSingleImageFile}
      />

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

      <View className="flex flex-row justify-center">
        <GenericButton
          textSize="text-xl"
          text="Update"
          roundness="rounded-lg"
          colourDefault="bg-blue-500"
          colourPressed="bg-white"
          borderColourDefault="border-black"
          borderColourPressed="border-blue-500"
          buttonFunction={() => updateChannel()}
        />
      </View>
    </SafeAreaView>
  )
}

export default EditChannel
