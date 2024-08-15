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
  const [page, setPage] = useState(1) // Track the current page
  const [loadingMore, setLoadingMore] = useState(false) // Track loading more data
  const [endOfData, setEndOfData] = useState(false) // Track if there is more data to fetch
  const screenHeight = Dimensions.get("window").height
  const cardHeight = screenHeight - 20 // Adjust card height to leave space for navigation bar or any other element
  const scrollEnabled = useSharedValue(scrollEnabledState)
  const translationY = useSharedValue(0)
  const startY = useSharedValue(0)

  const fetchMoreProfiles = async () => {
    if (loadingMore || loading || !user || endOfData) return // Prevent multiple fetches
    setLoadingMore(true)
    await getConnectionProfiles(setLoading, user.id, appendProfiles, page)
    setPage((prevPage) => prevPage + 1)
    setLoadingMore(false)
  }

  const appendProfiles = (newProfiles: Profile[]) => {
    setConnectionProfiles((prevProfiles) => [...prevProfiles, ...newProfiles])
  }

  const fetchMoreProfilesRef = useRef(fetchMoreProfiles)
  fetchMoreProfilesRef.current = fetchMoreProfiles

  //handles the scroll event and the end drag event to snap the scrollview to the nearest card and fetch more profiles
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (endOfData) return
      translationY.value = event.contentOffset.y
      if (
        event.contentOffset.y + screenHeight >=
        connectionProfiles.length * cardHeight - 200
      ) {
        runOnJS(fetchMoreProfiles)()
      }
    },
    onEndDrag: (event) => {
      if (endOfData) return
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
    if (endOfData === false) {
      scrollEnabled.value = true
      setScrollEnabled(true)
    } else {
      scrollEnabled.value = false
      setScrollEnabled(false)
    }
  }, [connectionProfiles])

  return (
    <SafeAreaView className="bg-primary-900" style={{ flex: 1 }}>
      <View className="mb-1">
        <NavBar
          textColour="text-white"
          title="Connections"
          showFriends={true}
          showSettings={false}
          showSearchCommunities={false}
          searchUsers={true}
        />
        {loadingMore && (
          <View className="flex-1">
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
      </View>
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
            height: cardHeight * connectionProfiles.length, // Ensure the content container is tall enough
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
                      isLast={index === connectionProfiles.length - 1}
                      setEndOfData={setEndOfData}
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
