import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native"
import React, { useEffect, useState } from "react"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import { Communities, CommunityChannel } from "../../../@types/supabaseTypes"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"
import getUserPinnedChannels from "../../../supabaseFunctions/getFuncs/getUserPinnedChannels"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import SinglePic from "../../../components/SinglePic"
import SinglePicCommunity from "../../../components/SinglePicCommunity"

const CommunitiesRead = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()

  const [communityChannels, setCommunityChannels] = useState<
    CommunityChannel[] | null
  >([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    getUserPinnedChannels(setLoading, user?.id, setCommunityChannels)
  }, [user])

  useEffect(() => {
    console.log("community channels fetched", communityChannels)
  }, [communityChannels])
  return (
    <View className="mt-8 mx-8 pb-2 h-full">
      <View>
        <Text className="font-bold text-2xl text-white">
          My Pinned Channels
        </Text>
      </View>

      <ScrollView className="h-full">
        {!loading && communityChannels && communityChannels.length > 0 ? (
          communityChannels.map((c) => (
            <View key={c.id} className="flex-row justify-between items-center">
              <Pressable
                key={c.id} // Assuming 'id' is the unique identifier for each channel
                onPress={() =>
                  navigation.navigate("ChannelScreen", {
                    channelId: c, // Changed to use the correct channel id
                  })
                }
                className="flex flex-row items-center"
              >
                <View className="m-2">
                  <SinglePicCommunity
                    size={55}
                    avatarRadius={100}
                    noAvatarRadius={100}
                    item={c.channel_pic} // Assuming this is correctly accessing the picture property
                  />
                </View>

                <View>
                  <Text className="font-bold mb-1 text-xl text-white">
                    {c.channel_title || "error loading channel title"}{" "}
                    {c.channel_type === "Announcement"
                      ? `#${c.channel_type}`
                      : null}
                  </Text>
                  {/* <Text className="text-lg font-bold text-white">
                    {c.recent_message || "No Messages yet!"}
                  </Text> */}
                </View>
              </Pressable>
            </View>
          ))
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </View>
  )
}

export default CommunitiesRead
