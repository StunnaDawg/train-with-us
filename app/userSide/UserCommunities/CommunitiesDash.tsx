import { View, Text, Modal } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import CommunitiesScroll from "./components/CommunitiesScroll"
import CommunitiesRead from "./components/CommunitiesRead"
import { useAuth } from "../../supabaseFunctions/authcontext"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { Communities, Profile } from "../../@types/supabaseTypes"
import getAllUsersCommunities from "../../supabaseFunctions/getFuncs/getUsersCommunities"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import Loading from "../../components/Loading"
import { NavBar } from "../../../components"
import LoadingModal from "../../components/LoadingModal"
import { NavigationType } from "../../@types/navigation"

const CommunitiesDash = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [communities, setCommunities] = useState<Communities[] | null>([])
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

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
      <>
        <View className="flex flex-row bg-primary-900">
          <View className="bg-primary-900">
            <CommunitiesScroll communities={communities} />
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
    </>
  )
}

export default CommunitiesDash
