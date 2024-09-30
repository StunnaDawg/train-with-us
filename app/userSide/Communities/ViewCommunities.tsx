import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
} from "react-native"
import React, { useEffect, useState } from "react"
import ViewCommunityTitle from "./components/ViewCommunityTitle"

import PhotoArray from "./components/PhotosArray"
import CommunityAbout from "./components/CommunityAbout"
import UpcomingCommunityEvents from "./components/UpcomingEvents"
import { Communities } from "../../@types/supabaseTypes"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"
import { RootStackParamList } from "../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import JoinFooter from "./components/JoinFooter"
import { useAuth } from "../../supabaseFunctions/authcontext"
import ViewCommuntiesSkeleton from "./components/ViewCommuntiesSkeleton"
import ViewJoinedCommunityFooter from "./components/ViewJoinedCommunity"
import getCommunityMembersUUIDs from "../../supabaseFunctions/getFuncs/getCommunityMembersUUIDS"
import CommunityScheduleDisplay from "../../components/CommunityScheduleDisplay"

const ViewCommunities = () => {
  const { user } = useAuth()
  const [joined, setJoined] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const [community, setCommunities] = useState<Communities | null>(null)
  const [profiles, setProfiles] = useState<string[] | null>(null)

  const route =
    useRoute<RouteProp<RootStackParamList, "ViewCommunitiesScreen">>()
  const communityId = route.params.communityId

  useEffect(() => {
    getSingleCommunity(setLoading, communityId, setCommunities)

    getCommunityMembersUUIDs(setLoading, communityId, setProfiles)
  }, [communityId])

  useEffect(() => {
    console.log(profiles)
    if (community?.community_owner === user?.id) {
      setJoined(true)
    }
    if (profiles?.includes(user?.id!)) {
      setJoined(true)
    }
  }, [profiles])

  const [activeSection, setActiveSection] = useState<string>("about")

  const renderSection = () => {
    switch (activeSection) {
      case "about":
        return <CommunityAbout community={community} />
      case "photos":
        return community ? <PhotoArray community={community} /> : null
      case "schedule":
        return community && community.classes ? (
          <CommunityScheduleDisplay communityId={community?.id} />
        ) : null
      case "events":
        return <UpcomingCommunityEvents community={community} />
      default:
        return null
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      {loading ? (
        <ViewCommuntiesSkeleton />
      ) : (
        <>
          <ViewCommunityTitle
            community={community}
            communityId={communityId}
            userId={user?.id}
          />
          <View className="flex-1">
            <View className="flex-row justify-around my-2">
              <TouchableOpacity onPress={() => setActiveSection("about")}>
                <Text
                  className={`text-xl font-semibold text-white ${
                    activeSection === "about" ? "underline" : ""
                  }`}
                >
                  About
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveSection("photos")}>
                <Text
                  className={`text-xl font-semibold text-white ${
                    activeSection === "photos" ? "underline" : ""
                  }`}
                >
                  Photos
                </Text>
              </TouchableOpacity>

              {community?.classes ? (
                <TouchableOpacity onPress={() => setActiveSection("schedule")}>
                  <Text
                    className={`text-xl font-semibold text-white ${
                      activeSection === "schedule" ? "underline" : ""
                    }`}
                  >
                    Schedule
                  </Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity onPress={() => setActiveSection("events")}>
                <Text
                  className={`text-xl font-semibold text-white ${
                    activeSection === "events" ? "underline" : ""
                  }`}
                >
                  Events
                </Text>
              </TouchableOpacity>
            </View>
            {renderSection()}
          </View>
          {!joined && community ? (
            <JoinFooter
              communityOwner={community.community_owner}
              setJoinedState={setJoined}
              publicCommunity={community.public_community}
              communityId={communityId}
              communityTitle={community?.community_title}
            />
          ) : (
            <ViewJoinedCommunityFooter community={community} />
          )}
        </>
      )}
    </SafeAreaView>
  )
}

export default ViewCommunities
