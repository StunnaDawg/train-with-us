import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { Communities } from "../../../@types/supabaseTypes"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"
import SinglePic from "../../../components/SinglePic"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

type CommunityBubbleProps = {
  community: number
}

const CommunityBubble = ({ community }: CommunityBubbleProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentCommunity, setCurrentCommunity] = useState<Communities | null>(
    {} as Communities
  )
  const [imageFile, setImageFile] = useState<string | null | undefined>(null)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    if (!user || community === null) return

    getSingleCommunity(setLoading, community, setCurrentCommunity)
  }, [user])

  useEffect(() => {
    if (
      currentCommunity?.community_profile_pic === null ||
      currentCommunity?.community_profile_pic === undefined
    )
      return
    setImageFile(currentCommunity?.community_profile_pic)
  }, [currentCommunity])
  return (
    <View className="items-center">
      <Pressable
        className="items-center"
        onPress={() =>
          navigation.navigate("CommunityPage", {
            communityId: community,
          })
        }
      >
        <SinglePic
          size={70}
          avatarRadius={100}
          noAvatarRadius={100}
          item={imageFile}
        />
      </Pressable>
    </View>
  )
}

export default CommunityBubble
