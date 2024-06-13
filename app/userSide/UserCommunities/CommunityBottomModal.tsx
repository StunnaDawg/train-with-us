import { View, Text, ScrollView, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import ViewCommunityTitle from "../Communities/components/ViewCommunityTitle"
import { Communities } from "../../@types/supabaseTypes"
import supabase from "../../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import CommunityContact from "../Communities/components/CommunityContact"
import { Image } from "expo-image"
import UpcomingCommunityEvents from "../Communities/components/UpcomingEvents"
import leaveCommunity from "../../supabaseFunctions/deleteFuncs/leaveCommunity"
import { useAuth } from "../../supabaseFunctions/authcontext"

type CommunityBottomModalProps = {
  community: Communities | null
}

const CommunityBottomModal = ({ community }: CommunityBottomModalProps) => {
  const [image, setImage] = useState<string>("")
  const { user } = useAuth()

  const navigation = useNavigation<NavigationType>()

  const readImage = () => {
    if (community?.community_profile_pic === "") return
    console.log("reading", `${community?.community_profile_pic}`)
    supabase.storage
      .from("photos")
      .download(`${community?.community_profile_pic}`)
      .then(({ data }) => {
        const fr = new FileReader()
        fr.readAsDataURL(data!)
        fr.onload = () => {
          setImage(fr.result as string)
        }
      })
  }

  useEffect(() => {
    if (community?.community_profile_pic === undefined) return
    readImage()
  }, [community?.community_profile_pic])

  return (
    <ScrollView>
      <View>
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center">
            <View className="m-4">
              <Pressable onPress={() => navigation.goBack()}>
                <Image
                  className="m-1 relative overflow-hidden max-w-full rounded-full bg-gray-800 border-1 border-solid border-gray-200 border-r-10"
                  source={
                    image
                      ? image
                      : require("../../../assets/images/TWU-Logo.png")
                  }
                  style={{ width: 55, height: 55 }}
                />
              </Pressable>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold">
                {community?.community_title
                  ? community.community_title
                  : "Community"}
              </Text>
              <Pressable
                className="flex flex-row items-center"
                onPress={() => {
                  if (!community) return
                  navigation.navigate("ViewCommunitiesMembersScreen", {
                    communityId: community?.id,
                  })
                }}
              >
                <Text className="mr-1 font-bold text-xs ">
                  {community?.member_count} Members
                </Text>
              </Pressable>
            </View>
          </View>
          <View>
            <CommunityContact community={community} />
          </View>
        </View>
      </View>

      <View className="border rounded-xl mx-3 py-3  mt-1">
        <View className="border-b pb-2">
          <Pressable
            onPress={async () => {
              if (community && user?.id)
                await leaveCommunity(community?.id, user?.id)
              navigation.goBack()
            }}
          >
            <Text className="mx-2 font-bold text-sm">Leave Community</Text>
          </Pressable>
        </View>

        <View>
          <Pressable className="pt-2" onPress={() => {}}>
            <Text className="mx-2 font-bold text-sm">
              View All Community Events
            </Text>
          </Pressable>
        </View>
      </View>

      <View>
        <UpcomingCommunityEvents
          textColour="text-black"
          community={community}
        />
      </View>
    </ScrollView>
  )
}

export default CommunityBottomModal
