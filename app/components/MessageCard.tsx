import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { NavigationType } from "../@types/navigation"
import { View } from "moti"
import SinglePicCommunity from "./SinglePicCommunity"
import { Pressable, Text } from "react-native"
import formatTimestamp from "../utilFunctions/formatTimeStamp"

type MessageProps = {
  message: string | null
  name: string | null | undefined
  id: string | null
  imageUrl: string | null
  sentAt: string | null
  senderProfilePic: string | null
}

const MessageComponent = ({
  message,
  name,
  id,
  imageUrl,
  sentAt,
  senderProfilePic,
}: MessageProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const navigation = useNavigation<NavigationType>()

  const handlePressIn = () => {
    setIsPressed(true)
  }
  const handlePressOut = () => {
    setIsPressed(false)
  }

  return (
    <View className="flex flex-row p-2 items-center">
      <SinglePicCommunity
        skeletonRadius={10}
        size={45}
        item={senderProfilePic}
        avatarRadius={100}
        noAvatarRadius={100}
      />
      <View className="flex-1 ml-3">
        <View className="flex flex-row items-center">
          <Text className="font-bold text-sm text-blue-900">{name}</Text>
          <Text className="text-xs text-gray-400 ml-1">
            {formatTimestamp(sentAt)}
          </Text>
        </View>
        {imageUrl ? (
          <View className="">
            {message !== "" && <Text className="text-sm mb-2">{message}</Text>}
            <SinglePicCommunity
              skeletonRadius={10}
              size={150}
              item={imageUrl}
              avatarRadius={10}
              noAvatarRadius={10}
            />
          </View>
        ) : (
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => {
              if (!id) return
              navigation.navigate("ViewFullUserProfileFromMessages", {
                userId: id,
              })
            }}
            className={`${isPressed ? "bg-opacity-50" : ""} mb-1`}
          >
            <Text className="text-sm">{message}</Text>
          </Pressable>
        )}
      </View>
    </View>
  )
}

export default MessageComponent
