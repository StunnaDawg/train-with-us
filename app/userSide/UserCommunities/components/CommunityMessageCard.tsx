import { View, Text, Pressable } from "react-native"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { Communities } from "../../../@types/supabaseTypes"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { useEffect, useState } from "react"
import getCommunityMembersUUID from "../../../supabaseFunctions/getFuncs/getCommunityMembers"

type CommunityCardProps = {
  community: Communities
  addPrimary?: boolean
  userId: string | undefined
}

const CommunityMessageCard = ({
  community,
  addPrimary,
  userId,
}: CommunityCardProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [joined, setJoined] = useState<boolean>(false)
  const [userUUIDS, setUserUUIDS] = useState<string[] | null>([])
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    if (userId) {
      getCommunityMembersUUID(setLoading, community.id, setUserUUIDS)
    }
  }, [userId])

  useEffect(() => {
    if (userUUIDS) {
      setJoined(userUUIDS.includes(userId!))
    }
  }, [userUUIDS])

  return (
    <Pressable
      className=""
      onPress={() => {
        addPrimary
          ? null
          : navigation.navigate("ViewCommunitiesScreen", {
              communityId: community.id,
            })
      }}
    >
      <View className="flex border-4 rounded-lg items-center p-5">
        <SinglePicCommunity
          size={100}
          item={community.community_profile_pic}
          avatarRadius={50}
          noAvatarRadius={50}
        />

        <Text className="  font-bold text-sm">{community.community_title}</Text>
      </View>
    </Pressable>
  )
}

export default CommunityMessageCard