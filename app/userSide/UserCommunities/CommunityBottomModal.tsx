import { View, Text, ScrollView, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import ViewCommunityTitle from "../Communities/components/ViewCommunityTitle"
import { Communities } from "../../@types/supabaseTypes"
import supabase from "../../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import CommunityContact from "../Communities/components/CommunityContact"
import { Image } from "expo-image"
import UpcomingCommunityEvents from "../Communities/components/UpcomingEvents"
import leaveCommunity from "../../supabaseFunctions/deleteFuncs/leaveCommunity"
import { useAuth } from "../../supabaseFunctions/authcontext"
import showAlertFunc from "../../utilFunctions/showAlertFunc"

type CommunityBottomModalProps = {
  community: Communities | null
  dismiss: () => void
}

const CommunityBottomModal = ({
  community,
  dismiss,
}: CommunityBottomModalProps) => {
  const [image, setImage] = useState<string>("")
  const { user } = useAuth()
  const [isPressed, setIsPressed] = useState<{ [key: string]: boolean }>({})

  const handlePressIn = (key: string) => {
    setIsPressed((prev) => ({ ...prev, [key]: true }))
  }

  const handlePressOut = (key: string) => {
    setIsPressed((prev) => ({ ...prev, [key]: false }))
  }

  const navigation = useNavigation<NavigationType>()

  const readImage = () => {
    if (community?.community_profile_pic === "") return
    console.log("reading", `${community?.community_profile_pic}`)
    supabase.storage
      .from("photos")
      .download(`${community?.community_profile_pic}`)
      .then(({ data }) => {
        const fr = new FileReader()
        fr.readAsDataURL(data!)
        fr.onload = () => {
          setImage(fr.result as string)
        }
      })
  }

  useEffect(() => {
    if (community?.community_profile_pic === undefined) return
    readImage()
  }, [community?.community_profile_pic])

  return (
    <ScrollView className="bg-gray-900 px-4 py-6">
      <View className="space-y-6">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center space-x-4">
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                className="w-16 h-16 rounded-full bg-gray-800 border-2 border-gray-700"
                source={
                  image
                    ? { uri: image }
                    : require("../../../assets/images/TWU-Logo.png")
                }
              />
            </Pressable>
            <View>
              <Text className="text-2xl text-white font-bold mb-1">
                {community?.community_title || "Community"}
              </Text>
              <Pressable
                onPress={() => {
                  if (!community) return
                  navigation.navigate("ViewCommunitiesMembersScreen", {
                    communityId: community?.id,
                  })
                  dismiss()
                }}
                className={`flex-row items-center ${
                  isPressed["members"] ? "opacity-50" : ""
                }`}
                onPressIn={() => handlePressIn("members")}
                onPressOut={() => handlePressOut("members")}
              >
                <Text className="text-gray-300 font-semibold text-sm">
                  {community?.member_count} Members
                </Text>
              </Pressable>
            </View>
          </View>
          <CommunityContact community={community} userId={user?.id} />
        </View>

        <View className="space-y-4">
          <Pressable
            onPress={() => {
              // Navigate to community details or edit screen
            }}
            className="bg-gray-800 p-4 rounded-lg active:bg-gray-700"
          >
            <Text className="text-white font-semibold text-lg">
              Community Details
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              // Navigate to community rules or guidelines
            }}
            className="bg-gray-800 p-4 rounded-lg active:bg-gray-700"
          >
            <Text className="text-white font-semibold text-lg">
              Community Rules
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              showAlertFunc({
                title: "Leave Community",
                message: "Are you sure you want to leave this community?",
                buttons: [
                  {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => {
                      console.log("cancel")
                    },
                  },
                  {
                    text: "Leave",
                    style: "destructive",
                    onPress: async () => {
                      if (community && user?.id) {
                        await leaveCommunity(community.id, user.id)
                        navigation.goBack()
                      }
                    },
                  },
                ],
              })
            }}
            className={`bg-red-600 p-4 rounded-lg ${
              isPressed["leave"] ? "bg-red-700" : ""
            }`}
            onPressIn={() => handlePressIn("leave")}
            onPressOut={() => handlePressOut("leave")}
          >
            <Text className="text-white font-semibold text-lg text-center">
              Leave Community
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

export default CommunityBottomModal
