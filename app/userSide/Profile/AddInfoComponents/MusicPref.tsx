import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import NextButton from "../../../components/NextButton"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import EnhancedTextInput from "../../../components/TextInput"
import BackButton from "../../../components/BackButton"
import EditProfileTopBar from "./EditProfileTopBar"

type MusicOptions =
  | "Pop"
  | "Rock"
  | "Jazz"
  | "Classical"
  | "Hip-Hop"
  | "Electronic"
  | "Country"
  | "Reggae"
  | "Blues"
  | "Metal"
  | "Punk"
  | "Rap"
  | "R&B"
  | "Folk"
  | "Indie"
  | "Alternative"
  | "Latin"
  | "Soul"
  | "Reggaeton"
  | "K-Pop"
  | "J-Pop"
  | "Anime"
  | "Gospel"
  | "Christian"
  | "Holiday"
  | "Opera"
  | "Ska"
  | "Salsa"
  | "Merengue"
  | "Bachata"
  | "Reggaeton"
  | "Cumbia"
  | "Vallenato"
  | "any"

const MusicPref = () => {
  const route = useRoute<RouteProp<RootStackParamList, "MusicPreference">>()
  const userProfile = route.params.userProfile

  const navigation = useNavigation<NavigationType>()

  const [musicPref, setMusicPref] = useState<string>("")
  const { user } = useAuth()

  // const handleSelectMusic = (Music: MusicOptions) => {
  //   if (!selectedMusic.includes(Music)) {
  //     setSelectedMusic([...selectedMusic, Music])
  //   }
  // }

  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ music_pref: musicPref })
        .eq("id", user?.id)

      if (error) throw error

      // Navigate to the next preference page
      navigation.goBack()
    } catch (error) {
      console.error("Failed to update community preferences:", error)
    }
  }

  // useEffect(() => {
  //   if (userProfile?.music_pref) {
  //     setSelectedMusic(userProfile.music_pref)
  //   }
  // }, [userProfile])

  const MusicOptions: MusicOptions[] = [
    "Pop",
    "Rock",
    "Jazz",
    "Classical",
    "Hip-Hop",
    "Electronic",
    "Country",
    "Reggae",
    "Blues",
    "Metal",
    "Punk",
    "Rap",
    "R&B",
    "Folk",
    "Indie",
    "Alternative",
    "Latin",
    "Soul",
    "Reggaeton",
    "K-Pop",
    "J-Pop",
    "Anime",
    "Gospel",
    "Christian",
    "Holiday",
    "Opera",
    "Ska",
    "Salsa",
    "Merengue",
    "Bachata",
    "Cumbia",
    "Vallenato",
    "any",
  ]

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View>
        <View>
          <EditProfileTopBar
            text="Music Taste"
            functionProp={async () => await handleUserUpdate()}
          />

          <View className="flex flex-row justify-center">
            <EnhancedTextInput
              text={musicPref}
              setText={setMusicPref}
              placeholder="I love old school hip-hop when working out!"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MusicPref
