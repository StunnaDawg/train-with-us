import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import { useAuth } from "../../supabaseFunctions/authcontext"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"
import CommunityProfilePicSupa from "../../components/CommunityProfilePicture"
import { TextInput } from "react-native-gesture-handler"
import updateSingleCommunityTrait from "../../supabaseFunctions/updateFuncs/updateSingleCommunityTrait"
import CommunityImageGrid from "./ImageGrid"
import showAlert from "../../utilFunctions/showAlert"
import { TouchableWithoutFeedback } from "react-native"
import Loading from "../../components/Loading"
import EditProfileTopBar from "../Profile/AddInfoComponents/EditProfileTopBar"

const CommunitySettings = () => {
  const [location, setLocation] = useState("")
  const [communityName, setCommunityName] = useState("")
  const [communityNumber, setCommunityNumber] = useState("")
  const [communityStyle, setCommunityStyle] = useState("")
  const [communityAbout, setCommunityAbout] = useState("")
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NavigationType>()
  const route = useRoute<RouteProp<RootStackParamList, "MyCommunitySettings">>()
  const [singleImageFile, setSingleImageFile] = useState<string | null>(null)
  const community = route.params.community
  const { user } = useAuth()

  useEffect(() => {
    if (community === null) return
    setCommunityName(community.community_title || "")
    setCommunityStyle(community.community_style || "")
    setLocation(community.address || "")
    setCommunityAbout(community.about || "")
    setCommunityNumber(community.phone_number || "")
  }, [community])

  const updateCommunity = () => {
    setLoading(true)
    if (!user?.id) return
    if (!community) return

    if (!communityName.trim()) {
      alert("Title is required.")
      return
    }

    if (communityName !== community?.community_title) {
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
      updateSingleCommunityTrait(setLoading, community.id, "address", location)
    }

    if (community.phone_number !== communityNumber) {
      updateSingleCommunityTrait(
        setLoading,
        community.id,
        "phone_number",
        communityNumber
      )
    }

    setLoading(false)
    showAlert({
      title: "Community Updated",
      message: "Your community has been updated.",
    })
    navigation.goBack()
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      {!loading ? (
        <>
          <EditProfileTopBar
            text="Update Community"
            functionProp={updateCommunity}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  <CommunityProfilePicSupa
                    communityId={community.id}
                    imageUrl={community.community_profile_pic}
                    imageUrlToRead={community.community_profile_pic}
                  />
                </View>

                <View className="flex flex-row mx-5">
                  <View className="w-full">
                    <Text className="font-bold text-sm text-white">
                      Community Name
                    </Text>
                    <View className="border rounded-lg p-2 w-full bg-white">
                      <TextInput
                        value={communityName} // Binds the TextInput value to the state
                        onChangeText={setCommunityName}
                      />
                    </View>

                    <Text className="font-bold text-sm text-white">
                      Community Description
                    </Text>
                    <View className="border rounded-lg p-2 w-full bg-white">
                      <TextInput
                        value={communityAbout}
                        onChangeText={setCommunityAbout} // Increased font size, padding and fixed height
                        placeholder="Description of your community..."
                        multiline={true} // Allow multi-line input
                        numberOfLines={10} // Default number of lines when multiline is true
                        className="h-20"
                      />
                    </View>

                    <Text className="font-bold text-sm text-white">
                      Community Style
                    </Text>
                    <View className="border rounded-lg p-2 w-full bg-white">
                      <TextInput
                        value={communityStyle} // Binds the TextInput value to the state
                        onChangeText={setCommunityStyle}
                      />
                    </View>

                    <Text className="font-bold text-sm text-white">
                      Community Address
                    </Text>
                    <View className="border rounded-lg p-2 w-full bg-white">
                      <TextInput
                        value={location}
                        onChangeText={setLocation}
                        placeholder="Please input an accurate location"
                      />
                    </View>

                    <Text className="font-bold text-sm text-white">
                      Community Phone Number
                    </Text>
                    <View className="border rounded-lg p-2 w-full bg-white">
                      <TextInput
                        className="bg-white"
                        keyboardType="phone-pad"
                        value={communityNumber}
                        onChangeText={setCommunityNumber}
                        placeholder="Please input an accurate phone number"
                      />
                    </View>
                  </View>
                </View>
                <View className="mb-12">
                  <CommunityImageGrid community={community} />
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </SafeAreaView>
  )
}

export default CommunitySettings
