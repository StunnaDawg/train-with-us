import { View, Text, Pressable, TextInput } from "react-native"
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
  const { user } = useAuth()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)

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

  return (
    <>
      <View className="flex flex-row justify-center m-1">
        {!coach ? (
          <View className="flex flex-row">
            <Pressable
              onPress={() => {
                handlePresentModalPress()
              }}
              className=" border-2 rounded-full px-5 py-1 mx-1"
            >
              <FontAwesome6 name="message" size={24} color="black" />
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

              await requestConnection(
                currentUser?.first_name,
                message,
                user.id,
                profileId
              )
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
