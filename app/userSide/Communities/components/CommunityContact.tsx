import { View, Text, Platform } from "react-native"
import React from "react"
import WhiteSkinnyButton from "../../../components/WhiteSkinnyButton"
import { Communities } from "../../../@types/supabaseTypes"
import GenericButton from "../../../components/GenericButton"
import openInGoogleMaps from "../../../utilFunctions/openGoogleMaps"
import openInAppleMaps from "../../../utilFunctions/openAppleMaps"
import PhoneCallButton from "../../../components/PhoneNumberButton"

type CommunityContactProps = {
  community: Communities | null
}

const CommunityContact = ({ community }: CommunityContactProps) => {
  return (
    <View className="flex flex-row">
      <View className="flex  flex-row items-center  mx-2 ">
        <View>
          <View>
            <Text className="font-bold text-3xl text-wrap text-white">
              {community?.address}
            </Text>
          </View>
          {community?.phone_number ? (
            <View className="items-center my-2">
              <PhoneCallButton phoneNumber={`+${community?.phone_number}`} />
            </View>
          ) : null}
        </View>
      </View>
      <View>
        {Platform.OS === "ios" ? (
          <View>
            <View className="my-2">
              <GenericButton
                text="Open in Apple Maps"
                buttonFunction={() =>
                  openInAppleMaps("580 Wright Ave, Dartmouth NS")
                }
                roundness="rounded-xl"
                textSize="text-sm"
                width={150}
                colourPressed="bg-slate-200"
                colourDefault="bg-white"
                borderColourPressed="border-gray-200"
                borderColourDefault="border-black"
              />
            </View>

            <View className="my-2">
              <GenericButton
                text="Open in Google Maps"
                buttonFunction={() =>
                  openInGoogleMaps("580 Wright Ave, Dartmouth NS")
                }
                roundness="rounded-xl"
                textSize="text-sm"
                width={150}
                colourPressed="bg-slate-200"
                colourDefault="bg-white"
                borderColourPressed="border-gray-200"
                borderColourDefault="border-black"
              />
            </View>
          </View>
        ) : (
          <View className="my-2">
            <GenericButton
              text="Open in Google Maps"
              buttonFunction={() =>
                openInGoogleMaps("580 Wright Ave, Dartmouth NS")
              }
              roundness="rounded-xl"
              textSize="text-sm"
              width={200}
              colourPressed="bg-slate-200"
              colourDefault="bg-white"
              borderColourPressed="border-gray-200"
              borderColourDefault="border-black"
            />
          </View>
        )}
      </View>
    </View>
  )
}

export default CommunityContact
