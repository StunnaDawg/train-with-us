import { View, Text, ScrollView, RefreshControl, Pressable } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import getAllCommunities from "../../supabaseFunctions/getFuncs/getAllCommunities"
import { Communities } from "../../@types/supabaseTypes"
import CommunityCard from "./components/CommunityCard"
import { FontAwesome6 } from "@expo/vector-icons"

const CommunitiesHome = () => {
  const [communities, setCommunities] = useState<Communities[] | null>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [refreshing])

  useEffect(() => {
    getAllCommunities(setLoading, setCommunities)
  }, [refreshing])

  return (
    <>
      <View className="flex-1 bg-primary-900">
        <View className="flex flex-row justify-between m-6 items-center">
          <View>
            <Text className="text-xl text-white font-bold">Communites</Text>
          </View>

          <Pressable
            onPress={() => {
              navigation.navigate("SearchCommunities")
            }}
          >
            <FontAwesome6 name="magnifying-glass" size={20} color="white" />
          </Pressable>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!loading ? (
            communities && communities.length > 0 ? (
              communities.map((community) => (
                <View key={community.id} className="m-2">
                  <CommunityCard community={community} />
                </View>
              ))
            ) : (
              <>
                <View className="m-2">
                  <Text>No Communities near!</Text>
                </View>
              </>
            )
          ) : null}
        </ScrollView>
      </View>
    </>
  )
}

export default CommunitiesHome
