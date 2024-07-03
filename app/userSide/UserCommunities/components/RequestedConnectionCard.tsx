import { View, Text, Modal, Pressable, Alert } from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import { Profile } from "../../../@types/supabaseTypes"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { formatDistanceToNowStrict } from "date-fns"
import sendNewMessage from "../../../supabaseFunctions/addFuncs/sendNewMessage"
import supabase from "../../../../lib/supabase"
import showAlert from "../../../utilFunctions/showAlert"

type RequestCardProps = {
  otherUserId: string | null
  recentMessage: string | null
  updatedAt: string | null
  setModalVisible: Dispatch<SetStateAction<boolean>>
  modalVisible: boolean
  onPress: () => void
}

const formatRelativeTime = (timestamp: string) => {
  if (!timestamp) return "Unknown time" // handle null, undefined, etc.

  const date = new Date(timestamp)
  return formatDistanceToNowStrict(date, { addSuffix: true })
}

const truncateMessage = (message: string, maxLength: number) => {
  if (message.length <= maxLength) {
    return message
  }
  return message.substring(0, maxLength) + "..."
}

const RequestCard = ({
  otherUserId,
  recentMessage,
  updatedAt,
  setModalVisible,
  modalVisible,
  onPress,
}: RequestCardProps) => {
  const [profile, setProfile] = useState<Profile | null>({} as Profile)
  const { user } = useAuth()

  const acceptRequest = async () => {
    try {
      if (!user || !otherUserId || !recentMessage) return
      await sendNewMessage(recentMessage, user?.id, otherUserId)
      setModalVisible(!modalVisible)
      onPress()
      declineRequest(false)
    } catch (error) {
      console.error("Error accepting request", error)
    }
  }

  const declineRequest = async (showAlertBoolean: boolean) => {
    if (!user || !otherUserId) {
      console.error("Missing user or otherUserId data.")
      return
    }

    console.log("Requester:", otherUserId, "Requested:", user.id)

    try {
      const { error } = await supabase
        .from("connection_requests")
        .delete()
        .match({ requester: otherUserId, requested: user.id })

      if (error) {
        showAlert({
          title: "Error leaving channel",
          message: "There was an error leaving the channel. Please try again.",
        })
        console.error("Error leaving channel:", error)
        return
      }

      if (showAlertBoolean) {
        showAlert({
          title: "Request Deleted",
          message: "The request has been deleted.",
        })
      }
      setModalVisible(!modalVisible)
    } catch (error) {
      console.error("Error during the decline operation", error)

      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again later."
      )
    }
  }

  useEffect(() => {
    if (!user || !otherUserId) return

    console.log("otherUserId", otherUserId)

    useCurrentUser(otherUserId, setProfile)
  }, [user])

  return (
    <>
      <View className="flex-1 w-full">
        <View className="flex flex-row items-center">
          <View className="m-1">
            <SinglePicCommunity
              size={50}
              avatarRadius={100}
              noAvatarRadius={100}
              item={profile?.profile_pic}
            />
          </View>

          <View>
            <View className="w-full flex flex-row justify-between items-center">
              <Text className="font-bold text-white text-sm">
                {!profile ? null : profile.first_name}
              </Text>

              <Text className="text-white text-xs first-line:font-bold mr-20">
                {updatedAt ? formatRelativeTime(updatedAt) : null}
              </Text>
            </View>
            <View>
              <Text className="text-white font-semibold text-xs">
                {!recentMessage
                  ? "No Messages yet!"
                  : truncateMessage(recentMessage, 20)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View className="flex-1 items-center justify-center">
          <View className="m-4 p-5 bg-white rounded-lg border-2 border-gray-500 shadow-lg">
            <Text className="mb-4 font-bold text-lg">
              Request from {profile?.first_name}
            </Text>
            <Text>
              {profile?.first_name} says {recentMessage}
            </Text>
            <View className="flex flex-row justify-center items-center">
              <Pressable
                className="mt-4 mx-1 bg-green-500 px-3 py-2 rounded-md"
                onPress={() => acceptRequest()}
              >
                <Text className="text-white">Accept</Text>
              </Pressable>
              <Pressable
                onPress={() => declineRequest(true)}
                className="mt-4 bg-red-500 px-3 py-2 rounded-md"
              >
                <Text className="text-white">Decline</Text>
              </Pressable>
            </View>
            <View className="flex flex-row justify-center">
              <Pressable
                className="mt-4 bg-red-500 px-3 py-2 rounded-md"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className="text-white">ignore</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default RequestCard
