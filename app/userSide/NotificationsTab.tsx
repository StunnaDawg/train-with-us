import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
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

        <View>
          <Text>{formatTimestampShort(createdAt)}</Text>
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
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  const renderNotification = useCallback(
    ({ item }: { item: SupaNotification }) => {
      return (
        <NotificationsCard
          key={item.id}
          createdAt={item.created_at}
          data={item.data}
          description={item.description}
          notificationType={item.notification_type}
          title={item.title}
          image={item.image}
        />
      )
    },
    []
  )

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
      <FlatList
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
