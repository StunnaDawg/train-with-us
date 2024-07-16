import { View, Text, ScrollView, RefreshControl, Pressable } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import getAllCommunities from "../../supabaseFunctions/getFuncs/getAllCommunities"
import { Communities } from "../../@types/supabaseTypes"
import CommunityCard from "./components/CommunityCard"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { NavBar } from "../../../components"

const CommunitiesHome = () => {
  const [communities, setCommunities] = useState<Communities[] | null>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()
  const { user } = useAuth()

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
      <NavBar
        title="Communities"
        bgColour="bg-primary-900"
        textColour="text-white"
        showFriends={false}
        showSettings={false}
        showSearchCommunities={true}
        searchUsers={false}
      />
      <View className="flex-1 bg-primary-900">
        <View className="m-2">
          <Text className="text-white font-bold text-2xl">Halifax, NS</Text>
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
                  <CommunityCard community={community} userId={user?.id} />
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
