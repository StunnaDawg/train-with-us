import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Keyboard,
  Modal,
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
import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet"
import { FontAwesome5 } from "@expo/vector-icons"

import { ChatSession, Profile } from "../../../@types/supabaseTypes"
import requestConnection from "../../../supabaseFunctions/addFuncs/requestConnection"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import supabase from "../../../../lib/supabase"

type MessageButtonProps = {
  coach: boolean
  profileId: string | undefined
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  profilePic: string
  indexRef: number
  scrollFunction: (index: number) => void
}

const AcceptedModal = ({
  showAcceptedModal,
  setShowAcceptedModal,
}: {
  showAcceptedModal: boolean
  setShowAcceptedModal: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <Modal visible={showAcceptedModal} transparent={true} animationType="slide">
      <View className="flex-1 justify-center items-center bg-primary-900 m-12 my-48 rounded-xl">
        <Text className="text-white text-2xl font-bold">Request Sent!</Text>
        <TouchableOpacity
          onPress={() => setShowAcceptedModal(false)}
          className="bg-blue-600 p-2 rounded-lg flex-row items-center"
        >
          <Text className="text-white text-lg font-bold">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const DefaultMessageButton = ({
  text,
  onPress,
  inputRef,
}: {
  text: string
  onPress: (text: string) => void
  inputRef: React.RefObject<TextInput>
}) => {
  return (
    <TouchableOpacity
      className="border border-gray-600 rounded-full p-1 px-3 mx-1"
      onPress={() => {
        inputRef.current?.focus()
        onPress(text)
      }}
    >
      <Text className="text-white text-sm">{text}</Text>
    </TouchableOpacity>
  )
}

const MessageButton = ({
  coach,
  profileId,
  setLoading,
  loading,
  profilePic,
  indexRef,
  scrollFunction,
}: MessageButtonProps) => {
  const [message, setMessageToSend] = useState<string>("")
  const [isAlreadyConnected, setIsAlreadyConnected] = useState<boolean>(true)
  const { user } = useAuth()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()
  const [showAcceptedModal, setShowAcceptedModal] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const height = useWindowDimensions().height
  const inputRef = useRef<TextInput>(null)

  const DefaultMessages = ["Hello!", "How are you?", "What do you do?", "👋"]

  const getChatSession = async (
    userId: string,
    user2Id: string,
    setBooleanState: Dispatch<SetStateAction<boolean>>
  ) => {
    try {
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
      }
    } catch (error) {
      console.error("Error fetching chat session:", error)
      return null // Consider returning null or appropriate error handling
    }
  }

  const snapPoints = useMemo(
    () => ["25%", height > 700 ? "51%" : "58%"],
    [height]
  )

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

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        dismiss()
      }
    )

    return () => {
      keyboardDidHideListener.remove()
    }
  }, [dismiss])

  return (
    <>
      <TouchableOpacity
        className="rounded bg-blue-600 p-2"
        activeOpacity={0.7}
        onPress={() => {
          handlePresentModalPress()
        }}
      >
        <Text className="text-white text-center text-xs font-semibold">
          Send Partner Request
        </Text>
      </TouchableOpacity>

      <AcceptedModal
        showAcceptedModal={showAcceptedModal}
        setShowAcceptedModal={setShowAcceptedModal}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#1b1d1f" }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <KeyboardAvoidingView className="flex flex-row justify-center pt-2 border-t items-center">
            <View className="flex-1">
              <View className="flex-row justify-end items-center mx-2">
                <TouchableOpacity onPress={() => dismiss()}>
                  <FontAwesome5 name="times" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <ScrollView
                keyboardShouldPersistTaps="always"
                horizontal
                className="m-1 z-10"
              >
                {DefaultMessages.map((message) => (
                  <DefaultMessageButton
                    key={message}
                    text={message}
                    onPress={(text: string) => setMessageToSend(text)}
                    inputRef={inputRef}
                  />
                ))}
              </ScrollView>
              <View className="flex-row justify-center items-center">
                <TextInput
                  ref={inputRef}
                  autoFocus={true}
                  placeholder={loading ? "sending..." : "Send a Message"}
                  className="flex-1 border rounded-xl h-8 w-64 p-2 mx-1 bg-white"
                  value={message}
                  onChangeText={setMessageToSend}
                />
                <Pressable
                  className="mx-2"
                  onPress={async () => {
                    setLoading(true)
                    if (!profileId || !user) return

                    await requestConnection(
                      currentUser?.first_name,
                      message,
                      user.id,
                      profileId,
                      profilePic,
                      setShowAcceptedModal
                    )

                    setLoading(false)
                    dismiss()
                    scrollFunction(indexRef + 1)
                  }}
                >
                  <Text className="font-bold text-lg text-white">Send</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  )
}

export default MessageButton
