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
          <View className="items-center">
            <Text className="font-bold text-lg text-wrap text-white">
              {community?.address}
            </Text>
          </View>
          <View className="flex flex-row items-center">
            {Platform.OS === "ios" ? (
              <>
                <View className="my-2 mx-1">
                  <GenericButton
                    text="Open in Apple Maps"
                    buttonFunction={() =>
                      openInAppleMaps("580 Wright Ave, Dartmouth NS")
                    }
                    roundness="rounded-xl"
                    textSize="text-xs"
                    width={100}
                    textCenter={true}
                    colourPressed="bg-slate-200"
                    colourDefault="bg-white"
                    borderColourPressed="border-gray-200"
                    borderColourDefault="border-black"
                  />
                </View>

                <View className="my-2 mx-1">
                  <GenericButton
                    text="Open in Google Maps"
                    buttonFunction={() =>
                      openInGoogleMaps("580 Wright Ave, Dartmouth NS")
                    }
                    roundness="rounded-xl"
                    textSize="text-xs"
                    width={100}
                    textCenter={true}
                    colourPressed="bg-slate-200"
                    colourDefault="bg-white"
                    borderColourPressed="border-gray-200"
                    borderColourDefault="border-black"
                  />
                </View>
              </>
            ) : (
              <View className="my-2">
                <GenericButton
                  text="Open in Google Maps"
                  buttonFunction={() =>
                    openInGoogleMaps("580 Wright Ave, Dartmouth NS")
                  }
                  roundness="rounded-xl"
                  textSize="text-xs"
                  width={100}
                  textCenter={true}
                  colourPressed="bg-slate-200"
                  colourDefault="bg-white"
                  borderColourPressed="border-gray-200"
                  borderColourDefault="border-black"
                />
              </View>
            )}
          </View>
          <View className="items-center my-2">
            {community?.phone_number ? (
              <PhoneCallButton phoneNumber={`+${community?.phone_number}`} />
            ) : null}
          </View>
        </View>
      </View>
      <View></View>
    </View>
  )
}

export default CommunityContact
