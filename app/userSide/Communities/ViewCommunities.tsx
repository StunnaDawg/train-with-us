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
import getCommunityMembersUUID from "../../supabaseFunctions/getFuncs/getCommunityMembers"
import { MotiView } from "moti"
import { Skeleton } from "moti/skeleton"
import Spacer from "../../components/Spacer"

const ViewCommunities = () => {
  const { user } = useAuth()
  const [joined, setJoined] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [community, setCommunities] = useState<Communities | null>(null)
  const [profiles, setProfiles] = useState<string[] | null>(null)

  const route =
    useRoute<RouteProp<RootStackParamList, "ViewCommunitiesScreen">>()
  const communityId = route.params.communityId
  const colorMode = "dark"

  useEffect(() => {
    getSingleCommunity(setLoading, communityId, setCommunities)

    getCommunityMembersUUID(setLoading, communityId, setProfiles)
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
          <MotiView
            transition={{
              type: "timing",
            }}
            className="items-center mx-3 flex flex-row justify-center"
            animate={{ backgroundColor: "#07182d" }}
          >
            <View className="items-center">
              <Skeleton colorMode={colorMode} height={65} width={"100%"} />
              <Spacer height={8} />
              <View className="flex flex-row">
                <View className="mx-2">
                  <Skeleton
                    colorMode={colorMode}
                    radius="square"
                    height={150}
                    width={150}
                  />
                </View>
                <View className="mx-1">
                  <Skeleton
                    colorMode={colorMode}
                    radius="square"
                    height={150}
                    width={150}
                  />
                </View>
                <View className="mx-2">
                  <Skeleton
                    colorMode={colorMode}
                    radius="square"
                    height={150}
                    width={150}
                  />
                </View>
              </View>
              <Spacer />
              <Skeleton colorMode={colorMode} height={65} width={"100%"} />
              <Spacer height={32} />
              <View className="flex flex-row">
                <View className="mx-2">
                  <Skeleton
                    colorMode={colorMode}
                    radius="square"
                    height={150}
                    width={150}
                  />
                </View>
                <View className="mx-1">
                  <Skeleton
                    colorMode={colorMode}
                    radius="square"
                    height={150}
                    width={150}
                  />
                </View>
                <View className="mx-2">
                  <Skeleton
                    colorMode={colorMode}
                    radius="square"
                    height={150}
                    width={150}
                  />
                </View>
              </View>
            </View>
          </MotiView>
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
          {!joined ? (
            <JoinFooter
              communityId={communityId}
              communityTitle={community?.community_title}
            />
          ) : null}
        </>
      )}
    </SafeAreaView>
  )
}

export default ViewCommunities
