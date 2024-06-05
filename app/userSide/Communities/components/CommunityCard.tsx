import { View, Text, Pressable } from "react-native"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { Communities } from "../../../@types/supabaseTypes"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { FontAwesome6 } from "@expo/vector-icons"

type CommunityCardProps = {
  community: Communities
  addPrimary?: boolean
}

const CommunityCard = ({ community, addPrimary }: CommunityCardProps) => {
  const navigation = useNavigation<NavigationType>()

  return (
    <Pressable
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
            size={90}
            item={community.community_profile_pic}
            avatarRadius={100}
            noAvatarRadius={100}
          />
        </View>

        <View className="flex-col flex-1">
          <Text className=" text-white font-bold text-2xl">
            {community.community_title}
          </Text>
          <View className="flex flex-row items-center">
            <Text className=" text-white font-bold text-xl">
              {community.member_count} Members
            </Text>
            <View className="mx-1">
              <FontAwesome6 name="people-group" size={24} color="white" />
            </View>
          </View>
          <View className="border-b-2 border-b-white p-3" />
        </View>
      </View>
    </Pressable>
  )
}

export default CommunityCard
