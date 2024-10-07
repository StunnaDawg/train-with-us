import React, { useEffect, useState } from "react"
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import EnhancedTextInput from "../../../components/TextInput"
import EditProfileTopBar from "../../../components/TopBarEdit"

const MusicPref = () => {
  const route = useRoute<RouteProp<RootStackParamList, "MusicPreference">>()
  const userProfile = route.params.userProfile
  const navigation = useNavigation<NavigationType>()
  const [musicPref, setMusicPref] = useState<string>("")
  const { user } = useAuth()

  useEffect(() => {
    if (userProfile?.music_pref) {
      setMusicPref(userProfile.music_pref)
    }
  }, [userProfile])

  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user?.id, music_pref: musicPref })

      if (error) throw error

      navigation.goBack()
    } catch (error) {
      console.error("Failed to update music preferences:", error)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <EditProfileTopBar
        text="Music Taste"
        onSave={handleUserUpdate}
        saveText="Done"
        primaryTextColor="text-gray-800"
      />
      <View className="flex-1 p-4">
        <Text className="text-lg font-semibold mb-2 text-gray-800">
          Share your music preferences
        </Text>
        <Text className="text-sm text-gray-600 mb-4">
          Tell us about your favorite music genres, artists, or how music fits
          into your life.
        </Text>
        <EnhancedTextInput
          text={musicPref}
          setText={setMusicPref}
          label="Your Music Preferences"
          placeholder="I love old school hip-hop when working out, and jazz for relaxing..."
          maxLength={150}
          multiline
          numberOfLines={4}
          inputStyle="h-36"
        />
        <TouchableOpacity
          onPress={handleUserUpdate}
          className="mt-6 bg-blue-500 py-3 px-6 rounded-full"
        >
          <Text className="text-white text-center font-semibold">
            Save Music Preferences
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default MusicPref
