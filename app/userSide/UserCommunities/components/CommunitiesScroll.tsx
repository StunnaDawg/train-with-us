import { View, ScrollView, Pressable } from "react-native"
import React, { useState, useCallback, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { Communities, Profile } from "../../../@types/supabaseTypes"
import CommunityBubble from "./CommunityBubble"
import { FontAwesome6 } from "@expo/vector-icons"
import { useLoading } from "../../../context/LoadingContext"
import { useAuth } from "../../../supabaseFunctions/authcontext"

type CommunitiesScrollProps = {
  communities: Communities[] | null
}

const CommunitiesScroll = ({ communities }: CommunitiesScrollProps) => {
  const { userProfile } = useAuth()
  const [currentUserProfile, setCurrentUserProfile] = useState<Profile | null>(
    null
  )
  const [isDashPressed, setIsDashPressed] = useState(true)
  const [activeCommunity, setActiveCommunity] = useState<number | null>(null)
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    if (userProfile) {
      setCurrentUserProfile(userProfile)
    }
  }, [userProfile])

  const handleOnPressIn = useCallback(() => {
    setIsDashPressed(true)
  }, [])

  const handleOnPressOut = useCallback(() => {
    setIsDashPressed(false)
  }, [])

  const renderCommunities = useCallback(() => {
    return communities?.map((community) => {
      return <CommunityBubble key={community.id} community={community} />
    })
  }, [communities, activeCommunity])

  return (
    <View className="max-h-full border-r border-slate-400">
      <ScrollView className="h-full">
        <View className="items-center">
          {!userProfile?.community_created && (
            <Pressable
              onPress={() => navigation.navigate("CreateCommunity")}
              className="m-2"
            >
              <FontAwesome6 name="circle-plus" size={64} color="white" />
            </Pressable>
          )}

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

          {renderCommunities()}
        </View>
      </ScrollView>
    </View>
  )
}

export default CommunitiesScroll
