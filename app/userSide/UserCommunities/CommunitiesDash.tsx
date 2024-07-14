import { View, Text } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import CommunitiesScroll from "./components/CommunitiesScroll"
import CommunitiesRead from "./components/CommunitiesRead"
import { useAuth } from "../../supabaseFunctions/authcontext"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { Communities, Profile } from "../../@types/supabaseTypes"
import getAllUsersCommunities from "../../supabaseFunctions/getFuncs/getUsersCommunities"
import { useFocusEffect } from "@react-navigation/native"
import Loading from "../../components/Loading"
import { NavBar } from "../../../components"
import CommunityPage from "./CommunityPage"
import CommunityChannels from "./components/CommunityChannels"

const CommunitiesDash = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [navigating, setNavigating] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [communities, setCommunities] = useState<Communities[] | null>([])
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(
    null
  )
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (!user) return
    getAllUsersCommunities(user?.id, setLoading, setCommunities)
  }, [currentUser])

  useFocusEffect(
    useCallback(() => {
      setNavigating(false)
      const getUserCommutiy = async () => {
        setLoading(true)
        if (!user) return
        getAllUsersCommunities(user?.id, setLoading, setCommunities)
        setLoading(false)
      }

      getUserCommutiy()

      return () => {}
    }, [user, setCurrentUser])
  )
  return (
    <>
      <NavBar
        title="Communities"
        bgColour="bg-primary-900"
        textColour="text-white"
        iconColour="white"
        showFriends={false}
        showSettings={false}
        showSearchCommunities={false}
      />
      {navigating ? (
        <Loading />
      ) : (
        <>
          <View className="flex flex-row bg-primary-900">
            <View className="bg-primary-900">
              <CommunitiesScroll
                communities={communities}
                setNavigating={setNavigating}
              />
            </View>
            <View>
              {loading && !currentUser ? (
                <View>
                  <Text>Loading...</Text>
                </View>
              ) : (
                <View>
                  <CommunitiesRead user={currentUser} />
                </View>
              )}
            </View>
          </View>
        </>
      )}
    </>
  )
}

export default CommunitiesDash
