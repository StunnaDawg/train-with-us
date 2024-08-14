import { View, Text } from "react-native"
import { Communities } from "../../../@types/supabaseTypes"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { FontAwesome6 } from "@expo/vector-icons"

type CommunityCardProps = {
  community: Communities
}

const CommunityCardAboutMe = ({ community }: CommunityCardProps) => {
  return (
    <View className="flex flex-row items-center border-b border-b-slate-300 mx-2">
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
      </View>

      <View>
        <FontAwesome6 name="plus" size={16} color="white" />
      </View>
    </View>
  )
}

export default CommunityCardAboutMe
