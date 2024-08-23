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
import RequestCard from "./RequestedConnectionCard"
import { useLoading } from "../../../context/LoadingContext"

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
  const { isLoading, setLoading } = useLoading()
  const navigation = useNavigation<NavigationType>()
  const [activeTab, setActiveTab] = useState<string>("Recent")
  const [modalVisible, setModalVisible] = useState(false)
  const [searchText, setSearchText] = useState<string>("")
  const { user } = useAuth()
  const [isPressed, setIsPressed] = useState<{
    [key: string]: boolean
  }>({})

  const handlePressIn = (key: string) => {
    setIsPressed((prev) => ({ ...prev, [key]: true }))
  }

  const handlePressOut = (key: string) => {
    setIsPressed((prev) => ({ ...prev, [key]: false }))
  }

  const handleSearch = (text: string) => {
    setActiveTab("")
    setSearchText(text)
  }

  const getUserMessages = async () => {
    if (user && activeTab === "Recent") {
      console.log("Recent")
      getAllUserChatSessions(user!.id, setChatSessions)
    }

    if (user && activeTab === "Requests") {
      try {
        const { data: requestData, error } = await supabase
          .from("connection_requests")
          .select("*")
          .eq("requested", user.id)

        if (error) throw error
        if (!requestData || requestData.length === 0) {
          setConnectionRequest(null)
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

    if (user && activeTab === "Sent Requests") {
      try {
        const { data: requestData, error } = await supabase
          .from("connection_requests")
          .select("*")
          .eq("requester", user.id)

        if (error) throw error
        if (!requestData || requestData.length === 0) {
          setConnectionRequest(null)
        }
        const requestArray: ConnectionRequest[] = requestData

        setConnectionRequest(requestArray)
      } catch (error) {
        console.error("Error fetching chat session:", error)
      } finally {
      }
    }
  }
  useFocusEffect(
    useCallback(() => {
      getUserMessages()

      return () => {
        // Optional cleanup actions
      }
    }, [user, setChatSessions])
  )

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    getUserMessages()
  }, [activeTab])

  const handlePressTab = (tabName: string) => {
    setSearchText("")
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

        <View className="flex flex-row justify-center items-center">
          {["Recent", "Requests", "All", "Sent Requests"].map((tab) => (
            <TabButton
              key={tab}
              title={tab}
              onPress={() => handlePressTab(tab)}
              active={activeTab === tab}
            />
          ))}
        </View>

        {/* <View className="flex-grow">
          <SearchBar
            value={searchText}
            onChange={(text) => handleSearch(text)}
            placeholder="Search Messages"
          />
        </View> */}

        <ScrollView className="h-full">
          {activeTab === "Recent" || activeTab === "All" ? (
            chatSessions?.length ? (
              chatSessions.map((session, index) => {
                const otherUserId =
                  session.user1 === user?.id ? session.user2 : session.user1
                return (
                  <View
                    className={` ${
                      isPressed[session.id] ? "opacity-50" : null
                    } flex-1  border-b-2 mx-2 p-1`}
                    key={session.id}
                  >
                    <Pressable
                      onPressIn={() => handlePressIn(session.id)}
                      onPressOut={() => handlePressOut(session.id)}
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
            ) : (
              <View className="flex-1 flex flex-row justify-center items-center m-2">
                <Text className="text-center font-semibold text-white">
                  You have no Messages!
                </Text>
              </View>
            )
          ) : activeTab === "Requests" || activeTab === "Sent Requests" ? (
            connectionRequest?.length ? (
              connectionRequest.map((request, index) => (
                <View
                  className={` ${
                    isPressed[request.requested + index] ? "opacity-50" : null
                  } flex-1 w-full`}
                  key={request.requested + index}
                >
                  <Pressable
                    onPressIn={() => handlePressIn(request.requested + index)}
                    onPressOut={() => handlePressOut(request.requested + index)}
                    onPress={() => setModalVisible(true)}
                  >
                    <RequestCard
                      isRequester={activeTab === "Sent Requests"}
                      otherUserId={
                        activeTab === "Requests"
                          ? request.requester
                          : request.requested
                      }
                      recentMessage={request.message}
                      updatedAt={request.request_sent}
                      setModalVisible={setModalVisible}
                      modalVisible={modalVisible}
                      onPress={getUserMessages}
                    />
                  </Pressable>
                </View>
              ))
            ) : (
              <View className="flex-1 flex flex-row justify-center items-center m-2">
                <Text className="text-center font-semibold text-white">
                  You have no Message Requests!
                </Text>
              </View>
            )
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Messages
