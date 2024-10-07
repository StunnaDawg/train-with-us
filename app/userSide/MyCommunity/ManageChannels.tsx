import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import React, { useCallback, useState } from "react"
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import BackButton from "../../components/BackButton"
import { CommunityChannel } from "../../@types/supabaseTypes"
import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"
import { FontAwesome6 } from "@expo/vector-icons"
import showAlertFunc from "../../utilFunctions/showAlertFunc"

const ManageChannels = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [communityChannels, setCommunityChannels] = useState<
    CommunityChannel[] | null
  >([])
  const route = useRoute<RouteProp<RootStackParamList, "ManageChannels">>()
  const communityId = route.params.communityId
  const navigation = useNavigation<NavigationType>()

  const getCommunityChannels = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("community_channels")
        .select("*")
        .eq("community", communityId)
        .order("created_at", { ascending: true })

      if (error) throw error
      setCommunityChannels(data)
    } catch (error) {
      console.error("Error fetching community channels:", error)
      showAlert({
        title: "Error",
        message: "Failed to fetch channels",
        buttonText: "OK",
      })
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getCommunityChannels()
    }, [communityId])
  )

  const deleteChannel = async (channelId: string) => {
    try {
      const { error } = await supabase
        .from("community_channels")
        .delete()
        .eq("id", channelId)

      if (error) throw error

      getCommunityChannels()
      showAlert({
        title: "Success",
        message: "Channel deleted successfully",
        buttonText: "OK",
      })
    } catch (error) {
      console.error("Error deleting channel:", error)
      showAlert({
        title: "Error",
        message: "Failed to delete channel",
        buttonText: "OK",
      })
    }
  }

  const showDeleteAlert = (channelId: string) =>
    showAlertFunc({
      title: "Delete Channel",
      message: "Are you sure you want to delete this channel?",
      buttons: [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
        },
        {
          text: "Delete",
          onPress: () => deleteChannel(channelId),
        },
      ],
    })

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-row justify-between items-center px-4 py-3">
        <BackButton size={24} colour="white" />
        <Text className="text-xl font-bold text-white">Manage Channels</Text>
      </View>

      {loading ? (
        <ActivityIndicator className="flex-1" size="large" color="#3b82f6" />
      ) : (
        <FlatList
          data={communityChannels}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
          renderItem={({ item }) => (
            <View className="bg-gray-800 rounded-lg mb-3 p-4">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-white text-lg font-semibold">
                    #{item.channel_title || "Untitled Channel"}
                  </Text>
                  <Text className="text-gray-400 mt-1">
                    {item.private ? "Private" : "Public"} Channel
                  </Text>
                </View>
                <View className="flex-row items-center space-x-4">
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("EditChannel", { channelId: item.id })
                    }
                  >
                    <FontAwesome6 name="edit" size={20} color="#60a5fa" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => showDeleteAlert(item.id)}>
                    <FontAwesome6 name="trash" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  )
}

export default ManageChannels
