import { View, Text, Pressable, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { Profile } from "../../../@types/supabaseTypes"
import supabase from "../../../../lib/supabase"

type MemberCardProps = {
  member: Profile
}

const MemberCard = ({ member }: MemberCardProps) => {
  const [role, setRole] = useState<string>("")
  const navigation = useNavigation<NavigationType>()

  const getMemberRole = async () => {
    const { data, error } = await supabase
      .from("community_members")
      .select("role")
      .eq("user_id", member.id)
      .single()

    if (error) throw error

    if (data) {
      setRole(data.role)
    }
  }

  useEffect(() => {
    getMemberRole()
  }, [member])
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ViewUserProfile", {
          userProfile: member,
        })
      }
      className=" m-4"
    >
      <View className="flex flex-row items-center">
        <SinglePic
          item={member.profile_pic}
          size={50}
          avatarRadius={100}
          noAvatarRadius={100}
        />
        <Text className=" mx-4 font-semibold text-black text-xl">
          {member.last_name
            ? [member.first_name, member?.last_name].join(" ")
            : member.first_name}
          <Text className="text-lg">{role ? ` - ${role}` : ""}</Text>
        </Text>
      </View>
    </Pressable>
  )
}

export default MemberCard
