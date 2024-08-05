import {
  Dimensions,
  Platform,
  SafeAreaView,
  View,
  ActivityIndicator,
} from "react-native"
import { runOnJS } from "react-native-reanimated"

import React, { useEffect, useState, useRef } from "react"
import ConnectionsCard from "./components/ConnectionsCard"
import { Profile } from "../../@types/supabaseTypes"
import getConnectionProfiles from "../../supabaseFunctions/getFuncs/getConnectionsProfiles"
import { useAuth } from "../../supabaseFunctions/authcontext"
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import { NavBar } from "../../../components"
import CardSkeleton from "./components/CardSkeleton"

const Connections = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [newConnection, setNewConnection] = useState<boolean>(false)
  const [connectionProfiles, setConnectionProfiles] = useState<Profile[]>([])
  const [scrollEnabledState, setScrollEnabled] = useState(true)
  const [page, setPage] = useState(0) // Track the current page
  const [loadingMore, setLoadingMore] = useState(false) // Track loading more data
  // Track if more data can be fetched
  const screenHeight = Dimensions.get("window").height
  const cardHeight = screenHeight - 50 // Adjust card height to leave space for navigation bar or any other element
  const scrollEnabled = useSharedValue(scrollEnabledState)
  const translationY = useSharedValue(0)
  const startY = useSharedValue(0)

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

  // Create a ref for fetchMoreProfiles
  const fetchMoreProfilesRef = useRef(fetchMoreProfiles)
  fetchMoreProfilesRef.current = fetchMoreProfiles

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translationY.value = event.contentOffset.y
      if (
        event.contentOffset.y + screenHeight >=
        connectionProfiles.length * cardHeight - 200
      ) {
        runOnJS(fetchMoreProfilesRef.current)()
      }
    },
    onEndDrag: (event) => {
      const offsetY = event.contentOffset.y
      const distance = offsetY - startY.value
      const targetIndex =
        distance < cardHeight / 2
          ? Math.floor(offsetY / cardHeight)
          : Math.ceil(offsetY / cardHeight)
      let targetOffset = targetIndex * cardHeight

      // Ensure targetOffset does not exceed the scrollable content height
      const maxOffset = connectionProfiles.length * cardHeight - cardHeight // Assumes each card takes up exactly 'cardHeight' space
      if (targetOffset > maxOffset) {
        targetOffset = maxOffset
      }

      translationY.value = withSpring(targetOffset, { damping: 20 })
    },
  })

  const fetchConnectionProfiles = async () => {
    if (user) {
      setLoading(true)
      await getConnectionProfiles(
        setLoading,
        user.id,
        setConnectionProfiles,
        0 // Initial page
      )
      setPage(1) // Set initial page to 1
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConnectionProfiles()
  }, [user])

  useEffect(() => {
    if (!user) return

    if (newConnection && connectionProfiles.length > 0) {
      setConnectionProfiles((prevProfiles) => prevProfiles.slice(1))
    }
  }, [newConnection])

  useEffect(() => {
    scrollEnabled.value = true // Re-enable scrolling when the data changes (new fetch etc.)
  }, [connectionProfiles])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar
        title="Connections"
        iconColour="black"
        showFriends={true}
        showSettings={false}
        showSearchCommunities={false}
        searchUsers={true}
      />
      {loadingMore && (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: Adds a semi-transparent background
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEnabled={scrollEnabledState}
          scrollEventThrottle={16}
          snapToInterval={cardHeight} // Optional, native snapping to help with alignment
          decelerationRate="fast"
          snapToAlignment="start"
          contentContainerStyle={{
            minHeight: cardHeight * connectionProfiles.length, // Ensure the content container is tall enough
          }}
        >
          <View className="flex flex-row justify-center">
            <View>
              {loading ? (
                <CardSkeleton />
              ) : (
                connectionProfiles.map((profile, index) => (
                  <View
                    key={profile.id}
                    style={{
                      height: cardHeight,
                      justifyContent: "center",
                    }}
                  >
                    <ConnectionsCard
                      key={profile.id}
                      setLoading={setNewConnection}
                      loading={newConnection}
                      profile={profile}
                      isLast={false}
                      setScroll={setScrollEnabled}
                    />
                  </View>
                ))
              )}
            </View>
          </View>
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Connections
