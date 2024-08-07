import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { NavigationType } from "../@types/navigation"
import { View } from "moti"
import SinglePicCommunity from "./SinglePicCommunity"
import { Pressable, Text } from "react-native"
import formatTimestamp from "../utilFunctions/formatTimeStamp"
import { Communities, Events } from "../@types/supabaseTypes"
import getSingleEvent from "../supabaseFunctions/getFuncs/getSingleEvent"
import getSingleCommunity from "../supabaseFunctions/getFuncs/getSingleCommunity"
import CommunityMessageCard from "../userSide/UserCommunities/components/CommunityMessageCard"
import EventCard from "../userSide/Events/components/EventCard"

type MessageProps = {
  message: string | null
  name: string | null | undefined
  id: string | null
  imageUrl: string | null
  sentAt: string | null
  senderProfilePic: string | null
  isLink: boolean
  eventId: number | null
  communityId: number | null
}

const MessageComponent = ({
  message,
  name,
  id,
  imageUrl,
  sentAt,
  senderProfilePic,
  isLink,
  eventId,
  communityId,
}: MessageProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const navigation = useNavigation<NavigationType>()
  const [event, setEvent] = useState<Events | null>({} as Events)
  const [loading, setLoading] = useState<boolean>(false)
  const [community, setCommunity] = useState<Communities | null>(null)
  const handlePressIn = () => {
    setIsPressed(true)
  }
  const handlePressOut = () => {
    setIsPressed(false)
  }

  useEffect(() => {
    if (!eventId || isLink === false) return
    getSingleEvent(setLoading, eventId, setEvent)
  }, [eventId])

  useEffect(() => {
    if (!communityId || isLink === false) return
    getSingleCommunity(setLoading, communityId, setCommunity)
  }, [communityId])
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
          <View>
            {message !== "" && <Text className="text-sm mb-2">{message}</Text>}
            <SinglePicCommunity
              skeletonRadius={10}
              size={150}
              item={imageUrl}
              avatarRadius={10}
              noAvatarRadius={10}
            />
          </View>
        ) : isLink && community ? (
          <View>
            {message !== "" && <Text className="text-sm mb-2">{message}</Text>}
            <CommunityMessageCard community={community} />
          </View>
        ) : isLink && event ? (
          <View>
            {message !== "" && <Text className="text-sm mb-2">{message}</Text>}
            <EventCard
              title={event?.event_title}
              eventCoverPhoto={event.event_cover_photo}
              eventId={event.id}
              eventPrice={event.price}
              date={event.date}
              communityId={event.community_host}
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
