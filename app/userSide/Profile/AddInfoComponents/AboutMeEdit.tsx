import { View, Text, Pressable } from "react-native"
import React, { useEffect } from "react"
import { Profile } from "../../../@types/supabaseTypes"
import calculateAge from "../../../utilFunctions/calculateAge"

type AboutMeEditProps = {
  currentUser: Profile
}

const AboutMeEdit = ({ currentUser }: AboutMeEditProps) => {
  return (
    <View>
      <View>
        <Pressable>
          <Text>{calculateAge(currentUser.birthday)} </Text>
        </Pressable>
      </View>

      <View>
        <Pressable>
          <Text>Gender - {currentUser.gender}</Text>
        </Pressable>
      </View>

      <View>
        <Pressable>
          <Text>Sexuality - {currentUser.sexuality}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default AboutMeEdit
