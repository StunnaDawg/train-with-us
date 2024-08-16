import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import BackButton from "../components/BackButton"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"
import { useAuth } from "../supabaseFunctions/authcontext"
import { SupaNotification } from "../@types/supabaseTypes"
import supabase from "../../lib/supabase"
import SinglePicCommunity from "../components/SinglePicCommunity"

type NotificationsTabProps = {
  createdAt: string
  data: any
  description: string
  notificationType: string
  title: string
  image: string | null
}

const NotificationsCard = ({
  createdAt,
  data,
  description,

  notificationType,
  title,
  image,
}: NotificationsTabProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={`${
        isPressed ? "opacity-50" : null
      } bg-white border rounded-lg p-2 m-2`}
      onPress={() => {
        if (notificationType === "MessageNotification") {
          navigation.navigate("MessagingScreen", {
            chatSession: data,
          })
        }

        if (notificationType === "ChannelNotifcation") {
          navigation.navigate("ChannelScreen", {
            channelId: data.channel_id,
          })
        }

        if (notificationType === "CommunityRequest") {
          navigation.navigate("MyCommunityRequests", {
            communityId: data.community_id,
            communityTitle: data.community_title,
          })
        }

        if (notificationType === "ConnectionRequest") {
          navigation.navigate("DirectMessageTab")
        }
        if (notificationType === "AcceptedConnectionRequest") {
          navigation.navigate("MessagingScreen", {
            chatSession: data,
          })
        }
        if (notificationType === "NewEvent") {
          navigation.navigate("ViewEvent", {
            eventId: data.event_id,
          })
        }
      }}
    >
      <View className="flex flex-row items-center">
        <View className="mr-2">
          <SinglePicCommunity
            item={image}
            size={50}
            avatarRadius={100}
            noAvatarRadius={100}
            allowCacheImage={true}
          />
        </View>
        <View className="flex-1 justify-center">
          <Text className="font-semibold">{title}</Text>
          <Text>{description}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const NotificationsTab = () => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<SupaNotification[] | null>(
    []
  )

  useEffect(() => {
    if (!user) return
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
      if (error) {
        throw new Error(error.message)
      }
      setNotifications(data)
    }
    fetchNotifications()
  }, [user])
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex flex-row items-center mx-2">
        <View className="mx-2">
          <BackButton colour="white" size={18} />
        </View>
        <View>
          <Text className="text-white text-xl font-bold">Notifications</Text>
        </View>
      </View>
      <ScrollView>
        <View>
          {notifications?.map((notification) => (
            <NotificationsCard
              key={notification.id}
              createdAt={notification.created_at}
              data={notification.data}
              description={notification.description}
              notificationType={notification.notification_type}
              title={notification.title}
              image={notification.image}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationsTab
