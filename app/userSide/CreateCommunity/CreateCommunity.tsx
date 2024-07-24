import { View, Text, SafeAreaView, TextInput, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import NewPhoto from "../../components/NewPhoto"
import BasicButton from "../../components/BasicButton"
import addNewCommunity from "../../supabaseFunctions/addFuncs/addNewCommunity"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { NavigationType } from "../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import supabase from "../../../lib/supabase"
import Loading from "../../components/Loading"
import { Switch } from "react-native-gesture-handler"
import showAlert from "../../utilFunctions/showAlert"
import { FontAwesome6 } from "@expo/vector-icons"
import BackButton from "../../components/BackButton"

const CreateCommunity = () => {
  const { user } = useAuth()
  const [communityName, setCommunityName] = useState("")
  const [communityStyle, setCommunityStyle] = useState("")
  const [privateCommunity, setPrivateCommunity] = useState(true)

  const [communityProfilePic, setCommunityProfilePic] =
    useState<ImagePicker.ImagePickerAsset>({} as ImagePicker.ImagePickerAsset)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NavigationType>()

  const addNewCommunityToUser = async (communityId: string) => {
    const { error } = await supabase.from("profiles").upsert({
      id: user?.id,
      community_created: communityId,
    })

    if (error) throw error
  }

  const addOwnerToCommunity = async (communityId: string) => {
    const { error } = await supabase.from("community_members").insert([
      {
        community_id: communityId,
        user_id: user!.id,
        role: "owner",
        joined_at: new Date(),
        community_owner: user!.id,
      },
    ])

    if (error) throw error
  }

  const createCommunity = async () => {
    if (user === null) return
    const id = await addNewCommunity(
      setLoading,
      communityProfilePic,
      communityName,
      user!.id,
      communityStyle
    )

    await addNewCommunityToUser(id)
    await addOwnerToCommunity(id)
    navigation.goBack()
  }

  useEffect(() => {
    if (privateCommunity === false) {
      showAlert({
        title: "Public Communities",
        message: "Warning Public communities can be joined by anyone.",
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
    <SafeAreaView className="flex-1">
      {!loading ? (
        <>
          <View className="flex flex-row justify-between items-center mx-2">
            <BackButton size={26} />

            <View>
              <Text className="font-bold text-xl">Create your Community</Text>
            </View>
            <View />
          </View>

          <View>
            <NewPhoto setProfilePic={setCommunityProfilePic} />
          </View>

          <View className="flex flex-row mx-5">
            <View>
              <Text className="font-medium text-lg">Community Name</Text>
              <View className="border rounded-lg p-2 w-full">
                <TextInput
                  value={communityName} // Binds the TextInput value to the state
                  onChangeText={setCommunityName}
                />
              </View>

              <Text className="font-medium text-lg">Community Access</Text>
              <View className="flex flex-row items-center p-2 w-full">
                <View className="mx-1">
                  <FontAwesome6
                    name={`${privateCommunity ? "lock" : "unlock"}`}
                    size={24}
                  />
                </View>
                <Switch
                  value={privateCommunity}
                  onValueChange={setPrivateCommunity}
                />
              </View>

              <Text className="font-medium text-lg">Community Style</Text>
              <View className="border rounded-lg p-2 w-full">
                <TextInput
                  value={communityStyle} // Binds the TextInput value to the state
                  onChangeText={setCommunityStyle}
                />
              </View>

              <Text className="font-medium text-sm">
                By creating a server, you agree to Train With Us's{" "}
                <Pressable>
                  <Text className="text-blue-600 underline">
                    Community Guidlines
                  </Text>
                </Pressable>
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-center my-2">
            <BasicButton
              text="Create Community"
              buttonFunction={async () => {
                await createCommunity()
              }}
            />
          </View>
        </>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  )
}

export default CreateCommunity
