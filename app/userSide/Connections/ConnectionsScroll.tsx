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
  const [page, setPage] = useState(1) // Track the current page

  const [hasMore, setHasMore] = useState(true) // Add this to track if more data is available
  const [isLoading, setIsLoading] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)

  const windowWidth = Dimensions.get("window").width
  const windowHeight = Dimensions.get("window").height

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index)
    }
  }).current

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  }

  const handleScroll = useCallback(
    ({ nativeEvent }: any) => {
      const { contentOffset, layoutMeasurement, contentSize } = nativeEvent

      // Calculate how close to the end we are
      const isCloseToEnd =
        contentOffset.x + layoutMeasurement.width >=
        contentSize.width - layoutMeasurement.width * 0.5 // Load when within 50% of the end

      if (isCloseToEnd && !isLoading && hasMore) {
        fetchMoreProfiles()
      }
    },
    [isLoading, hasMore]
  )

  const fetchMoreProfiles = async () => {
    // Add more strict conditions for fetching
    if (!user || isLoading || !hasMore || loadingMore) return

    try {
      setIsLoading(true)
      setLoadingMore(true)

      const newProfiles = await getConnectionProfiles(
        setLoading,
        user.id,
        appendProfiles,
        page
      )

      // Check if we received any new profiles
      if (newProfiles && newProfiles.length === 0) {
        setHasMore(false)
        return
      }

      setPage((prevPage) => prevPage + 1)
    } catch (error) {
      console.error("Error fetching more profiles:", error)
    } finally {
      setIsLoading(false)
      setLoadingMore(false)
    }
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
  }, [])

  useEffect(() => {
    fetchMoreProfiles()
  }, [currentIndex])

  const renderCard = useCallback(({ item }: { item: Profile }) => {
    return (
      <View style={{ height: windowHeight, width: windowWidth }}>
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
        horizontal={true}
        initialNumToRender={1}
        disableIntervalMomentum={true}
        snapToAlignment="center"
        pagingEnabled={true}
        decelerationRate="fast"
        scrollEventThrottle={16}
        snapToInterval={windowWidth}
        data={connectionProfiles}
        keyExtractor={cardKeyExtractor}
        renderItem={renderCard}
        onScroll={handleScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  )
}

export default ConnectionsScroll
