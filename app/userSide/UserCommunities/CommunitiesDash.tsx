import { View, Text, ScrollView } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import CommunitiesScroll from "./components/CommunitiesScroll"
import CommunitiesRead from "./components/CommunitiesRead"
import { useAuth } from "../../supabaseFunctions/authcontext"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { Communities, Profile } from "../../@types/supabaseTypes"
import getAllUsersCommunities from "../../supabaseFunctions/getFuncs/getUsersCommunities"
import { useFocusEffect } from "@react-navigation/native"

const CommunitiesDash = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [communities, setCommunities] = useState<Communities[] | null>([])
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
    <View className="bg-primary-900">
      <View>
        <CommunitiesScroll communities={communities} />
      </View>
      <View>
        {loading ? (
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
  )
}

export default CommunitiesDash
