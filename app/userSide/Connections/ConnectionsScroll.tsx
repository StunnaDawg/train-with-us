import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native"
import React, { useCallback, useEffect, useState, useMemo } from "react"
import { NavBar } from "../../../components"
import ConnectionsScrollCard from "./components/ConnectionsScrollCard"
import getConnectionProfiles from "../../supabaseFunctions/getFuncs/getConnectionsProfiles"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { Profile } from "../../@types/supabaseTypes"

const PAGE_SIZE = 5 // Define constant for page size

const ConnectionsScroll = () => {
  const { user } = useAuth()
  const [connectionProfiles, setConnectionProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const windowWidth = Dimensions.get("window").width
  const windowHeight = Dimensions.get("window").height

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: windowWidth,
      offset: windowWidth * index,
      index,
    }),
    [windowWidth]
  )

  const loadMoreProfiles = useCallback(async () => {
    if (!user || loadingMore || !hasMore || loading) return

    try {
      setLoadingMore(true)
      console.log("Loading more profiles, page:", page) // Debug log

      const newProfiles = await getConnectionProfiles(
        setLoading,
        user.id,
        (profiles) => {
          setConnectionProfiles((prev) => [...prev, ...profiles])
        },
        page
      )

      if (!newProfiles || newProfiles.length < PAGE_SIZE) {
        console.log("No more profiles to load") // Debug log
        setHasMore(false)
      } else {
        setPage((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Error loading more profiles:", error)
    } finally {
      setLoadingMore(false)
    }
  }, [user, loadingMore, hasMore, loading, page])

  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 50,
      minimumViewTime: 0,
    }),
    []
  )

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index
        setCurrentIndex(newIndex)

        // Load more when user is within 2 items of the end
        if (newIndex >= connectionProfiles.length - 2) {
          console.log("Near end of list, loading more...") // Debug log
          loadMoreProfiles()
        }
      }
    },
    [connectionProfiles.length, loadMoreProfiles]
  )

  // Initial load
  useEffect(() => {
    if (user && connectionProfiles.length === 0) {
      loadMoreProfiles()
    }
  }, [user])

  const renderCard = useCallback(
    ({ item }: { item: Profile }) => (
      <View style={{ width: windowWidth, height: windowHeight }}>
        <ConnectionsScrollCard
          profile={item}
          loading={loading}
          setLoading={setLoading}
        />
      </View>
    ),
    [windowWidth, windowHeight]
  )

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
          <View className="absolute top-0 left-0 right-0 z-50 items-center">
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
      </View>

      <FlatList
        horizontal
        data={connectionProfiles}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={windowWidth}
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate={0}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        windowSize={3}
        disableIntervalMomentum={true}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        getItemLayout={getItemLayout}
        snapToOffsets={connectionProfiles.map(
          (_, index) => index * windowWidth
        )}
      />
    </View>
  )
}

export default ConnectionsScroll
