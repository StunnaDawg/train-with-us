import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
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
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row justify-between items-center px-4 py-2 border-b border-gray-200">
        <BackButton colour="black" size={24} />
        <Text className="font-bold text-xl">My Connections</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView className="flex-1">
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-8" />
        ) : profiles && profiles.length > 0 ? (
          profiles.map((profile) => (
            <View
              key={profile.id}
              className="flex flex-row justify-between items-center px-4 py-3 border-b border-gray-100"
            >
              <MemberCard member={profile} />
              <TouchableOpacity
                onPressIn={() => handleOnPressIn(profile.id)}
                onPressOut={handleOnPressOut}
                className={`${
                  pressedId === profile.id ? "bg-red-100" : "bg-gray-100"
                } rounded-full p-3`}
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
                <FontAwesome6
                  name="trash"
                  size={16}
                  color={pressedId === profile.id ? "red" : "gray"}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text className="text-center text-gray-500 mt-8">
            No connections found
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ManageConnections
