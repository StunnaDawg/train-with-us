import { View, Text, Pressable } from "react-native"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { Communities } from "../../../@types/supabaseTypes"
import SinglePicCommunity from "../../../components/SinglePicCommunity"

type CommunityCardProps = {
  community: Communities
}

const CommunityMessageCard = ({ community }: CommunityCardProps) => {
  const navigation = useNavigation<NavigationType>()

  return (
    <Pressable
      className=""
      onPress={() => {
        navigation.navigate("ViewCommunitiesScreen", {
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
