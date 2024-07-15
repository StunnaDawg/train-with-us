import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { Communities } from "../../../@types/supabaseTypes"
import SinglePic from "../../../components/SinglePic"
import { useLoading } from "../../../context/LoadingContext"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

type CommunityBubbleProps = {
  community: Communities
  isActive: boolean
}

const CommunityBubble = React.memo(
  ({ community, isActive }: CommunityBubbleProps) => {
    const { setLoading } = useLoading()
    const [imageFile, setImageFile] = useState<string | null | undefined>(null)
    const navigation = useNavigation<NavigationType>()

    useEffect(() => {
      if (
        community?.community_profile_pic === null ||
        community?.community_profile_pic === undefined
      )
        return
      setImageFile(community?.community_profile_pic)
    }, [community])

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
      <Pressable
        className="m-2 items-center"
        onPress={() => {
          setLoading(true)

          navigation.navigate("CommunityPage", {
            community: community,
          })
        }}
      >
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
          {handleCharacterLimit(community?.community_title)}
        </Text>
      </Pressable>
    )
  }
)

export default CommunityBubble
