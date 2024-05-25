import { View, Text, Pressable, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import getAllUserChatSessions from "../../../supabaseFunctions/getFuncs/getAllUserChatSessions"
import { ChatSession, Profile } from "../../../@types/supabaseTypes"
import getSingleProfile from "../../../supabaseFunctions/getFuncs/getSingleProfile"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { set } from "date-fns"
import MessageCard from "./MessageCard"

const Messages = () => {
  const [files, setFiles] = useState<FileObject[]>([])
  const [chatSessions, setChatSessions] = useState<ChatSession[] | null>([])
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    if (!user) return

    loadImages()
  }, [user])

  useEffect(() => {
    if (!user) return
    getAllUserChatSessions(user!.id, setChatSessions)
  }, [])

  useEffect(() => {
    if (!chatSessions) return
    console.log("chat sessions obtaiend", chatSessions)
  }, [chatSessions])

  const loadImages = async () => {
    const { data } = await supabase.storage.from("photos").list(user!.id)
    if (data) {
      setFiles(data)
    }
  }
  return (
    <View className="mt-8 mx-8 pb-2">
      <View>
        <Text className="font-bold text-xl text-white">My Messages</Text>
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
