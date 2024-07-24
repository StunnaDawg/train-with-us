import { View, Text, Pressable } from "react-native"

import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { Profile } from "../../../@types/supabaseTypes"
import SinglePicCommunity from "../../../components/SinglePicCommunity"

type MemberCardProps = {
  member: Profile
}

const AttendeeCard = ({ member }: MemberCardProps) => {
  const navigation = useNavigation<NavigationType>()
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ViewFullUserProfile", {
          user: member,
        })
      }
      className=" m-4"
    >
      <View className="flex flex-row items-center">
        <SinglePicCommunity
          item={member.profile_pic}
          size={50}
          avatarRadius={100}
          noAvatarRadius={100}
        />
        <Text className=" mx-4 font-semibold text-black text-lg">
          {member.last_name
            ? [member.first_name, member?.last_name].join(" ")
            : member.first_name}
        </Text>
      </View>
    </Pressable>
  )
}

export default AttendeeCard
