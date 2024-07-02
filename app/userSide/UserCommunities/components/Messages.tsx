import {
  View,
  Text,
  Pressable,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import getAllUserChatSessions from "../../../supabaseFunctions/getFuncs/getAllUserChatSessions"
import {
  ChatSession,
  ConnectionRequest,
  Profile,
} from "../../../@types/supabaseTypes"
import { NavigationType } from "../../../@types/navigation"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import MessageCard from "./MessageCard"
import BackButton from "../../../components/BackButton"
import supabase from "../../../../lib/supabase"
import { se } from "date-fns/locale"
import RequestCard from "./RequestedConnectionCard"

type TabButtonProps = {
  title: string
  onPress: () => void
  active: boolean
}

const TabButton = ({ title, onPress, active }: TabButtonProps) => {
  return (
    <Pressable
      className={`bg-white w-18 rounded-md items-center mx-1 p-1 ${
        active ? "bg-slate-500" : ""
      }`}
      onPress={onPress}
    >
      <Text className={`font-bold text-black`}>{title}</Text>
    </Pressable>
  )
}

const Messages = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[] | null>([])
  const [connectionRequest, setConnectionRequest] = useState<
    ConnectionRequest[] | null
  >([])
  const navigation = useNavigation<NavigationType>()
  const [activeTab, setActiveTab] = useState<string>("Recent")
  const [modalVisible, setModalVisible] = useState(false)
  const { user } = useAuth()

  const getUserCommutiy = async () => {
    if (user && activeTab === "Recent") {
      console.log("Recent")
      getAllUserChatSessions(user!.id, setChatSessions)
    }

    if (user && activeTab === "UnRead") {
      try {
        const { data: chatSessions, error } = await supabase
          .from("chat_sessions")
          .select("*")
          .or(`user1.eq.${user.id},user2.eq.${user.id}`)
          .order("updated_at", { ascending: false })
          .eq("user1_read", false)

        if (error) throw error
        if (!chatSessions || chatSessions.length === 0) {
          throw new Error("No chat session found")
        }
        const chatSession: ChatSession[] = chatSessions

        if (!chatSession) {
          setChatSessions(null)
          throw new Error("No chat session found")
        }
        setChatSessions(chatSession)
      } catch (error) {
        console.error("Error fetching chat session:", error)
        return null // Consider returning null or appropriate error handling
      }
    }

    if (user && activeTab === "Read") {
      try {
        const { data: chatSessions, error } = await supabase
          .from("chat_sessions")
          .select("*")
          .or(`user1.eq.${user.id},user2.eq.${user.id}`)
          .order("updated_at", { ascending: false })
          .eq("user1_read", true)

        if (error) throw error
        if (!chatSessions || chatSessions.length === 0) {
          throw new Error("No chat session found")
        }
        const chatSession: ChatSession[] = chatSessions

        if (!chatSession) {
          setChatSessions(null)
          throw new Error("No chat session found")
        }
        setChatSessions(chatSession)
      } catch (error) {
        console.error("Error fetching chat session:", error)
        return null // Consider returning null or appropriate error handling
      }
    }

    if (user && activeTab === "Requested") {
      try {
        const { data: requestData, error } = await supabase
          .from("connection_requests")
          .select("*")
          .eq("requested", user.id)

        if (error) throw error
        if (!requestData || requestData.length === 0) {
          setConnectionRequest(null)
          throw new Error("No chat session found")
        }
        const requestArray: ConnectionRequest[] = requestData

        setConnectionRequest(requestArray)
      } catch (error) {
        console.error("Error fetching chat session:", error)
      } finally {
      }
    }

    if (user && activeTab === "All") {
      getAllUserChatSessions(user!.id, setChatSessions)
    }
  }
  useFocusEffect(
    useCallback(() => {
      getUserCommutiy()

      return () => {
        // Optional cleanup actions
      }
    }, [user, setChatSessions])
  )

  useEffect(() => {
    getUserCommutiy()
  }, [activeTab])

  const handlePressTab = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <SafeAreaView className="bg-primary-900 flex-1">
      <View>
        <View className=" m-2 flex flex-row justify-between">
          <BackButton colour="white" />
          <Text className="font-bold text-lg text-white">My Messages</Text>
          <View />
        </View>

        <View className="flex flex-row items-center">
          {["Recent", "UnRead", "Read", "Requested", "Sent", "All"].map(
            (tab) => (
              <TabButton
                key={tab}
                title={tab}
                onPress={() => handlePressTab(tab)}
                active={activeTab === tab}
              />
            )
          )}
        </View>

        <ScrollView className="h-full">
          {activeTab !== "Requested"
            ? chatSessions?.map((session, index) => {
                const otherUserId =
                  session.user1 === user?.id ? session.user2 : session.user1
                return (
                  <View className="flex-1 w-full" key={session.id}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate("MessagingScreen", {
                          chatSession: session,
                        })
                      }
                    >
                      <MessageCard
                        otherUserId={otherUserId}
                        recentMessage={session.recent_message}
                        updatedAt={session.updated_at}
                      />
                    </Pressable>
                  </View>
                )
              })
            : connectionRequest?.map((request, index) => (
                <>
                  <View className="flex-1 w-full" key={request.requested}>
                    <Pressable
                      onPress={() => {
                        setModalVisible(true)
                      }}
                    >
                      <RequestCard
                        otherUserId={request.requested} // Make sure 'requested' is the correct property
                        recentMessage={request.message} // Ensure these properties exist on 'request'
                        updatedAt={request.request_sent}
                        setModalVisible={setModalVisible}
                        modalVisible={modalVisible}
                      />
                    </Pressable>
                  </View>
                </>
              ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Messages
