import { View, Text, Pressable, ScrollView } from "react-native"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"
import { FontAwesome6 } from "@expo/vector-icons"
import supabase from "../../lib/supabase"

type UpdateModalProps = {
  userId: string | null | undefined
  show: boolean
}

const UpdateModal = ({ userId, show }: UpdateModalProps) => {
  const [isPressed, setIsPressed] = useState(false)

  const { dismiss } = useBottomSheetModal()

  const handleOnPressIn = () => {
    setIsPressed(true)
  }

  const handleOnPressOut = () => {
    setIsPressed(false)
  }

  const updateProfile = async () => {
    if (!userId) return
    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      new_update_modal: true,
    })

    if (error) {
      console.error("Failed to update profile:", error)
      throw error
    }

    dismiss()
  }

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["1%", "99%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  useEffect(() => {
    if (show) handlePresentModalPress()
  }, [show])

  return (
    <>
      <BottomSheetModal
        enablePanDownToClose={true}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <ScrollView>
          <View className="flex flex-row justify-center">
            <View className="items-center">
              <Text className="font-bold text-lg">Train With Us</Text>
              <Text className="font-bold text-lg">Version 0.0.15 Update</Text>
            </View>
          </View>
          <View className="flex flex-row justify-center m-2">
            <Text className="font-semibold underline">New Features</Text>
          </View>
          <View className="m-2">
            <View className="flex flex-row items-center flex-wrap">
              <Text className="font-medium">
                - Share Events Directly to Connections click the{" "}
              </Text>
              <FontAwesome6 name="share-square" size={16} color="black" />
              <Text className="font-medium">
                icon at the top of the page to send the current event directly
              </Text>
            </View>
            <Text className="font-medium">
              - Allow User to delete Chat Sessions{" "}
            </Text>

            <Text className="font-medium">- Leave Event</Text>
            <View className="flex flex-row items-center flex-wrap">
              <Text className="font-medium">
                - Manage Connections with the{" "}
              </Text>
              <FontAwesome6 name="users" size={16} color="black" />
              <Text className="font-medium"> icon in the navbar</Text>
            </View>

            <Text className="font-medium">
              - Community settings for all users, Only able to view upcoming
              events, leave community, call, and open maps right now
            </Text>
          </View>
          <View className="flex flex-row justify-center m-2">
            <Text className="font-semibold underline">
              Style Changes / Bug Fixes
            </Text>
          </View>
          <View className="m-2">
            <Text className="font-medium">- Fixed Tabbing in Messages</Text>
            <Text className="font-medium">- My events page style changes</Text>
            <Text className="font-medium">
              - Changed Maps/Phone buttons to icons
            </Text>
            <Text className="font-medium">
              - User direct messages now show up in recent order, and update
              when user sends message
            </Text>
            <Text className="font-medium">
              - Added No User Card after reaching end of the current Connections
              Stack
            </Text>
            <Text className="font-medium">
              - Fixed bug that allowed user to type in Annoucement Channel in
              certain ciurcumstances
            </Text>
            <Text className="font-medium">
              - Fixed Issue where notifications push token cannot be reset,
              allowing users to receive notifications after logging out (Pretty
              Sure this is fixed now, but not 100% sure. Works in development)
            </Text>
          </View>

          <View className="flex flex-row justify-center m-2">
            <Text className="font-semibold underline">
              Upcoming Changes in progress (not in order)
            </Text>
          </View>
          <View className="m-2">
            <Text className="font-medium">
              - Class Schedules for Communities
            </Text>
            <Text className="font-medium">- Sign in With Google</Text>
            <Text className="font-medium">
              - Mute Communities and Stand Alone Chats
            </Text>
            <Text className="font-medium">
              - Notifications bring directly to desired page
            </Text>
            <Text className="font-medium">
              - Message card message preview Update when other user sends
              message
            </Text>
            <Text className="font-medium">
              - Community Message Cards Update preview when new message is sent
            </Text>
          </View>

          <View className=" h-12 m-2">
            <View className="flex flex-row justify-center items-center h-full">
              <Pressable
                style={{ width: "80%", height: "100%" }}
                className={`${
                  isPressed
                    ? `bg-slate-400 border-2 border-solid border-slate-400`
                    : `bg-white border-2 border-solid border-slate-400`
                } flex justify-center items-center rounded-xl`}
                onPress={() => updateProfile()}
                onPressIn={handleOnPressIn}
                onPressOut={handleOnPressOut}
              >
                <Text className="font-bold text-center text-xl">{`Awesome!`}</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </BottomSheetModal>
    </>
  )
}

export default UpdateModal
