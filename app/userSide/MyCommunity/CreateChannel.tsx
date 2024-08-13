import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Switch,
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
    <SafeAreaView className="flex-1">
      {!loading ? (
        <>
          <View className="flex flex-row justify-between w-full p-3">
            <View className="flex flex-row   items-center">
              <BackButton />
              <Text className="text-sm font-semibold mx-3">Create Channel</Text>
            </View>

            <Pressable
              onPress={async () => {
                await handleChannelCreation()
                navigation.goBack()
              }}
            >
              <Text className="text-lg font-bold underline">Save</Text>
            </Pressable>
          </View>

          <View className="border mx-2 rounded-lg p-3">
            <TextInput
              value={channelName}
              onChangeText={(text: string) => setChannelName(text)}
              placeholder="new-channel"
            />
          </View>

          <View className="flex flex-row justify-between m-2">
            <View>
              <View className="flex flex-row items-center">
                <Text className="text-sm font-bold mx-1">Private Channel</Text>
                <FontAwesome6
                  name={privateChannel ? "lock" : "unlock"}
                  size={20}
                  color="black"
                />
              </View>
              {privateChannel ? (
                <View>
                  <Text className="text-xs font-semibold mx-1">
                    Members will have to manually join
                  </Text>
                </View>
              ) : null}
            </View>
            <Switch
              value={privateChannel}
              onChange={() => setPrivateChannel(!privateChannel)}
            />
          </View>
        </>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  )
}

export default CreateChannel
