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
import { FontAwesome6 } from "@expo/vector-icons"

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
  const [isPressed, setIsPressed] = useState(false)
  const [files, setFiles] = useState<FileObject[]>([])
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const { user } = useAuth()
  const avatarSize = { height: 55, width: 55 }
  const navigation = useNavigation<NavigationType>()

  const handleOnPressIn = () => {
    setIsPressed(true)
  }

  const handleOnPressOut = () => {
    setIsPressed(false)
  }

  const goToCommunity = () => {
    if (!currentUser?.community_created) return
    navigation.navigate("MyCommunityHome", {
      communityId: currentUser?.community_created,
    })
  }

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
    <View className="px-5">
      <Pressable
        className={`flex flex-row justify-between items-center border rounded-xl py-3 mt-4 mb-3 px-6 mx-10 ${
          isPressed ? "bg-gray-200 " : "bg-white "
        }`}
        onPress={() => {
          goToCommunity()
        }}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        <Text className="font-bold">My Community Settings</Text>
        <FontAwesome6 name="house-chimney" size={24} color="black" />
      </Pressable>
      <View className="flex flex-row justify-between px-3 mb-3 items-center">
        <View>
          <Text className="font-bold text-white text-3xl">My Communities</Text>
        </View>
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
