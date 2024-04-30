import { View, Text } from "react-native"
import React from "react"
import WhiteSkinnyButton from "../../../components/WhiteSkinnyButton"
import { Communities } from "../../../@types/supabaseTypes"

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
        <Text className="font-bold text-xl text-wrap">580 Wright Ave</Text>
        <Text className="font-bold text-xl text-wrap">Dartmouth, NS</Text>
      </View>

      <View>
        <WhiteSkinnyButton buttonFunction={callFunc} text="9022225787" />
      </View>
    </View>
  )
}

export default CommunityContact
