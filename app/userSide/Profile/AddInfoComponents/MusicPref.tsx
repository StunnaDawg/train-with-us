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
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="flex justify-center mx-12">
          <View className="items-start w-full">
            <View className="my-5">
              <Text className="font-bold text-2xl">
                Music Preferences While Working Out?
              </Text>
            </View>

            <View className="flex flex-row justify-center">
              <EnhancedTextInput
                text={musicPref}
                setText={setMusicPref}
                placeholder="Anything with Latino flare!"
              />
            </View>
          </View>
          <View className="mt-4 flex flex-row justify-end">
            <NextButton onPress={() => handleUserUpdate()} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MusicPref
