import { View, Text, Pressable, ScrollView } from "react-native"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import getAllUserChatSessions from "../supabaseFunctions/getFuncs/getAllUserChatSessions"
import { ChatSession } from "../@types/supabaseTypes"
import { FontAwesome6, Feather } from "@expo/vector-icons"
import ShareProfile from "./ShareProfile"
import sendEventLink from "../supabaseFunctions/addFuncs/sendEventLink"
import sendCommunityLink from "../supabaseFunctions/addFuncs/sendCommunityLink"

type shareButtonProps = {
  communityId: number | undefined | null
  userId: string | undefined | null
}

const ShareCommunityButton = ({ communityId, userId }: shareButtonProps) => {
  const [userChatSessions, setUserChatSessions] = useState<
    ChatSession[] | null
  >([])

  const [communitySent, setCommunitySent] = useState<boolean>(false)
  const [isPressed, setIsPressed] = useState(false)
  const [iconPressed, setIconPressed] = useState<boolean>(false)
  const [sessionsToSend, setSessionsToSend] = useState<string[]>([])

  const handleOnSharePressIn = () => {
    setIconPressed(true)
  }

  const handleOnSharePressOut = () => {
    setIconPressed(false)
  }

  const handleOnPressIn = () => {
    setIsPressed(true)
  }

  const handleOnPressOut = () => {
    setIsPressed(false)
  }

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["1%", "30%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const sendButton = (sessions: string[]) => {
    sessions.forEach((sessionId) => {
      sendCommunityTo(sessionId)
    })

    setCommunitySent(true)

    setTimeout(() => {
      setCommunitySent(false)
    }, 2000)
  }

  const sendCommunityTo = (sessionId: string) => {
    console.log("Send Event to", sessionsToSend)
    if (!userId || !sessionId || !communityId) return

    sendCommunityLink(userId, sessionId, communityId)
  }

  useEffect(() => {
    if (!userId) return
    getAllUserChatSessions(userId, setUserChatSessions)
  }, [userId])

  return (
    <>
      <Pressable
        onPressIn={handleOnSharePressIn}
        onPressOut={handleOnSharePressOut}
        className={`${
          iconPressed ? `opacity-50` : null
        } p-1 mx-1 bg-white rounded-xl`}
        onPress={() => {
          handlePresentModalPress()
        }}
      >
        <Feather name="share" size={22} color="black" />
      </Pressable>

      <BottomSheetModal
        enablePanDownToClose={true}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <ScrollView horizontal={true}>
          <View className="flex flex-row">
            {userChatSessions && userChatSessions.length > 0 ? (
              userChatSessions.map((session) => {
                const otherUserId =
                  session.user1 === userId ? session.user2 : session.user1
                return (
                  <View key={session.id} className="mx-2">
                    <ShareProfile
                      profileId={otherUserId}
                      chatSessionId={session.id}
                      setSessionsToSend={setSessionsToSend}
                    />
                  </View>
                )
              })
            ) : (
              <Pressable>
                <Text>You have No Connections</Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
        <View className="flex flex-row justify-center items-center">
          <Pressable
            style={{ width: "80%", height: "60%" }}
            className={`mb-3 ${
              isPressed
                ? `bg-slate-400 border-2 border-solid border-slate-400`
                : `bg-white border-2 border-solid border-slate-400`
            } flex justify-center items-center rounded-xl`}
            onPress={() => sendButton(sessionsToSend)}
            onPressIn={handleOnPressIn}
            onPressOut={handleOnPressOut}
          >
            <Text className="font-bold text-center text-xl">{`${
              communitySent ? "Event Sent" : "Send"
            }`}</Text>
          </Pressable>
        </View>
      </BottomSheetModal>
    </>
  )
}

export default ShareCommunityButton
