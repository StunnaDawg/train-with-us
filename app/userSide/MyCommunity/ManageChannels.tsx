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
  const [deleteButtonPressed, setDeleteButtonPressed] = useState<boolean>(false)
  const [editButtonPressed, setEditButtonPressed] = useState<boolean>(false)
  const route = useRoute<RouteProp<RootStackParamList, "ManageChannels">>()
  const communityId = route.params.communityId
  const navigation = useNavigation<NavigationType>()

  const handleDeletePressedIn = () => {
    setDeleteButtonPressed(true)
  }
  const handleDeletePressedOut = () => {
    setDeleteButtonPressed(false)
  }

  const handleEditPressedIn = () => {
    setEditButtonPressed(true)
  }
  const handleEditPressedOut = () => {
    setEditButtonPressed(false)
  }

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
        <Text className="text-lg font-bold">Mange Channels</Text>
        <View />
      </View>

      <ScrollView>
        <View className="m-2">
          {!loading && communityChannels && communityChannels.length > 0 ? (
            communityChannels.map((c) => (
              <View
                key={c.id}
                className="flex-row justify-between items-center m-2 border-b "
              >
                <View className="flex flex-row items-center ">
                  <View>
                    <Text className="text-lg font-semibold mb-1">
                      #{c.channel_title || "error loading channel title"}{" "}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row">
                  <Pressable
                    onPressIn={handleEditPressedIn}
                    onPressOut={handleEditPressedOut}
                    className="mx-6"
                    onPress={() =>
                      navigation.navigate("EditChannel", {
                        channelId: c.id,
                      })
                    }
                  >
                    <FontAwesome6
                      name="edit"
                      size={20}
                      color={`${editButtonPressed ? "blue" : "black"}`}
                    />
                  </Pressable>

                  <Pressable
                    onPressIn={handleDeletePressedIn}
                    onPressOut={handleDeletePressedOut}
                    onPress={() => {
                      showDeleteAlert(() => {
                        deleteChannel(c.id)
                      })
                    }}
                  >
                    <FontAwesome6
                      name="trash"
                      size={20}
                      color={`${deleteButtonPressed ? "red" : "black"}`}
                    />
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
