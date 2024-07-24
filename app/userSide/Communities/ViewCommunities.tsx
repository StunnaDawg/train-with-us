import { View, SafeAreaView, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import ViewCommunityTitle from "./components/ViewCommunityTitle"

import PhotoArray from "./components/PhotosArray"
import CommunityAbout from "./components/CommunityAbout"
import UpcomingCommunityEvents from "./components/UpcomingEvents"
import { Communities, Profile } from "../../@types/supabaseTypes"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"
import { RootStackParamList } from "../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import JoinFooter from "./components/JoinFooter"
import { useAuth } from "../../supabaseFunctions/authcontext"
import ViewCommuntiesSkeleton from "./components/ViewCommuntiesSkeleton"
import ViewJoinedCommunityFooter from "./components/ViewJoinedCommunity"
import getCommunityMembersUUIDs from "../../supabaseFunctions/getFuncs/getCommunityMembersUUIDS"

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

  return (
    <SafeAreaView className=" flex-1 bg-primary-900 ">
      {loading ? (
        <View className="my-2">
          <ViewCommuntiesSkeleton />
        </View>
      ) : (
        <>
          <View>
            <ViewCommunityTitle
              community={community}
              communityId={communityId}
              userId={user?.id}
            />
          </View>
          <ScrollView>
            <View className="my-2">
              {community ? <PhotoArray community={community} /> : null}
            </View>

            <View>
              <CommunityAbout community={community} />
            </View>

            <View>
              <UpcomingCommunityEvents community={community} />
            </View>
          </ScrollView>
          {!joined && community ? (
            <JoinFooter
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
