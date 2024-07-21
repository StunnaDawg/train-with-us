import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { Profile } from "../../../@types/supabaseTypes"
import supabase from "../../../../lib/supabase"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { FlatList } from "react-native-gesture-handler"

const CommunityMemberCard = ({
  member,
}: {
  member: Profile & { role?: string }
}) => {
  const navigation = useNavigation<NavigationType>()
  return (
    <Pressable
      key={member.id}
      onPress={() =>
        navigation.navigate("ViewUserProfile", {
          userProfile: member,
        })
      }
      className="m-4"
    >
      <View className="flex flex-row items-center">
        {/* <SinglePicCommunity
          item={member.profile_pic}
          size={50}
          avatarRadius={100}
          noAvatarRadius={100}
        /> */}
        <Text className="mx-4 font-semibold text-white text-lg">
          {member.last_name
            ? [member.first_name, member?.last_name].join(" ")
            : member.first_name}
          <Text className="text-lg">
            {member.role ? ` - ${member.role}` : ""}
          </Text>
        </Text>
      </View>
    </Pressable>
  )
}

type CommunityPageMembersProps = { communityMembers: Profile[] | null }

const CommunityPageMembers = ({
  communityMembers,
}: CommunityPageMembersProps) => {
  const [membersWithRoles, setMembersWithRoles] = useState<
    (Profile & { role?: string })[]
  >([])

  useEffect(() => {
    if (!communityMembers) return

    const fetchRoles = async () => {
      try {
        const memberIds = communityMembers.map((member) => member.id)

        const { data: roles, error } = await supabase
          .from("community_members")
          .select("user_id, role")
          .in("user_id", memberIds)

        if (error) throw error

        const membersWithRoles = communityMembers.map((member) => {
          const roleData = roles?.find((role) => role.user_id === member.id)
          return { ...member, role: roleData?.role }
        })

        setMembersWithRoles(membersWithRoles)
      } catch (error) {
        console.error("Error fetching roles:", error)
      }
    }

    fetchRoles()
  }, [communityMembers])

  return (
    <View className="bg-primary-900">
      <FlatList
        className="h-full"
        data={membersWithRoles}
        renderItem={({ item }) => <CommunityMemberCard member={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default CommunityPageMembers
