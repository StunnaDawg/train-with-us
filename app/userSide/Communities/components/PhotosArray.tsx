import { View, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { Communities } from "../../../@types/supabaseTypes"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"
import SinglePicCommunity from "../../../components/SinglePicCommunity"

type PhotoArrayProps = {
  community: Communities
}

const PhotoArray = ({ community }: PhotoArrayProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentCommunity, setCurrentCommunity] = useState<Communities | null>(
    {} as Communities
  )
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    getSingleCommunity(setLoading, community.id, setCurrentCommunity)
  }, [user])

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="m-1">
          <SinglePicCommunity
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            item={currentCommunity?.community_photos?.[0]}
            skeletonRadius={"square"}
          />
        </View>

        <View className="m-1">
          <SinglePicCommunity
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            item={currentCommunity?.community_photos?.[1]}
            skeletonRadius={"square"}
          />
        </View>
        <View className="m-1">
          <SinglePicCommunity
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            item={currentCommunity?.community_photos?.[2]}
            skeletonRadius={"square"}
          />
        </View>
        <View className="m-1">
          <SinglePicCommunity
            size={165}
            avatarRadius={10}
            noAvatarRadius={10}
            item={currentCommunity?.community_photos?.[3]}
            skeletonRadius={"square"}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default PhotoArray
