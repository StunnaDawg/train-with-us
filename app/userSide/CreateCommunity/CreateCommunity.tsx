import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import { FontAwesome6 } from "@expo/vector-icons"
import NewPhoto from "../../components/NewPhoto"
import addNewCommunity from "../../supabaseFunctions/addFuncs/addNewCommunity"
import { useAuth } from "../../supabaseFunctions/authcontext"
import * as ImagePicker from "expo-image-picker"
import Loading from "../../components/Loading"
import showAlert from "../../utilFunctions/showAlert"
import BackButton from "../../components/BackButton"

const CreateCommunity = () => {
  const { user } = useAuth()
  const [communityName, setCommunityName] = useState("")
  const [communityStyle, setCommunityStyle] = useState("")
  const [privateCommunity, setPrivateCommunity] = useState<boolean>(true)
  const [communityId, setCommunityId] = useState<number>(0)
  const navigation = useNavigation<NavigationType>()

  const [communityProfilePic, setCommunityProfilePic] =
    useState<ImagePicker.ImagePickerAsset>({} as ImagePicker.ImagePickerAsset)
  const [loading, setLoading] = useState(false)

  const createCommunity = async () => {
    if (user === null) {
      showAlert({
        title: "No User Found",
        message: "Please login to create a community",
        buttonText: "Understood",
      })
      return
    }

    await addNewCommunity(
      setLoading,
      communityProfilePic,
      communityName,
      user!.id,
      communityStyle,
      privateCommunity,
      setCommunityId
    )
  }

  useEffect(() => {
    if (privateCommunity === false) {
      showAlert({
        title: "Public Communities",
        message: "Warning: Public communities can be joined by anyone.",
        buttonText: "Understood",
      })
    }

    if (privateCommunity === true) {
      showAlert({
        title: "Private Communities",
        message: "Users must request to join your community.",
        buttonText: "Understood",
      })
    }
  }, [privateCommunity])

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      {!loading ? (
        <ScrollView className="flex-1 px-5 py-6">
          <View className="flex-row justify-between items-center mb-6">
            <BackButton size={26} colour="white" />
            <Text className="text-2xl font-bold text-white">
              Create your Community
            </Text>
            <View className="w-[26px]" />
          </View>

          <View className="items-center mb-6">
            <NewPhoto setProfilePic={setCommunityProfilePic} />
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-white mb-2">
              Community Name
            </Text>
            <TextInput
              className="bg-primary-800 rounded-lg p-3 text-white text-base"
              value={communityName}
              onChangeText={setCommunityName}
              placeholder="Enter community name"
              placeholderTextColor="#a0aec0"
            />
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-white mb-2">
              Community Access
            </Text>
            <View className="flex-row items-center justify-between bg-primary-800 rounded-lg p-3">
              <View className="flex-row items-center">
                <FontAwesome6
                  name={privateCommunity ? "lock" : "lock-open"}
                  size={20}
                  color="white"
                  style={{ marginRight: 10 }}
                />
                <Text className="text-white text-base">
                  {privateCommunity ? "Private" : "Public"}
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={privateCommunity ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setPrivateCommunity(!privateCommunity)}
                value={privateCommunity}
              />
            </View>
          </View>

          <Text className="text-sm text-gray-400 text-center mb-6">
            By creating a server, you agree to Train With Us's{" "}
            <Text className="text-blue-400 underline">
              Community Guidelines
            </Text>
          </Text>

          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-4 items-center mb-12"
            onPress={async () => {
              await createCommunity()
              navigation.navigate("ChooseCommunityActivities")
            }}
          >
            <Text className="text-white text-lg font-bold">
              Create Community
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  )
}

export default CreateCommunity
