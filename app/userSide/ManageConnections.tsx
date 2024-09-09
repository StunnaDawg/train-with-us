import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native"
import React, { useEffect, useState } from "react"
import { useAuth } from "../supabaseFunctions/authcontext"
import { ChatSession, Profile } from "../@types/supabaseTypes"
import BackButton from "../components/BackButton"
import MemberCard from "./Communities/components/MemberCard"
import { FontAwesome6 } from "@expo/vector-icons"
import showAlertFunc from "../utilFunctions/showAlertFunc"
import supabase from "../../lib/supabase"
import getChatSession from "../supabaseFunctions/getFuncs/getChatSession"
import showAlert from "../utilFunctions/showAlert"

const ManageConnections = () => {
  const [userSearch, setUserSearch] = useState<string>("")
  const [pressedId, setPressedId] = useState<string | null>(null)
  const [profiles, setProfiles] = useState<Profile[] | null>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = useAuth()

  const handleOnPressIn = (id: string) => {
    setPressedId(id)
  }

  const handleOnPressOut = () => {
    setPressedId(null)
  }
  useEffect(() => {
    if (!user) return
    setLoading(true)
    getAllUserChatSessions(user.id)
    setLoading(false)
  }, [user])

  const getAllUserChatSessions = async (userId: string) => {
    const { data: chatSessions, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .or(`user1.eq.${userId},user2.eq.${userId}`)

    if (error) {
      console.error("Error fetching chat sessions:", error.message)
      return
    }

    const otherUserIds = chatSessions.map((session) =>
      session.user1 === userId ? session.user2 : session.user1
    )

    fetchProfilesFromChatSession(otherUserIds)
  }

  const fetchProfilesFromChatSession = async (otherUserIds: string[]) => {
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .in("id", otherUserIds)

    if (error) {
      console.error("Error fetching profiles:", error.message)
      return
    }

    setProfiles(profiles)
    console.log("Profiles:", profiles)
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  const removeConnectedUser = async (userId: string, user2Id: string) => {
    const userConnection = await getChatSession(userId, user2Id)

    if (!userConnection) {
      console.error("Failed to fetch user connection")
      return
    }

    const { error } = await supabase
      .from("chat_sessions")
      .delete()
      .eq("id", userConnection.id)

    if (error) {
      console.error("Failed to delete user connection:", error.message)
      showAlert({
        title: "Error",
        message: "Failed to delete user connection",
      })
      return
    } else {
      showAlert({
        title: "Success",
        message: "User connection has been deleted",
      })

      getAllUserChatSessions(userId)
    }
  }

  // useEffect(() => {
  //   if (userSearch === "") {
  //     setFilteredProfiles(profiles)
  //   } else {
  //     if (profiles && profiles.length > 0) {
  //       setFilteredProfiles(
  //         profiles.filter((profile) =>
  //           profile?.first_name
  //             ?.toLowerCase()
  //             .includes(userSearch.toLowerCase())
  //         )
  //       )
  //     } else {
  //       setFilteredProfiles([])
  //     }
  //   }
  // }, [userSearch, profiles])

  useEffect(() => {}, [profiles])
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-between items-center mx-1">
        <BackButton colour="black" size={24} />
        <View>
          <Text className="font-bold text-lg"> My Connections</Text>
        </View>
        <View />
      </View>
      <View className="flex flex-row items-center ">
        {/* <View className="flex-grow">
          <SearchBar
            value={userSearch}
            onChange={setUserSearch}
            placeholder="Search Connections"
          />
        </View> */}
      </View>

      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) : profiles && profiles.length > 0 ? (
          profiles.map((profile) => (
            <View
              key={profile.id}
              className="flex flex-row justify-between items-center"
            >
              <MemberCard member={profile} />
              <Pressable
                onPressIn={() => handleOnPressIn(profile.id)}
                onPressOut={handleOnPressOut}
                className={`mx-2 ${
                  pressedId === profile.id ? "opacity-50" : null
                } border-2 rounded-full px-5 py-2`}
                onPress={() => {
                  showAlertFunc({
                    title: "Confirm Delete",
                    message: `Are you sure you want to remove ${profile.first_name} from your connections?`,
                    buttons: [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        onPress: () => {
                          if (!user || !profiles) return
                          removeConnectedUser(user.id, profile.id)
                        },
                        style: "destructive",
                      },
                    ],
                  })
                }}
              >
                <FontAwesome6 name="trash" size={16} color="black" />
              </Pressable>
            </View>
          ))
        ) : (
          <Text>No connections found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ManageConnections
