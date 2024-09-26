import { View, Text } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import CommunitiesScroll from "./components/CommunitiesScroll"

import { useAuth } from "../../supabaseFunctions/authcontext"
import { Communities } from "../../@types/supabaseTypes"
import getAllUsersCommunities from "../../supabaseFunctions/getFuncs/getUsersCommunities"
import { useFocusEffect } from "@react-navigation/native"
import { NavBar } from "../../../components"
import CommunitiesDashSkeleton from "./CommunitiesDashSkeleton"
import PinnedChannels from "./components/PinnedChannels"

const CommunitiesDash = () => {
  const [loading, setLoadingState] = useState<boolean>(true)
  const [communities, setCommunities] = useState<Communities[] | null>([])
  const { user } = useAuth()

  const fetchUserCommunities = useCallback(async () => {
    if (!user) return
    await getAllUsersCommunities(user?.id, setLoadingState, setCommunities)
  }, [user])

  useFocusEffect(
    useCallback(() => {
      setLoadingState(true)
      fetchUserCommunities()
      return () => {
        setLoadingState(false)
      }
    }, [fetchUserCommunities])
  )

  return (
    <>
      <NavBar
        title="Communities"
        bgColour="bg-primary-900"
        textColour="text-white"
        showFriends={false}
        showSettings={false}
        showSearchCommunities={false}
        searchUsers={false}
      />
      {loading ? (
        <View>
          <CommunitiesDashSkeleton />
        </View>
      ) : (
        <View className=" bg-primary-900">
          <View className="bg-primary-900">
            <CommunitiesScroll communities={communities} />
          </View>
          <View className="bg-primary-900">
            <View>
              <PinnedChannels />
            </View>
          </View>
        </View>
      )}
    </>
  )
}

export default CommunitiesDash
