import { View, Text, Pressable, ScrollView } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import getAllUserChatSessions from "../../../supabaseFunctions/getFuncs/getAllUserChatSessions"
import { ChatSession, Profile } from "../../../@types/supabaseTypes"
import { NavigationType } from "../../../@types/navigation"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import MessageCard from "./MessageCard"

type MessagesProps = { user: Profile | null }

const Messages = ({ user }: MessagesProps) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[] | null>([])
  const navigation = useNavigation<NavigationType>()

  useFocusEffect(
    useCallback(() => {
      const getUserCommutiy = async () => {
        if (!user) return
        getAllUserChatSessions(user!.id, setChatSessions)
      }

      getUserCommutiy()

      return () => {
        // Optional cleanup actions
      }
    }, [user, setChatSessions])
  )

  return (
    <View className="mt-8 mx-8 pb-2">
      <View>
        <Text className="font-bold text-lg text-white">My Messages</Text>
      </View>

      <ScrollView className="h-full">
        {chatSessions?.map((session, index) => {
          const otherUserId =
            session.user1 === user?.id ? session.user2 : session.user1
          return (
            <View key={session.id}>
              <Pressable
                onPress={() => {
                  navigation.navigate("MessagingScreen", {
                    chatSession: session,
                  })
                }}
                className="flex flex-row items-center"
              >
                <MessageCard
                  otherUserId={otherUserId}
                  recentMessage={session.recent_message}
                />
              </Pressable>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Messages
