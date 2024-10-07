import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Switch,
  ScrollView,
} from "react-native"
import React, { useState } from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"
import supabase from "../../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import BackButton from "../../components/BackButton"
import Loading from "../../components/Loading"
import { FontAwesome6 } from "@expo/vector-icons"
import showAlert from "../../utilFunctions/showAlert"

const CreateChannel = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [privateChannel, setPrivateChannel] = useState<boolean>(false)
  const [channelName, setChannelName] = useState<string>("")
  const route = useRoute<RouteProp<RootStackParamList, "CreateChannel">>()
  const community = route.params.community
  const navigation = useNavigation()

  const handleChannelCreation = async () => {
    try {
      setLoading(true)
      if (community === null) throw new Error("Community ID is null")

      if (privateChannel === true) {
        const { error } = await supabase.from("community_channels").insert([
          {
            channel_title: channelName,
            channel_type: "Text",
            community_owner: community.community_owner,
            community: community.id,
            community_name: community.community_title,
            private: privateChannel,
          },
        ])

        if (error) {
          console.error("Error creating private channel:", error.message)
          showAlert({
            title: "Error Creating Channel",
            message:
              "There was an error creating the channel. Please try again.",
          })
          throw error
        }

        showAlert({
          title: "Private Channel Created",
          message: "You have successfully created the channel",
        })
      } else {
        const { error } = await supabase.from("community_channels").insert([
          {
            channel_title: channelName,
            channel_type: "Text",
            community_owner: community.community_owner,
            community: community.id,
            community_name: community.community_title,
            private: privateChannel,
          },
        ])

        if (error) throw error

        showAlert({
          title: " Channel Created",
          message: "You have successfully created the channel",
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-row justify-between items-center px-4 py-3 ">
        <BackButton size={24} colour="white" />
        <Text className="text-xl font-bold text-white">Create Channel</Text>
        <Pressable
          onPress={async () => {
            await handleChannelCreation()
            navigation.goBack()
          }}
          className="bg-blue-600 px-4 py-2 rounded-lg active:bg-blue-700"
        >
          <Text className="text-white font-bold">Save</Text>
        </Pressable>
      </View>

      {!loading ? (
        <ScrollView className="flex-1 px-4 py-6">
          <View className="space-y-6">
            <View>
              <Text className="text-lg text-white font-bold mb-2">
                Channel Name
              </Text>
              <TextInput
                className="bg-gray-800 text-white px-4 py-3 rounded-lg"
                value={channelName}
                onChangeText={(text: string) => setChannelName(text)}
                placeholder="Enter channel name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View>
              <Text className="text-lg text-white font-bold mb-2">
                Channel Type
              </Text>
              <View className="flex-row justify-between items-center bg-gray-800 px-4 py-3 rounded-lg">
                <View className="flex-row items-center">
                  <FontAwesome6
                    name={privateChannel ? "lock" : "unlock"}
                    size={20}
                    color="white"
                  />
                  <Text className="text-white font-semibold ml-3">
                    Private Channel
                  </Text>
                </View>
                <Switch
                  value={privateChannel}
                  onValueChange={() => setPrivateChannel(!privateChannel)}
                />
              </View>
              {privateChannel && (
                <Text className="text-sm text-gray-300 mt-2">
                  Members will have to manually join this channel
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  )
}

export default CreateChannel
