import { View, Text, ScrollView, Pressable, SafeAreaView } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { Communities, Events, Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import Ionicons from "@expo/vector-icons/Ionicons"
import { NavBar } from "../../../components"
import { TouchableOpacity } from "react-native-gesture-handler"
import SinglePicCommunity from "../../components/SinglePicCommunity"
import supabase from "../../../lib/supabase"
import getAllUsersCommunities from "../../supabaseFunctions/getFuncs/getUsersCommunities"
import getFriendCount from "../../utilFunctions/getFriendCount"
import getUsersEvents from "../../supabaseFunctions/getFuncs/getUsersEvents"
import formatTimestampShort from "../../utilFunctions/formatTimeStampShort"

type CommunityButtonProps = {
  backGroundColour: string
  communityName: string
  numberOfFriends: string
  numberOfMatches: string
  community: Communities | null
  communityId: number | null
  suggested: boolean
}

type EventProfileTabViewProps = {
  eventTitle: string
  eventDate: string
  profileGoingTag: string
  friendsGoing: string
  matchesGoing: string
  eventId: number
}

const CommunityButton = ({
  backGroundColour,
  communityName,
  numberOfFriends,
  numberOfMatches,
  community,
  communityId,
  suggested,
}: CommunityButtonProps) => {
  const navigation = useNavigation<NavigationType>()
  return (
    <TouchableOpacity
      onPress={() => {
        if (community && !suggested) {
          navigation.navigate("CommunityPage", {
            community: community,
          })
        } else if (communityId && suggested) {
          navigation.navigate("ViewCommunitiesScreen", {
            communityId: communityId,
          })
        }
      }}
      className={`${backGroundColour} border-transparent rounded-lg mb-1 p-3`}
    >
      <View className="flex flex-row">
        <View className="flex-[2]">
          <Text className="text-blue-200 text-xs font-bold">
            {communityName}
          </Text>
        </View>

        <View className="flex-1 items-center">
          <Text className="text-blue-200 text-xs font-bold">
            {numberOfFriends} Friends
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const getFriendsLength = async (userId: string): Promise<number> => {
  try {
    const { data: chatSessions, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .or(`user1.eq.${userId},user2.eq.${userId}`)

    if (error) throw error

    if (chatSessions.length <= 0) {
      return 0
    }

    return chatSessions.length
  } catch (error) {
    console.error("Error fetching chat session:", error)
    return 0
  }
}

const EventProfileTabView = ({
  eventTitle,
  eventDate,
  profileGoingTag,
  friendsGoing,
  matchesGoing,
  eventId,
}: EventProfileTabViewProps) => {
  const navigation = useNavigation<NavigationType>()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ViewEvent", {
          eventId: eventId,
        })
      }}
      className=" flex flex-1 rounded-lg bg-blue-700 mx-2 p-4 mb-4"
    >
      <View className="flex flex-row justify-between">
        <View>
          <Text className="text-blue-200 font-bold text-sm">{eventTitle}</Text>

          <Text className="text-white text-xs font-semibold">{eventDate}</Text>
        </View>
        <View className="items-center">
          <View className="border border-transparent rounded-md p-1 bg-orange-400 items-center">
            <Text className="text-orange-900 text-xs">{profileGoingTag}</Text>
          </View>
        </View>
      </View>

      <View className="flex flex-row justify-end mt-4">
        <View>
          <Text className="text-xs font-semibold text-slate-300">
            {friendsGoing} Friends
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const ProfileView = () => {
  const { user, userProfile } = useAuth()
  const [friendsList, setFriendsList] = useState<number>(0)
  const [communties, setCommunities] = useState<Communities[] | null>(null)
  const [events, setEvents] = useState<Events[] | null>(null)
  const [suggestedCommunities, setSuggestedCommunities] = useState<
    Communities[] | null
  >(null)
  const [communityFriendCounts, setCommunityFriendCounts] = useState<{
    [key: number]: number
  }>({})
  const [eventFriendCounts, setEventFriendCounts] = useState<{
    [key: number]: number
  }>({})
  const [loading, setLoading] = useState<boolean>(false)

  const fetchSuggestedCommunities = async () => {
    const { data: communities, error } = await supabase
      .rpc("get_compatible_communities", { user_id: user?.id })
      .range(0, 2)

    if (error) throw error

    setSuggestedCommunities(communities)
  }

  useEffect(() => {
    const loadFriendCounts = async () => {
      if (user?.id) {
        const counts: { [key: number]: number } = {}

        if (communties) {
          for (const community of communties) {
            counts[community.id] = await getFriendCount(community.id, user.id)
          }
        }

        if (suggestedCommunities) {
          for (const community of suggestedCommunities) {
            counts[community.id] = await getFriendCount(community.id, user.id)
          }
        }

        setCommunityFriendCounts(counts)
      }
    }
    loadFriendCounts()
  }, [communties, suggestedCommunities, user?.id])

  useEffect(() => {
    const loadEventFriendCounts = async () => {
      if (user?.id && events) {
        const counts: { [key: number]: number } = {}
        for (const event of events) {
          const { data, error } = await supabase.rpc("get_event_friend_count", {
            user_id: user.id,
            event_id: event.id,
          })
          if (error) throw error
          counts[event.id] = data || 0
        }

        setEventFriendCounts(counts)
      }
    }

    loadEventFriendCounts()
  }, [events, user?.id])

  useEffect(() => {
    const getUsersData = async () => {
      if (user?.id) {
        const listLength = await getFriendsLength(user.id)
        await getAllUsersCommunities(user.id, setLoading, setCommunities)
        await getUsersEvents(user.id, setEvents)

        setFriendsList(listLength)

        await fetchSuggestedCommunities()
      }
    }
    getUsersData()
  }, [user])

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <NavBar
        textColour="text-white"
        title="My Profile"
        showFriends={true}
        showSearchCommunities={false}
        searchUsers={false}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View className="border-b-0 rounded-xl border-r-2 mb-2">
            {/* Header */}
            <View>
              <View>
                <View className="items-center">
                  <View className="items-center">
                    <SinglePicCommunity
                      size={50}
                      avatarRadius={100}
                      noAvatarRadius={100}
                      item={userProfile?.profile_pic}
                    />
                    <Text className="text-white text-xl font-bold">
                      Blended Athletics
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Text className="text-blue-600">Primary Location</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Training partners box */}
          <View className="bg-primary-700 flex-1 pt-2 h-full pb-24">
            <View>
              <View className="bg-primary-300 flex rounded-lg m-6 ">
                <View className=" flex flex-row justify-between items-center p-4">
                  <View className="flex flex-row items-center">
                    <Ionicons name="people-outline" size={24} color="white" />
                    <Text className="text-white font-bold">
                      Training Partners
                    </Text>
                  </View>
                  <View>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="white"
                    />
                  </View>
                </View>

                <View className="flex flex-row">
                  <View className=" flex flex-1 rounded-lg bg-blue-700 mx-2 p-4 mb-4">
                    <Text className="text-blue-200 font-bold text-2xl">
                      {friendsList}
                    </Text>
                    <Text className="text-white font-semibold">Friends</Text>
                    <Text className="text-xs text-slate-300">
                      Your Training Network
                    </Text>
                  </View>

                  {/*<View className=" flex flex-1 rounded-lg bg-blue-700 mx-2 p-4 mb-4">
                    <Text className="text-blue-200 font-bold text-2xl">8</Text>
                    <Text className="text-white font-semibold">Matches</Text>
                    <Text className="text-xs text-slate-300">Over 80%</Text>
                  </View>*/}
                </View>
              </View>

              {/* Communties */}
              <View className="bg-primary-300 flex rounded-lg mx-6">
                <View className=" flex flex-row justify-between items-center px-4 py-3">
                  <View className="flex flex-row items-center">
                    <Ionicons name="people-outline" size={24} color="white" />
                    <Text className="text-white font-bold">Communities</Text>
                  </View>
                  <View>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="white"
                    />
                  </View>
                </View>

                <View className="flex">
                  <View className="flex flex-row items-center px-2">
                    <View className="border-slate-400 border rounded-lg px-3 mx-1">
                      <Text className="font-bold text-xl text-blue-200">
                        {communties?.length}
                      </Text>
                    </View>
                    <View className="mx-1">
                      <Text className="text-white font-bold">
                        Active Communities
                      </Text>
                    </View>
                  </View>
                  <View className=" flex flex-1 mx-2 px-4 py-2">
                    <View>
                      {communties?.map((community) => {
                        if (community.community_title) {
                          return (
                            <View key={community.id}>
                              <CommunityButton
                                suggested={false}
                                communityId={community.id}
                                community={community}
                                backGroundColour="bg-blue-700"
                                communityName={community.community_title}
                                numberOfFriends={
                                  communityFriendCounts[community.id]
                                    ? communityFriendCounts[
                                        community.id
                                      ].toString()
                                    : "0"
                                }
                                numberOfMatches="5"
                              />
                            </View>
                          )
                        }
                      })}
                    </View>
                  </View>

                  <View className="border-0 h-px my-1 bg-primary-700 mx-2" />

                  <View className="flex flex-row items-center mb-2 px-2 py-2">
                    <View className="mx-1">
                      <Text className="text-white font-bold">
                        Suggested Communties
                      </Text>
                    </View>
                  </View>
                  <View className=" flex flex-1 mx-2 px-4 mb-4">
                    <View>
                      {suggestedCommunities?.map((community) => {
                        if (community.community_title) {
                          return (
                            <View key={community.id}>
                              <CommunityButton
                                suggested={true}
                                community={community}
                                communityId={community.id}
                                backGroundColour="bg-primary-700"
                                communityName={community.community_title}
                                numberOfFriends={
                                  communityFriendCounts[community.id]
                                    ? communityFriendCounts[
                                        community.id
                                      ].toString()
                                    : "0"
                                }
                                numberOfMatches="5"
                              />
                            </View>
                          )
                        }
                      })}
                    </View>
                  </View>
                </View>

                {/* Events */}
              </View>

              <View className="bg-primary-300 flex flex-1 rounded-lg m-6">
                <View className=" flex flex-row justify-between items-center px-4 py-3">
                  <View className="flex flex-row items-center">
                    <Ionicons name="rocket-outline" size={24} color="white" />
                    <Text className="text-white font-bold">Events</Text>
                  </View>
                  <View>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="white"
                    />
                  </View>
                </View>
                <View className=" flex flex-1 mx-2 px-4 py-2">
                  <View>
                    {events?.map((event) => {
                      if (event.event_title) {
                        return (
                          <View key={event.id}>
                            <EventProfileTabView
                              eventId={event.id}
                              eventTitle={event.event_title}
                              eventDate={formatTimestampShort(event.date)}
                              profileGoingTag="Going"
                              friendsGoing={
                                eventFriendCounts[event.id]
                                  ? eventFriendCounts[event.id].toString()
                                  : "0"
                              }
                              matchesGoing="1"
                            />
                          </View>
                        )
                      }
                    })}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileView
