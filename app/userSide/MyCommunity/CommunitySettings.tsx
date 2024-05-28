import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import SingleImageSupa from "../../components/SingleImageSupa"
import { useAuth } from "../../supabaseFunctions/authcontext"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"
import SingleImageSupaCommunity from "../../components/EditCommunityPicture"
import CommunityProfilePicSupa from "../../components/CommunityProfilePicture"
import { TextInput } from "react-native-gesture-handler"
import BasicButton from "../../components/BasicButton"
import { Communities } from "../../@types/supabaseTypes"
import updateSingleCommunityTrait from "../../supabaseFunctions/updateFuncs/updateSingleCommunityTrait"
import CommunityImageGrid from "./ImageGrid"
import showAlert from "../../utilFunctions/showAlert"
import CancelButton from "../../components/CancelButton"

const CommunitySettings = () => {
  const [communityState, setCommunityState] = useState<Communities | null>(
    {} as Communities
  )
  const [location, setLocation] = useState("")
  const [communityName, setCommunityName] = useState("")
  const [communityNumber, setCommunityNumber] = useState("")
  const [communityStyle, setCommunityStyle] = useState("")
  const [communityAbout, setCommunityAbout] = useState("")
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NavigationType>()
  const route = useRoute<RouteProp<RootStackParamList, "MyCommunitySettings">>()
  const community = route.params.community

  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const [singleImageFile, setSingleImageFile] = useState<
    string | null | undefined
  >(null)
  const { user } = useAuth()

  useEffect(() => {
    setSingleImageFile(community.community_profile_pic)
  }, [community])

  useEffect(() => {
    setImageFiles(community.community_photos)
  }, [community])

  useEffect(() => {
    getSingleCommunity(setLoading, community.id, setCommunityState)
  }, [user])

  useEffect(() => {
    if (communityState === null) return
    setCommunityName(communityState.community_title || "")
    setCommunityStyle(communityState.community_style || "")
    setLocation(communityState.address || "")
    setCommunityAbout(communityState.about || "")
    setCommunityNumber(communityState.phone_number || "")
  }, [communityState])

  const updateCommunity = () => {
    setTimeout(() => {
      if (!user?.id) return
      if (!community) return

      if (!communityName.trim()) {
        alert("Title is required.")
        return
      }

      if (communityName !== communityState?.community_title) {
        updateSingleCommunityTrait(
          setLoading,
          community.id,
          "community_title",
          communityName
        )
      }

      if (community.about !== communityAbout) {
        updateSingleCommunityTrait(
          setLoading,
          community.id,
          "about",
          communityAbout
        )
      }

      if (community.address !== location) {
        updateSingleCommunityTrait(
          setLoading,
          community.id,
          "address",
          location
        )
      }

      if (community.phone_number !== communityNumber) {
        updateSingleCommunityTrait(
          setLoading,
          community.id,
          "phone_number",
          communityNumber
        )
      }
      showAlert({
        title: "Community Updated",
        message: "Your community has been updated.",
      })
      navigation.goBack()
    }, 2000)
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="mx-2">
        <CancelButton size={32} />
      </View>

      <ScrollView>
        <View>
          <CommunityProfilePicSupa
            communityId={community.id}
            imageUrl={singleImageFile}
            imageUrlToRead={singleImageFile}
            setImageUrl={setSingleImageFile}
          />
        </View>

        <View className="flex flex-row mx-5">
          <View className="w-full">
            <Text className="font-medium text-lg">Community Name</Text>
            <View className="border rounded-lg p-2 w-full">
              <TextInput
                value={communityName} // Binds the TextInput value to the state
                onChangeText={setCommunityName}
              />
            </View>

            <Text className="font-medium text-lg">Community Description</Text>
            <View className="border rounded-lg p-2 w-full">
              <TextInput
                value={communityAbout}
                onChangeText={setCommunityAbout} // Increased font size, padding and fixed height
                placeholder="Description of your community..."
                multiline={true} // Allow multi-line input
                numberOfLines={10} // Default number of lines when multiline is true
                className="h-20"
              />
            </View>

            <Text className="font-medium text-lg">Community Style</Text>
            <View className="border rounded-lg p-2 w-full">
              <TextInput
                value={communityStyle} // Binds the TextInput value to the state
                onChangeText={setCommunityStyle}
              />
            </View>

            <Text className="font-medium text-lg">Community Address</Text>
            <View className="border rounded-lg p-2 w-full">
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Please input an accurate location"
              />
            </View>

            <Text className="font-medium text-lg">Community Phone Number</Text>
            <View className="border rounded-lg p-2 w-full">
              <TextInput
                value={communityNumber}
                onChangeText={setCommunityNumber}
                placeholder="Please input an accurate phone number"
              />
            </View>
          </View>
        </View>
        <View>
          <CommunityImageGrid community={community} />
        </View>

        <View className="flex flex-row justify-center my-2">
          <BasicButton
            text="Update Community"
            buttonFunction={updateCommunity}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CommunitySettings
