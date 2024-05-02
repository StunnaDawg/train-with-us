import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native"
import React, { useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { FileObject } from "@supabase/storage-js"
import { useEffect } from "react"
import supabase from "../../../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { Communities, Profile } from "../../../@types/supabaseTypes"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import CommunityBubble from "./CommunityBubble"

type CommunitiesScrollProps = {
  communities: Communities[] | null
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 100,
  },
})

const CommunitiesScroll = ({ communities }: CommunitiesScrollProps) => {
  const [files, setFiles] = useState<FileObject[]>([])
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const { user } = useAuth()
  const avatarSize = { height: 55, width: 55 }
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    if (!user) return
    useCurrentUser(user.id, setCurrentUser)
    loadImages()
  }, [user])

  const loadImages = async () => {
    const { data } = await supabase.storage.from("photos").list(user!.id)
    if (data) {
      setFiles(data)
    }
  }
  return (
    <View className="mt-8 px-5">
      <View className="flex flex-row justify-between px-3 mb-3 items-center">
        <View>
          <Text className="font-bold text-3xl">My Communities</Text>
        </View>

        <Pressable
          onPress={() => {
            if (!currentUser?.community_created) return
            navigation.navigate("MyCommunityHome", {
              communityId: currentUser?.community_created,
            })
          }}
          className="px-2"
        >
          <Text className="text-blue-600">My Community</Text>
          <Text className="text-blue-600 text-center">Home</Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true}>
        <View className="flex flex-row">
          {!currentUser?.community_created ? (
            <Pressable
              onPress={() => {
                navigation.navigate("CreateCommunity")
              }}
              className="m-2"
            >
              <View style={[avatarSize, styles.avatar, styles.noImage]} />
            </Pressable>
          ) : null}

          {communities &&
            communities?.map((community) => (
              <View key={community.id} className="m-2">
                <CommunityBubble community={community.id} />
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default CommunitiesScroll
