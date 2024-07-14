import { View, ScrollView, Pressable } from "react-native"
import React, { useState } from "react"

import { useAuth } from "../../../supabaseFunctions/authcontext"
import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { Communities, Profile } from "../../../@types/supabaseTypes"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import CommunityBubble from "./CommunityBubble"
import { FontAwesome6 } from "@expo/vector-icons"
import LoadingModal from "../../../components/LoadingModal"
import { useLoading } from "../../../context/LoadingContext"

type CommunitiesScrollProps = {
  communities: Communities[] | null
}

const CommunitiesScroll = ({ communities }: CommunitiesScrollProps) => {
  const { setLoading } = useLoading()
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

  // const handleCreateCommunityPress = () => {
  //   currentUser?.allowed_create_community
  //     ? showAlertFunc({
  //         title: "Alert Title",
  //         message: "Create a Community",
  //         buttons: [
  //           {
  //             text: "OK",
  //             onPress: () => navigation.navigate("CreateCommunity"),
  //           },
  //           {
  //             text: "Cancel",
  //             onPress: () => console.log("Cancel Pressed"),
  //             style: "cancel",
  //           },
  //         ],
  //       })
  //     : showAlertFunc({
  //         title: "Alert Title",
  //         message: "You are not allowed to create a community",
  //         buttons: [
  //           {
  //             text: "Request Access",
  //             onPress: () =>
  //               sendEmail({
  //                 recipients: ["jonsonallen9@gmail.com"],
  //                 subject: "Request Access",
  //                 body: `I would like to request access to create a community, my userId is ${user?.id}`,
  //               }),
  //           },
  //           {
  //             text: "OK",
  //             onPress: () => console.log("OK Pressed"),
  //             style: "cancel",
  //           },
  //         ],
  //       })
  // }

  // const goToCommunity = () => {
  //   if (!currentUser?.community_created) return
  //   navigation.navigate("MyCommunityHome", {
  //     communityId: currentUser?.community_created,
  //   })
  // }

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
                setLoading(true)
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
              setLoading(true)
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
                <CommunityBubble
                  key={community.id}
                  isActive={isActive}
                  community={community}
                />
              )
            })}
        </View>
      </ScrollView>
      <LoadingModal />
    </View>
  )
}

export default CommunitiesScroll
