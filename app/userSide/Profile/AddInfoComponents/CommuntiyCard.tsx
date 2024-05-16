import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import { Communities, Profile } from "../../../@types/supabaseTypes"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"

type CommunityCardProps = {
  community: Communities
}

const CommunityCardAboutMe = ({ community }: CommunityCardProps) => {
  return (
    <View className="flex flex-row items-center">
      <View className="m-2">
        <SinglePic
          size={90}
          item={community.community_profile_pic}
          avatarRadius={100}
          noAvatarRadius={100}
        />
      </View>

      <View className="flex-col flex-1">
        <Text className="font-bold text-2xl">{community.community_title}</Text>
        <View className="border-b p-3" />
      </View>
    </View>
  )
}

export default CommunityCardAboutMe
