import { View, Text, FlatList } from "react-native"
import React from "react"
import getNewsFromCommunity from "../../../supabaseFunctions/getFuncs/getNewsFromCommunity"
import { News } from "../../../@types/supabaseTypes"

export type NewsCard = {
  news: News
}

const NewsCard = ({ news }: NewsCard) => {
  return (
    <View className="bg-white rounded-xl p-2">
      <View className="flex flex-row justify-between">
        <Text className="text-white font-semibold text-lg">{news.title}</Text>
        <Text className="text-white font-semibold text-sm">{news.content}</Text>
      </View>
      <Text className="text-white">{news.content}</Text>
    </View>
  )
}

export type CommunityNewsProps = {
  communityNews: News[] | null
}

const CommunityNews = ({ communityNews }: CommunityNewsProps) => {
  return (
    <View className="flex-1 bg-primary-900">
      <View className="flex flex-row justify-center m-2">
        <Text className="text-white font-semibold text-xl">Community News</Text>
      </View>

      <View>
        <FlatList
          data={communityNews}
          renderItem={({ item }) => (
            <View className="m-2">
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
