import { View, Text } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import CommunitiesScroll from "./components/CommunitiesScroll"
import CommunitiesRead from "./components/CommunitiesRead"
import { useAuth } from "../../supabaseFunctions/authcontext"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { Communities, Profile } from "../../@types/supabaseTypes"
import getAllUsersCommunities from "../../supabaseFunctions/getFuncs/getUsersCommunities"
import { useFocusEffect } from "@react-navigation/native"
import { NavBar } from "../../../components"

const CommunitiesDash = () => {
  const [loading, setLoadingState] = useState<boolean>(false)
  const [communities, setCommunities] = useState<Communities[] | null>([])
  const { user } = useAuth()

  const fetchUserCommunities = useCallback(async () => {
    if (!user) return
    await getAllUsersCommunities(user?.id, setLoadingState, setCommunities)
  }, [user])

  useEffect(() => {
    fetchUserCommunities()
  }, [user, fetchUserCommunities])

  useFocusEffect(
    useCallback(() => {
      fetchUserCommunities()
      return () => {}
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
      />
      <View className="flex flex-row bg-primary-900">
        <View className="bg-primary-900">
          <CommunitiesScroll communities={communities} />
        </View>
        <View>
          {loading && !user ? (
            <View>
              <Text>Loading...</Text>
            </View>
          ) : (
            <View>
              <CommunitiesRead />
            </View>
          )}
        </View>
      </View>
    </>
  )
}

export default CommunitiesDash
