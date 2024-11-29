import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Platform,
} from "react-native"
import React, { useCallback, useEffect, useState, useMemo, useRef } from "react"
import ConnectionsScrollCard from "./components/ConnectionsScrollCard"
import getConnectionProfiles from "../../supabaseFunctions/getFuncs/getConnectionsProfiles"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { Profile } from "../../@types/supabaseTypes"
import supabase from "../../../lib/supabase"

const PAGE_SIZE = 5 // Define constant for page size

const ConnectionsScroll = () => {
  const { user } = useAuth()
  const [connectionProfiles, setConnectionProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [page, setPage] = useState<number>(0)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [stopScroll, setStopScroll] = useState<boolean>(false)

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

  // const loadMoreProfiles = useCallback(async () => {
  //   if (!user || loadingMore || !hasMore || loading) return

  //   try {
  //     setLoadingMore(true)
  //     console.log("Loading more profiles, page:", page) // Debug log

  //     const newProfiles = await getConnectionProfiles(
  //       setLoading,
  //       user.id,
  //       (profiles) => {
  //         setConnectionProfiles((prev) => [...prev, ...profiles])
  //       },
  //       page
  //     )

  //     if (!newProfiles || newProfiles.length < PAGE_SIZE) {
  //       console.log("No more profiles to load") // Debug log
  //       setHasMore(false)
  //     } else {
  //       setPage((prev) => prev + 1)
  //     }
  //   } catch (error) {
  //     console.error("Error loading more profiles:", error)
  //   } finally {
  //     setLoadingMore(false)
  //   }
  // }, [user, loadingMore, hasMore, loading, page])

  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 100,
      minimumViewTime: 2000,
    }),
    []
  )
  // const onViewableItemsChanged = useCallback(
  //   ({ viewableItems }: any) => {
  //     if (viewableItems.length > 0) {
  //       const newIndex = viewableItems[0].index
  //       setCurrentIndex(newIndex)

  //       // Load more when user is within 2 items of the end
  //       if (newIndex >= connectionProfiles.length - 2) {
  //         console.log("Near end of list, loading more...") // Debug log
  //         loadMoreProfiles()
  //       }
  //     }
  //   },
  //   [connectionProfiles.length, loadMoreProfiles]
  // )

  // Initial load
  useEffect(() => {
    if (user && connectionProfiles.length === 0) {
      getConnectionProfiles(setLoading, user.id, setConnectionProfiles, page)
    }
  }, [user])

  const renderCard = useCallback(
    ({ item }: { item: Profile }) => (
      <View key={item.id} style={{ width: windowWidth, height: windowHeight }}>
        <ConnectionsScrollCard
          profile={item}
          loading={loading}
          setLoading={setLoading}
          stopScroll={setStopScroll}
        />
      </View>
    ),
    [windowWidth, windowHeight]
  )

  const flatListRef = useRef<FlatList>(null)
  const touchStartX = useRef(0)

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < connectionProfiles.length) {
      flatListRef.current?.scrollToIndex({ index, animated: true })
      setCurrentIndex(index)
    }
  }

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
        ref={flatListRef}
        scrollEnabled={false}
        horizontal
        data={connectionProfiles}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        getItemLayout={getItemLayout}
        bounces={true}
        bouncesZoom={true}
        initialScrollIndex={currentIndex}
        onTouchStart={(e) => {
          touchStartX.current = e.nativeEvent.pageX
        }}
        onTouchEnd={(e) => {
          const touchEndX = e.nativeEvent.pageX
          const diff = touchStartX.current - touchEndX

          if (Math.abs(diff) > 50) {
            // Minimum swipe distance
            if (diff > 0 && currentIndex < connectionProfiles.length - 1) {
              // Swipe left -> next item
              scrollToIndex(currentIndex + 1)
            } else if (diff < 0 && currentIndex > 0) {
              // Swipe right -> previous item Not allowed to go back in stack
              scrollToIndex(currentIndex - 0)
            }
          }
        }}
      />
    </View>
  )
}

export default ConnectionsScroll
