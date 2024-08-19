import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { Communities } from "../../@types/supabaseTypes"
import CommunityCard from "./components/CommunityCard"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { NavBar } from "../../../components"
import SearchBar from "../Events/components/SearchBar"
import supabase from "../../../lib/supabase"
import BackButton from "../../components/BackButton"

const CommunitiesHome = () => {
  const { user } = useAuth()
  const [communities, setCommunities] = useState<Communities[]>([])
  const [searchText, setSearchText] = useState<string>("")
  const [page, setPage] = useState<number>(0)
  const [endOfData, setEndOfData] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const PAGE_SIZE = 10

  const fetchCommunities = async (pageState: number, searchQuery: string) => {
    const from = pageState * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    setLoading(true)

    let query = supabase.from("communities").select("*").range(from, to)

    if (searchQuery) {
      query = query.ilike("community_title", `%${searchQuery}%`)
    }

    const { data, error } = await query
    setLoading(false)

    if (error) {
      throw new Error(error.message)
    } else {
      if (data.length < PAGE_SIZE) {
        setEndOfData(true)
      }
      setCommunities((prevCommunties) =>
        pageState === 0 ? data : [...prevCommunties, ...data]
      )
    }
  }

  useEffect(() => {
    fetchCommunities(page, searchText)
  }, [page, searchText])

  const loadMoreCommunties = () => {
    if (!endOfData && !loading) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const renderItem = useCallback(
    ({ item }: { item: Communities }) => (
      <View className="m-2">
        <CommunityCard community={item} userId={user?.id} />
      </View>
    ),
    []
  )

  const renderFooter = () => {
    if (!loading) return null
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  const keyExtractor = (item: Communities) => item.id.toString()

  const handleSearch = (text: string) => {
    setSearchText(text)
    setPage(0)
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View>
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
        <View className="flex flex-row items-center">
          <View className="mx-1">
            <BackButton colour="white" size={26} />
          </View>

          <View className="flex-grow">
            <SearchBar
              value={searchText}
              onChange={(text) => handleSearch(text)}
              placeholder="Search Communities"
            />
          </View>
        </View>

        <View className="mx-2">
          <Text className="text-white font-bold text-2xl">Halifax, NS</Text>
        </View>
      </View>
      <View className="flex-1">
        <FlatList
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          data={communities}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListFooterComponent={renderFooter}
          onEndReached={loadMoreCommunties}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingBottom: 10 }}
          ListEmptyComponent={
            <View className="m-2">
              <Text className="text-white">No Communities near!</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  )
}

export default CommunitiesHome
