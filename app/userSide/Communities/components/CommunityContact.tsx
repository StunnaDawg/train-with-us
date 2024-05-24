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
  const callFunc = () => {
    console.log("Calling")
  }

  return (
    <View className="items-center">
      <View>
        {/* Location */}
        <Text className="font-bold text-xl text-wrap text-white">
          580 Wright Ave
        </Text>
        <Text className="font-bold text-xl text-wrap text-white">
          Dartmouth, NS
        </Text>

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

      {community?.phone_number ? (
        <View>
          <PhoneCallButton phoneNumber={`+${community?.phone_number}`} />
        </View>
      ) : null}
    </View>
  )
}

export default CommunityContact
