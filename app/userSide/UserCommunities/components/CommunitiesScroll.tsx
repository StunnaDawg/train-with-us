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
import showAlertFunc from "../../../utilFunctions/showAlertFunc"
import sendEmail from "../../../utilFunctions/sendEmail"

type CommunitiesScrollProps = {
  communities: Communities[] | null
}

const CommunitiesScroll = ({ communities }: CommunitiesScrollProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  const handleCreateCommunityPress = () => {
    currentUser?.allowed_create_community
      ? showAlertFunc({
          title: "Alert Title",
          message: "Create a Community",
          buttons: [
            {
              text: "OK",
              onPress: () => navigation.navigate("CreateCommunity"),
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ],
        })
      : showAlertFunc({
          title: "Alert Title",
          message: "You are not allowed to create a community",
          buttons: [
            {
              text: "Request Access",
              onPress: () =>
                sendEmail({
                  recipients: ["jonsonallen9@gmail.com"],
                  subject: "Request Access",
                  body: `I would like to request access to create a community, my userId is ${user?.id}`,
                }),
            },
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
              style: "cancel",
            },
          ],
        })
  }

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
  }, [user])

  return (
    <View className="px-5">
      {currentUser?.community_created ? (
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
          <FontAwesome6 name="house-chimney" size={20} color="black" />
        </Pressable>
      ) : null}
      <View className="flex flex-row justify-between px-3 mb-3 items-center">
        <View>
          <Text className="font-bold text-white text-lg">My Communities</Text>
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
              <FontAwesome6 name="circle-plus" size={74} color="white" />
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
