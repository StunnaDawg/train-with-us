import { View, Text, FlatList } from "react-native"
import React from "react"
import getNewsFromCommunity from "../../../supabaseFunctions/getFuncs/getNewsFromCommunity"
import { News } from "../../../@types/supabaseTypes"

export type NewsCard = {
  news: News
}

const NewsCard = ({ news }: NewsCard) => {
  return (
    <View className="rounded-xl p-2 m-2 bg-slate-500">
      <View className="flex flex-row jus">
        <Text className=" font-semibold text-lg">{news.title}</Text>
      </View>

      <Text className="">
        {news.content}
        sdfmnsdflsdbnskjdbfskjdgbskjdgbskjgdbsdkjgbskjbksjgbgbjksbkgjbsdgk
        sbfkbgfskjdf ksdbhfdkjsfb sksjfsdjkfbsjdfsjkfbsd fsdjfsbd
        fskdjhfsdjfkhsdf sjkdfhsjkdf hsdkjfhskjdfhs dfjsdfh s
      </Text>

      <Text className="text-xs">{news.author_name}</Text>
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
