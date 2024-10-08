import { View, Text, Pressable, ScrollView } from "react-native"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import {
  Communities,
  CommunityWithCompatibility,
} from "../../../@types/supabaseTypes"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { FontAwesome6 } from "@expo/vector-icons"
import { useEffect, useState } from "react"

import getCommunityMembersUUIDs from "../../../supabaseFunctions/getFuncs/getCommunityMembersUUIDS"
import supabase from "../../../../lib/supabase"
import ActivityTags from "../../../components/AcvitivityTags"

type CommunityCardProps = {
  community: CommunityWithCompatibility
  addPrimary?: boolean
  userId: string | undefined
}

const CommunityCard = ({
  community,
  addPrimary,
  userId,
}: CommunityCardProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [joined, setJoined] = useState<boolean>(false)
  const [userUUIDS, setUserUUIDS] = useState<string[] | null>([])
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const [memberCount, setMemberCount] = useState<number>(0)
  const navigation = useNavigation<NavigationType>()

  const handlePressIn = () => {
    setIsPressed(true)
  }
  const handlePressOut = () => {
    setIsPressed(false)
  }

  const compatibility = (communityProp: CommunityWithCompatibility) => {
    const compatibilityScore = Math.round(communityProp.compatibility_score)
    console.log(
      "Compatibility score",
      communityProp.community_title,
      compatibilityScore
    )

    const CompatibilityBar = ({
      filled,
      color,
    }: {
      filled: boolean
      color: string
    }) => (
      <View className={`w-1 h-3 mx-0.5 ${filled ? color : "bg-gray-300"}`} />
    )

    let text: string
    let bars: JSX.Element[]

    if (compatibilityScore >= 90) {
      text = "High"
      bars = [
        <CompatibilityBar key={1} filled={true} color="bg-green-500" />,
        <CompatibilityBar key={2} filled={true} color="bg-green-500" />,
        <CompatibilityBar key={3} filled={true} color="bg-green-500" />,
      ]
    } else if (compatibilityScore >= 50) {
      text = "Medium"
      bars = [
        <CompatibilityBar key={1} filled={true} color="bg-yellow-500" />,
        <CompatibilityBar key={2} filled={true} color="bg-yellow-500" />,
        <CompatibilityBar key={3} filled={false} color="bg-yellow-500" />,
      ]
    } else {
      text = "Low"
      bars = [
        <CompatibilityBar key={1} filled={true} color="bg-red-500" />,
        <CompatibilityBar key={2} filled={false} color="bg-red-500" />,
        <CompatibilityBar key={3} filled={false} color="bg-red-500" />,
      ]
    }

    return (
      <View className="flex flex-row items-center">
        <Text className="text-white mr-2">Compatibility: {text}</Text>
        <View className="flex flex-row">{bars}</View>
      </View>
    )
  }

  useEffect(() => {
    const fetchMemberCount = async () => {
      const { data, error } = await supabase
        .from("community_members")
        .select("*")
        .eq("community_id", community.id)

      if (error) {
        console.log(error)
        return
      }
      setMemberCount(data.length)
    }

    fetchMemberCount()

    console.log("Community profile pic", community.community_profile_pic)
  }, [community])

  useEffect(() => {
    if (userId) {
      getCommunityMembersUUIDs(setLoading, community.id, setUserUUIDS)
    }
  }, [userId])

  useEffect(() => {
    if (community.community_owner === userId) {
      setJoined(true)
    }

    console.log(community.id, userUUIDS)
    if (userUUIDS?.includes(userId!)) {
      setJoined(true)
    }
  }, [userUUIDS])

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={`${isPressed ? " opacity-10" : null} m-2 p-2 rounded-md`}
      onPress={() => {
        addPrimary
          ? null
          : navigation.navigate("ViewCommunitiesScreen", {
              communityId: community.id,
            })
      }}
    >
      <View className="flex flex-row items-center">
        <View className="m-2">
          <SinglePicCommunity
            size={75}
            item={community.community_profile_pic}
            avatarRadius={100}
            noAvatarRadius={100}
            allowExpand={false}
            allowCacheImage={false}
          />
        </View>

        <View className="flex-col flex-1">
          <Text className=" text-white font-bold text-lg">
            {community.community_title}
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            className="mt-1"
          >
            {community.community_tags && community.community_tags.length > 0
              ? community.community_tags.map((tag) => (
                  <View key={tag} className="mb-1">
                    <ActivityTags activity={`${tag}`} />
                  </View>
                ))
              : null}
          </ScrollView>
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row ">
              <Text className=" text-white font-bold text-sm">
                {memberCount} Members
              </Text>
              <View className="mx-1">
                <FontAwesome6 name="people-group" size={16} color="white" />
              </View>
            </View>
            {joined ? (
              <View className=" w-16 border bg-blue-500 rounded-sm items-center">
                <Text className="text-white font-bold text-sm">Joined</Text>
              </View>
            ) : (
              <View className=" w-16 border bg-slate-200 rounded-sm items-center">
                <Text className="font-bold text-sm">Join</Text>
              </View>
            )}
          </View>

          <View className="border-b-2 border-b-white p-1" />

          {compatibility(community)}
        </View>
      </View>
    </Pressable>
  )
}

export default CommunityCard
