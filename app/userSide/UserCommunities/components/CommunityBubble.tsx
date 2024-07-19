import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"
import { Communities, Profile } from "../../../@types/supabaseTypes"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { FontAwesome6 } from "@expo/vector-icons"

type CommunityBubbleProps = {
  community: Communities
  userId: string | null | undefined
}

const CommunityBubble = React.memo(
  ({ community, userId }: CommunityBubbleProps) => {
    const [isPressed, setIsPressed] = useState<boolean>(false)
    const navigation = useNavigation<NavigationType>()

    const handlePressIn = () => {
      setIsPressed(true)
    }
    const handlePressOut = () => {
      setIsPressed(false)
    }

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
        style={{ opacity: isPressed ? 0.4 : 1 }}
        className={` m-2 items-center`}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          navigation.navigate("CommunityPage", {
            community: community,
          })
        }}
      >
        <View className={` rounded-full p-1`}>
          <SinglePicCommunity
            size={54}
            avatarRadius={100}
            noAvatarRadius={100}
            item={community?.community_profile_pic}
          />
          {userId === community.community_owner && (
            <View className="absolute top-0 right-1 z-50">
              <FontAwesome6 name="bookmark" size={24} color="white" />
            </View>
          )}
        </View>
        <Text className="text-white font-bold text-xs">
          {handleCharacterLimit(community?.community_title)}
        </Text>
      </Pressable>
    )
  }
)

export default CommunityBubble
