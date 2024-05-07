import { RefreshControl, Text } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import ConnectionsCard from "./components/ConnectionsCard"
import { Profile } from "../../@types/supabaseTypes"
import getConnectionProfiles from "../../supabaseFunctions/getFuncs/getConnectionsProfiles"
import { useAuth } from "../../supabaseFunctions/authcontext"
import Animated, {
  ReduceMotion,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"

const Connections = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [newConnection, setNewConnection] = useState<boolean>(false)
  const [connectionProfiles, setConnectionProfiles] = useState<Profile[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardHeight = 600
  const scrollEnabled = useSharedValue(true)
  const translationY = useSharedValue(0)
  const startY = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -translationY.value }],
    }
  })

  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: (event) => {
      startY.value = event.contentOffset.y // Capture the start position
    },
    onScroll: (event) => {
      translationY.value = event.contentOffset.y
    },
    onEndDrag: (event) => {
      const offsetY = event.contentOffset.y
      const distance = offsetY - startY.value
      const targetIndex =
        distance < 0
          ? Math.floor(offsetY / cardHeight)
          : Math.ceil(offsetY / cardHeight)
      const targetOffset = targetIndex * cardHeight

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

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translationY.value,
        },
      ],
    }
  })

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
    if (connectionProfiles)
      console.log("gottenn profiles", [...connectionProfiles])
  }, [connectionProfiles])

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      snapToInterval={cardHeight} // Optional, native snapping to help with alignment
      decelerationRate="fast"
    >
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        connectionProfiles.map((profile, index) => (
          <ConnectionsCard
            key={index}
            setLoading={setNewConnection}
            loading={newConnection}
            profile={profile}
          />
        ))
      )}
      {connectionProfiles.length === 0 && !loading && (
        <Text>No Users at the Moment!</Text>
      )}
    </Animated.ScrollView>
  )
}

export default Connections
