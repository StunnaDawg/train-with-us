import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native"
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import { FontAwesome6 } from "@expo/vector-icons"

import { ChatSession, Profile } from "../../../@types/supabaseTypes"
import requestConnection from "../../../supabaseFunctions/addFuncs/requestConnection"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import supabase from "../../../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

type MessageButtonProps = {
  coach: boolean
  profileId: string | undefined
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  profilePic: string
}

const MessageButton = ({
  coach,
  profileId,
  setLoading,
  loading,
  profilePic,
}: MessageButtonProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const [message, setMessageToSend] = useState<string>("")
  const [session, setSession] = useState<ChatSession | null>(null)
  const [isAlreadyConnected, setIsAlreadyConnected] = useState<boolean>(true)
  const { user } = useAuth()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const navigation = useNavigation<NavigationType>()

  const handlePressIn = () => {
    setIsPressed(true)
  }
  const handlePressOut = () => {
    setIsPressed(false)
  }

  const getChatSession = async (
    userId: string,
    user2Id: string,
    setBooleanState: Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      console.log(`user1.eq.${userId}.user2.eq.${user2Id}`)
      const { data: chatSessions, error } = await supabase
        .from("chat_sessions")
        .select()
        .or(
          `and(user1.eq.${userId},user2.eq.${user2Id}),and(user1.eq.${user2Id},user2.eq.${userId})`
        )

      if (error) {
        console.error("Error fetching chat session:", error)
        throw error
      }

      if (chatSessions.length > 0) {
        console.log("Chat session found", chatSessions)
        setBooleanState(true)
        setSession(chatSessions[0])
      }
    } catch (error) {
      console.error("Error fetching chat session:", error)
      return null // Consider returning null or appropriate error handling
    }
  }

  const snapPoints = useMemo(() => ["25%", "50%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  useEffect(() => {
    if (!user?.id) return
    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (!user?.id || !profileId) return
    getChatSession(user.id, profileId, setIsAlreadyConnected)
  }, [user, profileId])

  return (
    <>
      <View className="flex flex-row justify-center m-1">
        <View className="flex flex-row">
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => {
              console.log("Pressed message button PLEASE WORK")
              if (!isAlreadyConnected || !session) {
                handlePresentModalPress()
              } else {
                console.log("Navigating to chat session")
                if (!session) return
                navigation.navigate("MessagingScreen", {
                  chatSession: session,
                })
              }
            }}
            className={` ${
              isPressed ? "bg-black" : "bg-white"
            } border-2 rounded-full px-5 py-2 mx-1`}
          >
            <FontAwesome6
              name="message"
              size={26}
              color={`${isPressed ? "white" : "black"}`}
            />
          </Pressable>
        </View>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <KeyboardAvoidingView className="flex flex-row justify-center pt-2 border-t items-center">
          <TextInput
            onSubmitEditing={async () => {
              dismiss()
            }}
            autoFocus={true}
            placeholder={loading ? "sending..." : "Send a Message"}
            className=" flex-1 border rounded-xl h-8 w-64 p-2 "
            value={message}
            onChangeText={(message: string) => {
              setMessageToSend(message)
            }}
          />
          <Pressable
            className="mx-2"
            onPress={async () => {
              setLoading(true)
              if (!profileId || !user) return
              console.log("profileId", profileId)

              await requestConnection(
                currentUser?.first_name,
                message,
                user.id,
                profileId,
                profilePic
              )

              setLoading(false)
              dismiss()
            }}
          >
            <Text className="font-bold text-lg">Send</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </BottomSheetModal>
    </>
  )
}

export default MessageButton
