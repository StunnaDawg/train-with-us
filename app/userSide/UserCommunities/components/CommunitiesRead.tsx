import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import { Communities, CommunityChannel } from "../../../@types/supabaseTypes"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"
import getUserPinnedChannels from "../../../supabaseFunctions/getFuncs/getUserPinnedChannels"

const CommunitiesRead = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const [communityChannels, setCommunityChannels] = useState<
    CommunityChannel[] | null
  >([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    getUserPinnedChannels(setLoading, user?.id, setCommunityChannels)
  }, [])

  useEffect(() => {
    console.log("community channels fetched", communityChannels)
  }, [communityChannels])
  return (
    <View className="mt-8 mx-8 pb-2">
      <View>
        <Text className="font-bold text-xl">My Pinned Channels</Text>
      </View>

      {!loading && communityChannels && communityChannels.length > 0 ? (
        <Pressable className="flex flex-row items-center">
          {/* <View className="m-2">
          <SinglePic
            size={55}
            avatarRadius={100}
            noAvatarRadius={100}
            item={imageFiles?.[0]}
          />
        </View> */}

          <View>
            <Text className="font-bold mb-1">
              {communityChannels &&
              communityChannels[0].channel_title !== null &&
              communityChannels[0].channel_title !== undefined
                ? communityChannels[0].channel_title
                : "error loading channel title"}
            </Text>
            <Text className="text-sm">Hey, how are you?</Text>
          </View>
        </Pressable>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  )
}

export default CommunitiesRead
