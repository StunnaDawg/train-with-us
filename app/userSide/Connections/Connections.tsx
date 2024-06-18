import { Pressable, SafeAreaView, Text, View } from "react-native"
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
import { FontAwesome6 } from "@expo/vector-icons"

const Connections = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [newConnection, setNewConnection] = useState<boolean>(false)
  const [connectionProfiles, setConnectionProfiles] = useState<Profile[]>([])
  const [scrollEnabledState, setScrollEnabled] = useState(true)
  const navigation = useNavigation<NavigationType>()
  const cardHeight = 600
  const scrollEnabled = useSharedValue(scrollEnabledState)
  const translationY = useSharedValue(0)
  const startY = useSharedValue(0)

  const fillerHeight = connectionProfiles.length % cardHeight

  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: (event) => {
      startY.value = event.contentOffset.y
      console.log("startY", startY.value)
    },
    onScroll: (event) => {
      translationY.value = event.contentOffset.y
    },
    onEndDrag: (event) => {
      const offsetY = event.contentOffset.y
      const distance = offsetY - startY.value
      const targetIndex =
        distance < 500
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
    <SafeAreaView>
      <View className="flex flex-row justify-end mx-2">
        <Pressable
          className="flex flex-row items-center"
          onPress={() => navigation.navigate("SearchUsers")}
        >
          <Text className="mx-2 mt-1 text-xl font-bold">Search Users</Text>
          <FontAwesome6 name="magnifying-glass" size={24} color="black" />
        </Pressable>
      </View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEnabled={scrollEnabledState}
        scrollEventThrottle={16}
        snapToInterval={cardHeight} // Optional, native snapping to help with alignment
        decelerationRate="fast"
        snapToAlignment="start"
      >
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          connectionProfiles.map((profile, index) => (
            <ConnectionsCard
              key={profile.id}
              setLoading={setNewConnection}
              loading={newConnection}
              profile={profile}
              isLast={profile.id === "fake"}
              setScroll={setScrollEnabled}
            />
          ))
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

export default Connections
