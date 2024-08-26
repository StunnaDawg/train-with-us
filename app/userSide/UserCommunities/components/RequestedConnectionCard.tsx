import {
  View,
  Text,
  Modal,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native"
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
  isRequester: boolean
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
  isRequester,
}: RequestCardProps) => {
  const [profile, setProfile] = useState<Profile | null>({} as Profile)
  const [disableButton, setDisableButton] = useState<boolean>(false)
  const { userProfile } = useAuth()

  // Accept the request

  const acceptRequest = async () => {
    try {
      console.log("Requester:", profile, "Requested:", userProfile)
      if (
        !userProfile ||
        !profile ||
        !otherUserId ||
        !recentMessage ||
        !userProfile?.first_name ||
        !profile?.first_name
      ) {
        if (!userProfile) {
          showAlert({
            title: "Error",
            message: "Authentication Error!. Make sure you are logged in",
          })
          return
        }

        if (!otherUserId) {
          showAlert({
            title: "Error",
            message:
              "There was an error getting the other user's ID, contact support",
          })
          return
        }

        if (!profile?.first_name) {
          showAlert({
            title: "Error",
            message: "Please make sure you have entered your first name",
          })
          return
        }
        return
      }

      setDisableButton(true)
      await sendNewMessage(
        recentMessage,
        profile?.first_name,
        userProfile?.id,
        otherUserId,
        profile?.profile_pic,
        userProfile?.profile_pic
      )
      setModalVisible(!modalVisible)
      declineRequest(false)
    } catch (error) {
      console.error("Error accepting request", error)
    } finally {
      setDisableButton(false)
    }
  }

  // Decline the request

  const declineRequest = async (showAlertBoolean: boolean) => {
    if (!userProfile || !otherUserId) {
      console.error("Missing user or otherUserId data.")
      return
    }

    console.log("Requester:", otherUserId, "Requested:", userProfile.id)

    try {
      setDisableButton(true)
      const { error } = await supabase
        .from("connection_requests")
        .delete()
        .match({ requester: otherUserId, requested: userProfile.id })

      if (error) {
        showAlert({
          title: "Error deleting request",
          message: "There was an error deleting the request. Please try again.",
        })
        console.error("Error deelting request:", error)
        return
      }

      if (showAlertBoolean) {
        showAlert({
          title: "Request Declined",
          message: "The request has been declined.",
        })
      }
      onPress()
      setModalVisible(!modalVisible)
    } catch (error) {
      console.error("Error during the decline operation", error)

      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again later."
      )
    } finally {
      setDisableButton(false)
    }
  }

  const deleteRequest = async (showAlertBoolean: boolean) => {
    if (!userProfile || !otherUserId) {
      console.error("Missing user or otherUserId data.")
      return
    }

    console.log("Requester:", otherUserId, "Requested:", userProfile.id)

    try {
      const { error } = await supabase
        .from("connection_requests")
        .delete()
        .match({ requester: userProfile.id, requested: otherUserId })

      if (error) {
        showAlert({
          title: "Error deleting request",
          message: "There was an error deleting the request. Please try again.",
        })
        console.error("Error deelting request:", error)
        return
      }

      if (showAlertBoolean) {
        showAlert({
          title: "Request Deleted",
          message: "The request has been deleted.",
        })
      }
      onPress()
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
    if (!userProfile || !otherUserId) return

    console.log("otherUserId", otherUserId)

    useCurrentUser(otherUserId, setProfile)
  }, [userProfile])

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
            {!isRequester ? (
              <Text className="mb-4 font-bold text-lg">
                Request from {profile?.first_name}
              </Text>
            ) : (
              <Text className="mb-4 font-bold text-lg">
                Your Request to {profile?.first_name}
              </Text>
            )}
            <Text className="font-semibold">You said {recentMessage}</Text>
            <View className="flex flex-row justify-center items-center">
              {!isRequester ? (
                <Pressable
                  disabled={disableButton}
                  className="mt-4 mx-1 bg-green-500 px-3 py-2 rounded-md"
                  onPress={() => acceptRequest()}
                >
                  {disableButton ? (
                    <ActivityIndicator />
                  ) : (
                    <Text className="text-white">Accept</Text>
                  )}
                </Pressable>
              ) : (
                <Pressable
                  className="mt-4 mx-1 bg-green-500 px-3 py-2 rounded-md"
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text className="text-white">Okay</Text>
                </Pressable>
              )}
              {!isRequester ? (
                <Pressable
                  onPress={() => declineRequest(true)}
                  className="mt-4 bg-red-500 px-3 py-2 rounded-md"
                >
                  <Text className="text-white">Decline</Text>
                </Pressable>
              ) : null}
            </View>
            <View className="flex flex-row justify-center">
              {!isRequester ? (
                <Pressable
                  className="mt-4 bg-red-500 px-3 py-2 rounded-md"
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text className="text-white">Ignore</Text>
                </Pressable>
              ) : (
                <Pressable
                  className="mt-4 bg-red-500 px-3 py-2 rounded-md"
                  onPress={() => deleteRequest(true)}
                >
                  <Text className="text-white">Delete Request</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default RequestCard
