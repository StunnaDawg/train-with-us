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
  setNavigating: React.Dispatch<React.SetStateAction<boolean>>
  isActive: boolean
}

const CommunityBubble = ({
  community,
  setNavigating,
  isActive,
}: CommunityBubbleProps) => {
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

  const handleCharacterLimit = (text: string | undefined | null) => {
    if (text) {
      if (text.length > 10) {
        return text.slice(0, 10) + "..."
      } else {
        return text
      }
    }
    return ""
  }
  return (
    <View className={`items-center`}>
      <View
        style={{ backgroundColor: isActive ? "white" : "transparent" }}
        className={` rounded-full p-1`}
      >
        <SinglePic
          size={54}
          avatarRadius={100}
          noAvatarRadius={100}
          item={imageFile}
        />
      </View>
      <Text className="text-white font-bold text-xs">
        {handleCharacterLimit(currentCommunity?.community_title)}
      </Text>
    </View>
  )
}

export default CommunityBubble
