import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import supabase from "../../../lib/supabase"
import { NavigationType } from "../../@types/navigation"
import getAllCommunities from "../../supabaseFunctions/getFuncs/getAllCommunities"
import { Communities } from "../../@types/supabaseTypes"
import CommunityCard from "./components/CommunityCard"

const CommunitiesHome = () => {
  const [communities, setCommunities] = useState<Communities[] | null>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()
  const currentUser = supabase.auth.getUser()
  const isFocused = useIsFocused()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    getAllCommunities(setLoading, setCommunities)
  }, [])

  useEffect(() => {
    getAllCommunities(setLoading, setCommunities)
  }, [refreshing])

  return (
    <>
      <View className="m-6">
        <Text className="text-2xl font-bold">Communites</Text>
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
    </>
  )
}

export default CommunitiesHome
