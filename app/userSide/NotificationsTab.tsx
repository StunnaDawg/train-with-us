import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import BackButton from "../components/BackButton"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"
import { useAuth } from "../supabaseFunctions/authcontext"
import { SupaNotification } from "../@types/supabaseTypes"
import supabase from "../../lib/supabase"
import SinglePicCommunity from "../components/SinglePicCommunity"
import formatTimestampShort from "../utilFunctions/formatTimeStampShort"

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

  const handlePressIn = () => setIsPressed(true)
  const handlePressOut = () => setIsPressed(false)

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={`bg-white border border-gray-200 rounded-lg p-3 mb-2 ${
        isPressed ? "opacity-50" : ""
      }`}
      onPress={() => {
        console.log("notificationType", notificationType)
        if (notificationType === "MessageNotification") {
          navigation.navigate("MessagingScreen", {
            chatSession: data,
          })
        }

        if (notificationType === "ChannelNotification") {
          navigation.navigate("ChannelScreen", {
            channelId: data,
          })
        }

        if (notificationType === "CommunityRequest") {
          navigation.navigate("MyCommunityRequests", {
            communityId: data.community_id,
            communityTitle: data.community_title,
          })
        }

        if (notificationType === "CommunityRequestAccepted") {
          navigation.navigate("CommunityPage", {
            community: data,
          })
        }

        if (notificationType === "ConnectionRequest") {
          navigation.navigate("DirectMessageTab")
        }
        if (notificationType === "ConnectionAccepted") {
          navigation.navigate("MessagingScreen", {
            chatSession: data,
          })
        }
        if (notificationType === "NewEvent") {
          navigation.navigate("ViewEvent", {
            eventId: data.event_id,
          })
        }

        if (notificationType === "EventChannelNotification") {
          navigation.navigate("EventChat", {
            eventChat: data,
          })
        }
      }}
    >
      <View className="flex-row items-center">
        <View className="mr-3">
          <SinglePicCommunity
            item={image}
            size={50}
            avatarRadius={25}
            noAvatarRadius={25}
            allowCacheImage={true}
          />
        </View>
        <View className="flex-1 justify-center">
          <Text className="font-semibold text-gray-800 mb-1">{title}</Text>
          <Text className="text-gray-600 text-sm">{description}</Text>
        </View>
        <View className="ml-2">
          <Text className="text-xs text-gray-500">
            {formatTimestampShort(createdAt)}
          </Text>
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
  const [page, setPage] = useState<number>(0)
  const [endOfData, setEndOfData] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const PAGE_SIZE = 10

  const fetchNotifications = async (pageState: number) => {
    const from = pageState * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(from, to)
    setLoading(false)

    if (error) {
      throw new Error(error.message)
    } else {
      if (data.length < PAGE_SIZE) {
        setEndOfData(true)
      }
      setNotifications((prevNotifications) =>
        prevNotifications ? [...prevNotifications, ...data] : data
      )

      const unreadNotificationIds = data
        .filter((notification) => !notification.is_read)
        .map((notification) => notification.id)

      if (unreadNotificationIds.length > 0) {
        await supabase
          .from("notifications")
          .update({ is_read: true })
          .in("id", unreadNotificationIds)
      }
    }
  }

  useEffect(() => {
    fetchNotifications(page)
  }, [user, page])

  const loadMoreNotifications = () => {
    if (!endOfData && !loading) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const renderFooter = () => {
    if (!loading) return null
    return <ActivityIndicator size="large" className="py-4" color="#0000ff" />
  }

  const renderNotification = useCallback(
    ({ item }: { item: SupaNotification }) => (
      <NotificationsCard
        key={item.id}
        createdAt={item.created_at}
        data={item.data}
        description={item.description}
        notificationType={item.notification_type}
        title={item.title}
        image={item.image}
      />
    ),
    []
  )

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-row items-center px-4 py-3 border-b border-white/10">
        <BackButton colour="white" size={18} />
        <Text className="text-white text-xl font-bold ml-4">Notifications</Text>
      </View>
      <FlatList
        className="px-4 pt-2"
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        renderItem={renderNotification}
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreNotifications}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  )
}

export default NotificationsTab
