import { View, Text, Pressable, ScrollView, SafeAreaView } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import getAllUserChatSessions from "../../../supabaseFunctions/getFuncs/getAllUserChatSessions"
import { ChatSession, Profile } from "../../../@types/supabaseTypes"
import { NavigationType } from "../../../@types/navigation"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import MessageCard from "./MessageCard"
import BackButton from "../../../components/BackButton"

const Messages = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[] | null>([])
  const navigation = useNavigation<NavigationType>()
  const { user } = useAuth()

  // useEffect(() => {
  //   getAllUserChatSessions(user!.id, setChatSessions)
  //   const channelSubscription = supabase
  //     .channel("schema-db-changes")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "INSERT",
  //         schema: "public",
  //         table: "chat_sessions",
  //         filter: `user1=eq.${user?.id} or user2=eq.${user?.id}`,
  //       },
  //       (payload) => {
  //         console.log("Message received: ", payload)
  //         getAllUserChatSessions(user!.id, setChatSessions)
  //       }
  //     )
  //     .subscribe((status, error) => {
  //       console.log("Subscription status:", status)
  //       if (error) {
  //         console.error("Subscription error:", error)
  //       }
  //     })

  //   return () => {
  //     supabase.removeChannel(channelSubscription)
  //   }
  // }, [chatSessions, user])

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
    <SafeAreaView className="bg-primary-900 flex-1">
      <View>
        <View className=" m-2 flex flex-row justify-between">
          <BackButton colour="white" />
          <Text className="font-bold text-lg text-white">My Messages</Text>
          <View />
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
    </SafeAreaView>
  )
}

export default Messages
