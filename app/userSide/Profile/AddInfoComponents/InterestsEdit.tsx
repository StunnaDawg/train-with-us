import { View, Text } from "react-native"
import React from "react"
import { Profile } from "../../../@types/supabaseTypes"

type InterestsEditProps = {
  currentUser: Profile
}

const InterestsEdit = ({ currentUser }: InterestsEditProps) => {
  return (
    <View>
      <Text>InterestsEdit</Text>
    </View>
  )
}

export default InterestsEdit
