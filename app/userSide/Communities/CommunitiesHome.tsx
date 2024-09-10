import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { CommunityWithCompatibility } from "../../@types/supabaseTypes"
import CommunityCard from "./components/CommunityCard"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { NavBar } from "../../../components"
import SearchBar from "../Events/components/SearchBar"
import supabase from "../../../lib/supabase"
import BackButton from "../../components/BackButton"
import getCompatibleCommunities from "../../supabaseFunctions/getFuncs/getCompatibleCommunity"
import showAlert from "../../utilFunctions/showAlert"

const CommunitiesHome = () => {
  const { user } = useAuth()
  const [communities, setCommunities] = useState<CommunityWithCompatibility[]>(
    []
  )
  const [searchText, setSearchText] = useState<string>("")
  const [page, setPage] = useState<number>(0)
  const [endOfData, setEndOfData] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const PAGE_SIZE = 10

  const fetchCommunities = async (pageState: number, searchQuery: string) => {
    setLoading(true)

    if (user?.id !== undefined) {
      await getCompatibleCommunities(
        user?.id,
        pageState,
        setLoading,
        setCommunities,
        setEndOfData
      )

      setLoading(false)
    } else {
      showAlert({ title: "Error", message: "User not found" })
      setLoading(false)
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
    ({ item }: { item: CommunityWithCompatibility }) => (
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

  const keyExtractor = (item: CommunityWithCompatibility) => item.id.toString()

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
