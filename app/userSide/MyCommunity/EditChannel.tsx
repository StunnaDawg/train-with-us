import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
} from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import BackButton from "../../components/BackButton"
import supabase from "../../../lib/supabase"
import { CommunityChannel } from "../../@types/supabaseTypes"
import showAlert from "../../utilFunctions/showAlert"

const EditChannel = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [channelName, setChannelName] = useState<string>("")
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const route = useRoute<RouteProp<RootStackParamList, "EditChannel">>()
  const channelId = route.params.channelId
  const navigation = useNavigation<NavigationType>()

  const updateChannel = async () => {
    try {
      setLoading(true)
      if (channelId === null) throw new Error("Channel ID is null")

      const { error } = await supabase
        .from("community_channels")
        .update({
          channel_title: channelName,
          private: isPrivate,
        })
        .eq("id", channelId)

      if (error) throw error

      navigation.goBack()
      showAlert({
        title: "Channel Updated",
        message: "Channel has been updated successfully",
        buttonText: "OK",
      })
    } catch (error) {
      console.log(error)
      showAlert({
        title: "Error",
        message: "Failed to update channel",
        buttonText: "OK",
      })
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
        .single()

      if (error) {
        console.error("Error fetching community channel:", error.message)
        return
      }

      if (data) {
        setChannelName(data.channel_title || "")
        setIsPrivate(data.private || false)
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

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-row justify-between items-center px-4 py-3">
        <BackButton size={24} colour="white" />
        <Text className="text-xl font-bold text-white">Edit Channel</Text>
        <TouchableOpacity onPress={updateChannel} disabled={loading}>
          <Text className="text-blue-500 font-semibold">
            {loading ? "Updating..." : "Update"}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            className="flex-1 px-4 py-6"
            showsVerticalScrollIndicator={false}
          >
            <View className="space-y-6">
              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Channel Name
                </Text>
                <TextInput
                  value={channelName}
                  onChangeText={setChannelName}
                  className="bg-white px-4 py-3 rounded-lg"
                  placeholder="Enter channel name"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Private Channel
                </Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-white">Make this channel private?</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#3b82f6" }}
                    thumbColor={isPrivate ? "#60a5fa" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setIsPrivate}
                    value={isPrivate}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default EditChannel
