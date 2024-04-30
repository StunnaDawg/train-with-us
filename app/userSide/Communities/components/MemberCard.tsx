import { View, Text, Pressable, ActivityIndicator } from "react-native"
import React from "react"
import SinglePic from "../../../components/SinglePic"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { Profile } from "../../../@types/supabaseTypes"

type MemberCardProps = {
  member: Profile
}

const MemberCard = ({ member }: MemberCardProps) => {
  const navigation = useNavigation<NavigationType>()
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ViewUserProfile", {
          userProfile: member,
        })
      }
      className=" m-4"
    >
      <View>
        <Text className=" mx-4 font-semibold text-black text-xl">
          {member.first_name}
        </Text>
      </View>
    </Pressable>
  )
}

export default MemberCard
