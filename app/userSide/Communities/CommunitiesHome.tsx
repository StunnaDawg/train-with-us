import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import getAllCommunities from "../../supabaseFunctions/getFuncs/getAllCommunities"
import { Communities } from "../../@types/supabaseTypes"
import CommunityCard from "./components/CommunityCard"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { NavBar } from "../../../components"
import searchCommunitiesFunction from "../../supabaseFunctions/getFuncs/searchCommunities"
import SearchBar from "../Events/components/SearchBar"

const CommunitiesHome = () => {
  const [communities, setCommunities] = useState<Communities[] | null>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>("")
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()
  const { user } = useAuth()

  const limit = 4

  const fetchCommunities = async (
    pageNumber: number,
    isRefreshing = false,
    query = searchText
  ) => {
    await getAllCommunities(
      pageNumber,
      limit,
      setLoading,
      setCommunities,
      communities,
      isRefreshing
    )
    setLoadingMore(false)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setPage(1)
    fetchCommunities(1, true).then(() => setRefreshing(false))
  }, [])

  const loadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true)
      const nextPage = page + 1
      setPage(nextPage)
      fetchCommunities(nextPage)
    }
  }

  useEffect(() => {
    if (!searchText) fetchCommunities(1)
  }, [])

  useEffect(() => {
    if (searchText) {
      searchCommunitiesFunction(
        searchText,
        setCommunities,
        setLoading,
        page,
        limit
      )
    }
  }, [searchText])

  const renderItem = ({ item }: { item: Communities }) => (
    <View className="m-2">
      <CommunityCard community={item} userId={user?.id} />
    </View>
  )

  const keyExtractor = (item: Communities) => item.id.toString()

  const handleSearch = (text: string) => {
    setSearchText(text)
    setPage(1) // Reset to the first page
    fetchCommunities(1, true, text) // Fetch with the search query
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-primary-900">
        <NavBar
          navBar={true}
          title="Find Communities"
          bgColour="bg-primary-900"
          textColour="text-white"
          showFriends={false}
          showSettings={false}
          showSearchCommunities={false}
          searchUsers={false}
        />

        <View>
          <View className="flex-grow">
            <SearchBar
              value={searchText}
              onChange={(text) => handleSearch(text)}
              placeholder="Search Communities"
            />
          </View>
          <View className="m-2">
            <Text className="text-white font-bold text-2xl">Halifax, NS</Text>
          </View>
          <FlatList
            data={communities}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : null
            }
            initialNumToRender={1}
            onEndReached={
              communities && communities?.length > 0 && !searchText
                ? loadMore
                : null
            }
            onEndReachedThreshold={0.7}
            ListEmptyComponent={
              <View className="m-2">
                <Text>No Communities near!</Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </>
  )
}

export default CommunitiesHome
