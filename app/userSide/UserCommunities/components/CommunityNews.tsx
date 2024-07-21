import { View, Text, FlatList } from "react-native"
import React from "react"
import getNewsFromCommunity from "../../../supabaseFunctions/getFuncs/getNewsFromCommunity"
import { News } from "../../../@types/supabaseTypes"
import { formatDate } from "date-fns"

export type NewsCard = {
  news: News
}

const NewsCard = ({ news }: NewsCard) => {
  return (
    <View className="rounded-xl p-2 ">
      <Text className="text-xs text-white font-bold">
        {news.author_name},{" "}
        {formatDate(new Date(news.created_at), "dd/MM/yyyy/HH:mm")}
      </Text>
      <View className="flex flex-row jus">
        <Text className=" font-bold text-lg text-white">{news.title}</Text>
      </View>

      <Text className="text-slate-200 ">{news.content}</Text>
    </View>
  )
}

export type CommunityNewsProps = {
  communityNews: News[] | null
}

const CommunityNews = ({ communityNews }: CommunityNewsProps) => {
  return (
    <View className="flex-1 bg-primary-900">
      <View>
        <FlatList
          className="h-full"
          data={communityNews}
          renderItem={({ item }) => (
            <View className="m-2 border-b-2 border-slate-500">
              <NewsCard news={item} />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  )
}

export default CommunityNews
