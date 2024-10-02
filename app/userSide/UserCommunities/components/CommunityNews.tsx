import { View, Text, FlatList, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import { Events, News } from "../../../@types/supabaseTypes"
import { format, formatDate } from "date-fns"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import showAlert from "../../../utilFunctions/showAlert"
import supabase from "../../../../lib/supabase"
import getSingleEvent from "../../../supabaseFunctions/getFuncs/getSingleEvent"
import EventCard from "../../Events/components/EventCard"

export type NewsCard = {
  news: News
  userId: string | null | undefined
}

const NewsCard = ({ news, userId }: NewsCard) => {
  const [event, setEvent] = useState<Events | null>(null)
  const [loading, setLoading] = useState(false)
  const [showFullContent, setShowFullContent] = useState(false)
  const [likePressed, setLikePressed] = useState(false)
  const [likes, setLikes] = useState(news?.likes?.length || 0)
  const contentPreview =
    news.content.length > 150
      ? `${news.content.substring(0, 150)}...`
      : news.content

  const updateLikes = async () => {
    try {
      const { data: newsData, error: fetchError } = await supabase
        .from("news_posts")
        .select("likes")
        .eq("id", news.id)
        .single()

      if (fetchError) {
        console.error("Error fetching likes:", fetchError)
        return
      }

      const updatedLikes = [...(newsData.likes || []), userId]

      const { data, error } = await supabase
        .from("news_posts")
        .update({ likes: updatedLikes })
        .eq("id", news.id)

      if (error) {
        showAlert({
          title: "Error",
          message: "Error updating likes",
        })
      } else {
        setLikes(updatedLikes.length)
        console.log("Likes updated", data)
      }
    } catch (error) {
      console.log("Error updating likes", error)
    }
  }

  const removeLikes = async () => {
    try {
      const { data: newsData, error: fetchError } = await supabase
        .from("news_posts")
        .select("likes")
        .eq("id", news.id)
        .single()

      if (fetchError) {
        console.error("Error fetching likes:", fetchError)
        return
      }

      const updatedLikes = newsData.likes?.filter(
        (like: string) => like !== userId
      )

      const { error } = await supabase
        .from("news_posts")
        .update({ likes: updatedLikes })
        .eq("id", news.id)

      if (error) {
        showAlert({
          title: "Error",
          message: "Error removing likes",
        })
      }

      setLikes(updatedLikes.length)
    } catch (error) {
      console.log("Error removing likes", error)
    }
  }

  useEffect(() => {
    if (userId && news.likes && news.likes.includes(userId)) {
      setLikePressed(true)
    }

    if (news.event_link) {
      getSingleEvent(setLoading, news.event_link, setEvent)
    }
  }, [news])
  return (
    <View className="bg-white rounded-xl shadow-md m-4 overflow-hidden">
      {news.news_image ? (
        <View className="flex flex-row justify-center p-2">
          <SinglePicCommunity
            item={news.news_image}
            size={300}
            avatarRadius={10}
            noAvatarRadius={10}
            allowExpand={true}
          />
        </View>
      ) : null}
      <View className="p-4">
        <View className="flex-row items-center mb-2">
          {news.author_profile_pic ? (
            <SinglePicCommunity
              item={news.author_profile_pic}
              size={24}
              avatarRadius={100}
              noAvatarRadius={100}
              allowExpand={true}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-circle"
              size={24}
              color="#4B5563"
            />
          )}
          <Text className="ml-2 text-gray-700 font-semibold">
            {news.author_name}
          </Text>
          <Text className="ml-auto text-gray-500 text-xs">
            {format(new Date(news.created_at), "dd MMM yyyy, HH:mm")}
          </Text>
        </View>
        <Text className="text-xl font-bold text-gray-900 mb-2">
          {news.title}
        </Text>
        <Text className="text-gray-700">
          {showFullContent ? news.content : contentPreview}
        </Text>
        {news.content.length > 150 && (
          <TouchableOpacity
            onPress={() => setShowFullContent(!showFullContent)}
          >
            <Text className="text-blue-500 mt-2">
              {showFullContent ? "Show Less" : "Read More"}
            </Text>
          </TouchableOpacity>
        )}

        {news.event_link && event ? (
          <View className="mt-2">
            <View className="bg-black self-start rounded-lg overflow-hidden pt-1 pb-1">
              <EventCard
                title={event.event_title}
                date={event.date}
                communityId={event.community_host}
                eventId={event.id}
                eventCoverPhoto={event.event_cover_photo}
                eventPrice={event.price}
              />
            </View>
          </View>
        ) : null}

        <View className="flex-row justify-end mt-2">
          <TouchableOpacity
            onPress={() => {
              setLikePressed(likePressed ? false : true)
              if (!likePressed) {
                updateLikes()
              } else {
                removeLikes()
              }
            }}
            className="flex flex-row items-center mr-4"
          >
            {likes > 0 ? (
              <Text className="font-bold text-lg text-pink-400">{likes}</Text>
            ) : null}
            <MaterialCommunityIcons
              name={likePressed ? "heart" : "heart-outline"}
              size={24}
              color={likePressed ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export type CommunityNewsProps = {
  communityNews: News[] | null
  userId: string | null | undefined
}

const CommunityNews = ({ communityNews, userId }: CommunityNewsProps) => {
  return (
    <View className=" bg-primary-900">
      <View className="h-full">
        {communityNews && communityNews?.length > 0 ? (
          <FlatList
            data={communityNews}
            renderItem={({ item }) => <NewsCard news={item} userId={userId} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white font-bold">No News!</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default CommunityNews
