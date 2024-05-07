import { View, Text } from "react-native"
import React from "react"
import { Profile } from "../../../@types/supabaseTypes"

type AboutMeEditProps = {
  currentUser: Profile
}

const AboutMeEdit = ({ currentUser }: AboutMeEditProps) => {
  return (
    <View>
      <Text>AboutMeEdit</Text>
    </View>
  )
}

export default AboutMeEdit
