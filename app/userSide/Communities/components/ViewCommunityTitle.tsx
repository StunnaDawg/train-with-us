import { View, Text, Pressable, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { Communities, Profile } from "../../../@types/supabaseTypes"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import requestToJoin from "../../../supabaseFunctions/addFuncs/requestToJoin"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import GenericButton from "../../../components/GenericButton"
import { FontAwesome6 } from "@expo/vector-icons"
import { Image } from "expo-image"
import supabase from "../../../../lib/supabase"

type ViewCommunityTitleProps = {
  community: Communities | null
  communityId: number
}

const ViewCommunityTitle = ({
  community,
  communityId,
}: ViewCommunityTitleProps) => {
  const [image, setImage] = useState<string>("")

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
    <View>
      <View className="flex flex-row justify-between items-center">
        <View>
          <View className="flex flex-row mx-2 items-center">
            <View className="m-4">
              <Pressable onPress={() => navigation.goBack()}>
                <Image
                  className="m-1 relative overflow-hidden max-w-full rounded-full bg-gray-800 border-1 border-solid border-gray-200 border-r-10"
                  source={
                    image
                      ? image
                      : require("../../../../assets/images/TWU-Logo.png")
                  }
                  style={{ width: 55, height: 55 }}
                />
              </Pressable>
            </View>
            <View className="items-center">
              <Text className="text-white text-xl font-bold">
                {community?.community_title
                  ? community.community_title
                  : "Community"}
              </Text>
              <Pressable
                className="flex flex-row items-center"
                onPress={() =>
                  navigation.navigate("ViewCommunitiesMembersScreen", {
                    communityId: communityId,
                  })
                }
              >
                <Text className="mr-1 font-bold text-xs text-slate-500">
                  {community?.member_count} Members
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ViewCommunityTitle
