import { Dimensions, Platform, SafeAreaView, View } from "react-native"
import React, { useEffect, useState } from "react"
import ConnectionsCard from "./components/ConnectionsCard"
import { Profile } from "../../@types/supabaseTypes"
import getConnectionProfiles from "../../supabaseFunctions/getFuncs/getConnectionsProfiles"
import { useAuth } from "../../supabaseFunctions/authcontext"
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { NavigationType } from "../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { NavBar } from "../../../components"
import CardSkeleton from "./components/CardSkeleton"

const Connections = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [newConnection, setNewConnection] = useState<boolean>(false)
  const [connectionProfiles, setConnectionProfiles] = useState<Profile[]>([])
  const [scrollEnabledState, setScrollEnabled] = useState(true)
  const navigation = useNavigation<NavigationType>()
  const screenHeight = Dimensions.get("window").height
  const cardHeight = screenHeight - 100 // Adjust card height to leave space for navigation bar or any other element
  const scrollEnabled = useSharedValue(scrollEnabledState)
  const translationY = useSharedValue(0)
  const startY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: (event) => {
      startY.value = event.contentOffset.y
    },
    onScroll: (event) => {
      translationY.value = event.contentOffset.y
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
      await getConnectionProfiles(setLoading, user.id, setConnectionProfiles)
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
                    setScroll={setScrollEnabled}
                  />
                </View>
              ))
            )}
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

export default Connections
