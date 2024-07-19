import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { SafeAreaView } from "react-native"
import BackButton from "../../components/BackButton"
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import SinglePic from "../../components/SinglePic"
import getCommunityChannels from "../../supabaseFunctions/getFuncs/getCommunityChannels"
import { CommunityChannel } from "../../@types/supabaseTypes"
import { FontAwesome6 } from "@expo/vector-icons"
import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"

const ManageChannels = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [communityChannels, setCommunityChannels] = useState<
    CommunityChannel[] | null
  >([])
  const route = useRoute<RouteProp<RootStackParamList, "ManageChannels">>()
  const communityId = route.params.communityId
  const navigation = useNavigation<NavigationType>()

  useFocusEffect(
    useCallback(() => {
      const getChannels = async () => {
        setLoading(true)
        if (!communityId) return
        getCommunityChannels(communityId, setLoading, setCommunityChannels)
        setLoading(false)
      }

      getChannels()

      return () => {
        // Optional cleanup actions
      }
    }, [communityId, setCommunityChannels])
  )

  useEffect(() => {
    if (!communityId) return
    getCommunityChannels(communityId, setLoading, setCommunityChannels)
  }, [communityId])

  const showDeleteAlert = (onConfirm: () => void) =>
    Alert.alert(
      "Do you want to delete this channel?",
      "Please select an option.",
      [
        {
          text: "Yes",
          onPress: onConfirm,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    )

  const deleteChannel = async (channelId: string) => {
    const { error } = await supabase
      .from("community_channels")
      .delete()
      .eq("id", channelId)

    if (error) {
      showAlert({
        title: "Error",
        message: "Error deleting channel",
        buttonText: "OK",
      })
      throw error
    }

    getCommunityChannels(communityId, setLoading, setCommunityChannels)
  }
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-between mx-1">
        <BackButton size={24} />
        <Text className="text-lg font-bold">My Channels</Text>
        <View />
      </View>

      <ScrollView>
        <View className="m-2">
          {!loading && communityChannels && communityChannels.length > 0 ? (
            communityChannels.map((c) => (
              <View
                key={c.id}
                className="flex-row justify-between items-center m-2 "
              >
                <View className="flex flex-row items-center">
                  <View>
                    <Text className="text-lg font-bold mb-1">
                      {c.channel_title || "error loading channel title"}{" "}
                      {c.channel_type === "Announcement"
                        ? `#${c.channel_type}`
                        : null}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row">
                  <Pressable
                    className="mx-6"
                    onPress={() =>
                      navigation.navigate("EditChannel", {
                        channelId: c.id,
                      })
                    }
                  >
                    <FontAwesome6 name="edit" size={20} color="black" />
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      showDeleteAlert(() => {
                        deleteChannel(c.id)
                      })
                    }}
                  >
                    <FontAwesome6 name="trash" size={20} color="black" />
                  </Pressable>
                </View>
              </View>
            ))
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ManageChannels
