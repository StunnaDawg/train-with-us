import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import CommunitiesScroll from "./components/CommunitiesScroll"
import Tabs from "./components/Tabs"
import Unread from "./components/Unread"
import Messages from "./components/Messages"
import CommunitiesRead from "./components/CommunitiesRead"
import { useAuth } from "../../supabaseFunctions/authcontext"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { Communities, Profile } from "../../@types/supabaseTypes"
import getAllUsersCommunities from "../../supabaseFunctions/getFuncs/getUsersCommunities"

const CommunitiesDash = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [userMessages, setUserMessages] = useState<boolean>(true)
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

  useEffect(() => {
    console.log("communities fetched", communities)
  }, [communities])

  const changeToCommunity = () => {
    setUserMessages(false)
  }

  const changeToUserMessage = () => {
    setUserMessages(true)
  }
  return (
    <ScrollView>
      <View>
        <CommunitiesScroll communities={communities} />
        <View className="mt-5">
          <Tabs
            changeToCommunityTab={changeToCommunity}
            changeToMessagesTab={changeToUserMessage}
            userMessages={userMessages}
          />
        </View>
      </View>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : userMessages ? (
        <View>
          <Messages />
        </View>
      ) : (
        <View>
          <CommunitiesRead />
        </View>
      )}
    </ScrollView>
  )
}

export default CommunitiesDash
