import { View, Text } from "react-native"

import { Profile } from "../../../@types/supabaseTypes"
import SinglePicCommunity from "../../../components/SinglePicCommunity"

type UserProfilePicProps = {
  profile: Profile | null
}

const UserProfilePic = ({ profile }: UserProfilePicProps) => {
  return (
    <View className="flex flex-row justify-center mt-12">
      <View>
        <SinglePicCommunity
          size={150}
          item={profile?.profile_pic}
          avatarRadius={230}
          noAvatarRadius={230}
        />
        <View className="flex flex-row justify-center mt-4 items-center">
          <Text className="font-bold text-xl mx-2">{profile?.first_name}</Text>
        </View>
      </View>
    </View>
  )
}

export default UserProfilePic
