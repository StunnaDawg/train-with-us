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
  setNavigating: React.Dispatch<React.SetStateAction<boolean>>
}

const CommunitiesScroll = ({
  communities,
  setNavigating,
}: CommunitiesScrollProps) => {
  const [isDashPressed, setIsDashPressed] = useState(true)
  const [activeCommunity, setActiveCommunity] = useState<number | null>(null)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  const handleOnPressIn = () => {
    setIsDashPressed(true)
  }

  const handleOnPressOut = () => {
    setIsDashPressed(false)
  }

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
    <View className="max-h-full border-r border-slate-400">
      <ScrollView className="h-full">
        <View className="items-center">
          {!currentUser?.community_created ? (
            <Pressable
              onPress={() => {
                navigation.navigate("CreateCommunity")
              }}
              className="m-2"
            >
              <FontAwesome6 name="circle-plus" size={64} color="white" />
            </Pressable>
          ) : null}

          <Pressable
            onPressIn={handleOnPressIn}
            onPressOut={handleOnPressOut}
            onPress={() => {
              navigation.navigate("SearchCommunities")
              setActiveCommunity(null)
            }}
            className={`m-2 ${
              isDashPressed ? "bg-black" : "bg-white"
            } rounded-full p-2 items-center`}
          >
            <FontAwesome6
              name="magnifying-glass"
              size={36}
              color={isDashPressed ? "white" : "black"}
            />
          </Pressable>

          {communities &&
            communities?.map((community) => {
              const isActive = activeCommunity === community.id
              return (
                <Pressable
                  onPress={() => {
                    setIsDashPressed(false)
                    navigation.navigate("CommunityPage", {
                      community: community,
                    })
                  }}
                  key={community.id}
                  className="m-2"
                >
                  <CommunityBubble
                    isActive={isActive}
                    setNavigating={setNavigating}
                    community={community.id}
                  />
                </Pressable>
              )
            })}
        </View>
      </ScrollView>
    </View>
  )
}

export default CommunitiesScroll
