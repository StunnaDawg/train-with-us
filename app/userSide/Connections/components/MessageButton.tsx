import { View, Text, Pressable, TextInput } from "react-native"
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import insertIgnoreUser from "../../../supabaseFunctions/updateFuncs/addIgnoreUser"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import sendNewMessage from "../../../supabaseFunctions/addFuncs/sendNewMessage"

import { ChatSession } from "../../../@types/supabaseTypes"
import { set } from "date-fns"

type MessageButtonProps = {
  coach: boolean
  profileId: string | undefined
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

const MessageButton = ({
  coach,
  profileId,
  setLoading,
  loading,
}: MessageButtonProps) => {
  const [message, setMessageToSend] = useState<string>("")
  const [chatSessionId, setChatSessionId] = useState<ChatSession>(
    {} as ChatSession
  )
  const { user } = useAuth()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()

  const snapPoints = useMemo(() => ["25%", "50%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  return (
    <>
      <View className="flex flex-row justify-center m-1">
        {!coach ? (
          <View className="flex flex-row">
            <Pressable
              onPress={() => {
                handlePresentModalPress()
              }}
              className="border-2 rounded-full p-2 mx-1"
            >
              <Text className="text-xl font-bold">Say Hi</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable className="border-2 rounded-full p-3">
            <Text className="text-2xl font-bold">Coach</Text>
          </Pressable>
        )}
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View className="flex flex-row justify-center my-2 pt-2 border-t">
          <TextInput
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

              console.log("chatSessionId", chatSessionId)
              await sendNewMessage(message, user?.id, profileId)
              setLoading(false)
              dismiss()
            }}
          >
            <Text className="font-bold">Send</Text>
          </Pressable>
        </View>
      </BottomSheetModal>
    </>
  )
}

export default MessageButton
