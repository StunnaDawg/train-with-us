import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import getAllUserChatSessions from "../../../supabaseFunctions/getFuncs/getAllUserChatSessions"
import { ChatSession } from "../../../@types/supabaseTypes"

const Messages = () => {
  const [files, setFiles] = useState<FileObject[]>([])
  const [chatSessions, setChatSessions] = useState<ChatSession[] | null>([])
  const { user } = useAuth()

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
    console.log(chatSessions)
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
        <Text className="font-bold text-xl">My Messages</Text>
      </View>

      <Pressable className="flex flex-row items-center">
        <View className="m-2">
          <SinglePic
            size={55}
            avatarRadius={100}
            noAvatarRadius={100}
            item={files[0]}
          />
        </View>

        <View>
          <Text className="font-bold mb-1">Jordan Forbes</Text>
          <Text className="text-sm">Hey, how are you?</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Messages
