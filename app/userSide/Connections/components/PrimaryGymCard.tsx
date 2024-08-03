import { View, Text, Pressable } from "react-native"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { Communities } from "../../../@types/supabaseTypes"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { FontAwesome6 } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import getCommunityMembersUUIDs from "../../../supabaseFunctions/getFuncs/getCommunityMembersUUIDS"

type CommunityCardProps = {
  community: Communities
  addPrimary?: boolean
  userId: string | undefined
}

const PrimaryGymCard = ({
  community,
  addPrimary,
  userId,
}: CommunityCardProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [joined, setJoined] = useState<boolean>(false)
  const [userUUIDS, setUserUUIDS] = useState<string[] | null>([])
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()

  const handlePressIn = () => {
    setIsPressed(true)
  }
  const handlePressOut = () => {
    setIsPressed(false)
  }

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
      onPress={() => {
        addPrimary
          ? null
          : navigation.navigate("ViewCommunitiesScreen", {
              communityId: community.id,
            })
      }}
      className={`${isPressed ? "opacity-50" : null} `}
    >
      <View className="flex flex-row items-center">
        <View className="m-2">
          <SinglePicCommunity
            size={50}
            item={community.community_profile_pic}
            avatarRadius={100}
            noAvatarRadius={100}
          />
        </View>

        <View className="flex-col flex-1">
          <Text className=" font-bold">{community.community_title}</Text>
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row ">
              <Text className=" font-bold text-xs">
                {community.member_count} Members
              </Text>
              <View className="mx-1">
                <FontAwesome6 name="people-group" size={16} color="white" />
              </View>
            </View>
            {joined ? (
              <View className=" w-16 border bg-blue-500 rounded-sm items-center">
                <Text className="font-bold text-white text-xs">Joined</Text>
              </View>
            ) : (
              <View className=" w-16 border bg-slate-200 rounded-sm items-center">
                <Text className="font-bold text-xs">Join</Text>
              </View>
            )}
          </View>

          <View className="border-b-2 border-b-white p-1" />
        </View>
      </View>
    </Pressable>
  )
}

export default PrimaryGymCard
