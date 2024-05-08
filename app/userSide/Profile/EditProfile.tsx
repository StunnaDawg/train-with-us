import { View, Text, SafeAreaView, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import ImageGrid from "./editProfileComponents/ImageGrid"
import { useAuth } from "../../supabaseFunctions/authcontext"
import ProfilePicture from "./editProfileComponents/ProfilePicture"

const EditProfile = () => {
  const { user } = useAuth()
  return (
    <SafeAreaView className="flex-1">
      <View>
        <ProfilePicture />
      </View>
      <View className="m-5">
        <Text className="text-3xl font-bold text-center mt-4">
          Pick your Profile Photos
        </Text>
      </View>
      <View>
        <ImageGrid />
      </View>
    </SafeAreaView>
  )
}

export default EditProfile
