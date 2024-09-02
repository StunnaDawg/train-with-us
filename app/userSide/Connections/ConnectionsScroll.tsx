import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { NavBar } from "../../../components"
import ConnectionsScrollCard from "./components/ConnectionsScrollCard"
import getConnectionProfiles from "../../supabaseFunctions/getFuncs/getConnectionsProfiles"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { Profile } from "../../@types/supabaseTypes"

const ConnectionsScroll = () => {
  const { user } = useAuth()
  const [loadingMore, setLoadingMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [connectionProfiles, setConnectionProfiles] = useState<Profile[]>([])
  const [page, setPage] = useState(0) // Track the current page

  const imageWidth = 363
  const itemMargin = 0

  const [currentIndex, setCurrentIndex] = useState(0)

  const windowHeight = Dimensions.get("window").height

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index)
    }
  }).current

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  }

  const fetchMoreProfiles = async () => {
    if (loadingMore || loading || !user) return // Prevent multiple fetches
    setLoadingMore(true)
    await getConnectionProfiles(setLoading, user.id, appendProfiles, page)
    setPage((prevPage) => prevPage + 1)
    setLoadingMore(false)
  }

  const appendProfiles = (newProfiles: Profile[]) => {
    setConnectionProfiles((prevProfiles) => [...prevProfiles, ...newProfiles])
  }

  const fetchConnectionProfiles = async () => {
    if (user) {
      setLoading(true)
      await getConnectionProfiles(
        setLoading,
        user.id,
        setConnectionProfiles,
        0 // Initial page
      )

      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConnectionProfiles()
  }, [user])

  const renderCard = useCallback(({ item }: { item: Profile }) => {
    return (
      <View style={{ height: windowHeight }}>
        <ConnectionsScrollCard
          profile={item}
          loading={loading}
          setLoading={setLoading}
        />
      </View>
    )
  }, [])

  const cardKeyExtractor = useCallback((item: Profile, index: number) => {
    return item.id + index.toString()
  }, [])

  return (
    <View className="bg-black" style={{ flex: 1 }}>
      <View className="mb-1">
        {/* <NavBar
          textColour="text-white"
          title="Connections"
          showFriends={true}
          showSettings={false}
          showSearchCommunities={false}
          searchUsers={true}
        /> */}
        {loadingMore && (
          <View className="flex-1">
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
      </View>
      <FlatList
        initialNumToRender={1}
        disableIntervalMomentum={true}
        snapToAlignment="center"
        pagingEnabled={true}
        decelerationRate="fast"
        snapToInterval={windowHeight}
        data={connectionProfiles}
        keyExtractor={cardKeyExtractor}
        renderItem={renderCard}
        onEndReached={fetchMoreProfiles}
        onEndReachedThreshold={0.5}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default ConnectionsScroll
