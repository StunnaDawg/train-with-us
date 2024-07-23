import { View, Text, Pressable } from "react-native"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { Communities } from "../../../@types/supabaseTypes"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { FontAwesome6 } from "@expo/vector-icons"
import { useEffect, useState } from "react"

import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"
import getCommunityMembersUUIDs from "../../../supabaseFunctions/getFuncs/getCommunityMembersUUIDS"

type CommunityCardProps = {
  communityId: number | undefined | null

  userId: string | undefined
}

const CommunityEventCard = ({ communityId, userId }: CommunityCardProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [pressed, setPressed] = useState<boolean>(false)
  const [joined, setJoined] = useState<boolean>(false)
  const [community, setCommunity] = useState<Communities | null>(null)
  const [userUUIDS, setUserUUIDS] = useState<string[] | null>([])
  const navigation = useNavigation<NavigationType>()

  const handlePressIn = () => {
    setPressed(true)
  }
  const handlePressOut = () => {
    setPressed(false)
  }

  useEffect(() => {
    if (!communityId) return
    getSingleCommunity(setLoading, communityId, setCommunity)
  }, [communityId])

  useEffect(() => {
    if (userId && communityId) {
      getCommunityMembersUUIDs(setLoading, communityId, setUserUUIDS)
    }
  }, [userId])

  useEffect(() => {
    if (userUUIDS) {
      setJoined(userUUIDS.includes(userId!))
    }
  }, [userUUIDS])

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        if (!communityId) return
        navigation.navigate("ViewCommunitiesScreen", {
          communityId: communityId,
        })
      }}
      className={`${pressed ? "opacity-50" : null}`}
    >
      <View className="flex flex-row items-center">
        <View className="m-2">
          <SinglePicCommunity
            size={75}
            item={community?.community_profile_pic}
            avatarRadius={100}
            noAvatarRadius={100}
          />
        </View>

        <View className="flex-col flex-1">
          <Text className=" text-white font-bold text-lg">
            {community?.community_title}
          </Text>
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row ">
              <Text className=" text-white font-bold text-sm">
                {community?.member_count} Members
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
        </View>
      </View>
    </Pressable>
  )
}

export default CommunityEventCard
