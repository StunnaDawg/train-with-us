import { View, Text, Platform, Pressable, Share } from "react-native"
import React from "react"
import { Communities } from "../../../@types/supabaseTypes"
import PhoneCallButton from "../../../components/PhoneNumberButton"
import { FontAwesome5 } from "@expo/vector-icons"
import openInMaps from "../../../utilFunctions/openMaps"
import openInGoogleMaps from "../../../utilFunctions/openGoogleMaps"
import ShareCommunityButton from "../../../components/ShareCommunityButton"

type CommunityContactProps = {
  community: Communities | null
  userId: string | undefined | null
}

const CommunityContact = ({ community, userId }: CommunityContactProps) => {
  return (
    <View className="flex flex-row">
      <View className="flex  flex-row items-center  mx-2 ">
        <View className=" mx-2 flex flex-row items-center">
          <ShareCommunityButton communityId={community?.id} userId={userId} />

          {Platform.OS === "ios" ? (
            <>
              <Pressable
                className="bg-white rounded-xl p-1"
                onPress={() => {
                  if (community?.address) {
                    openInMaps(community?.address)
                  }
                }}
              >
                <FontAwesome5 name="directions" size={22} color="black" />
              </Pressable>
            </>
          ) : (
            <Pressable
              className="bg-white rounded-xl p-1"
              onPress={() => {
                if (community?.address) {
                  openInGoogleMaps(community?.address)
                }
              }}
            >
              <FontAwesome5 name="directions" size={22} color="black" />
            </Pressable>
          )}
        </View>
        <View className="items-center">
          {community?.phone_number ? (
            <PhoneCallButton phoneNumber={`+${community?.phone_number}`} />
          ) : null}
        </View>
      </View>
    </View>
  )
}

export default CommunityContact
