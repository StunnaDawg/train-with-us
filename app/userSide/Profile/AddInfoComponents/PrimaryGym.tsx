import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
  Pressable,
} from "react-native"
import React, { useEffect, useState } from "react"
import { Communities, Profile } from "../../../@types/supabaseTypes"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import getAllUsersCommunities from "../../../supabaseFunctions/getFuncs/getUsersCommunities"
import CommunityBubble from "../../UserCommunities/components/CommunityBubble"
import CommunityCard from "../../Communities/components/CommunityCard"
import supabase from "../../../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import CommunityCardAboutMe from "./CommuntiyCard"
import BackButton from "../../../components/BackButton"

const PrimaryGym = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [communities, setCommunities] = useState<Communities[] | null>([])
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  const showAlert = (community_id: number) => {
    Alert.alert(
      "Choose an Option",
      "Select an action to perform:",
      [
        {
          text: "Set as Primary Community",
          onPress: () => setPrimaryGym(community_id),
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true } // This makes it possible to tap outside of the alert and cancel it
    )
  }

  const setPrimaryGym = async (community_id: number) => {
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: user?.id, primary_gym: community_id }) // Include the 'id' in the upsert object
      .eq("id", user?.id)

    if (error) throw error

    navigation.goBack()
  }

  useEffect(() => {
    if (!user) return

    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (!user) return
    getAllUsersCommunities(user?.id, setLoading, setCommunities)
  }, [currentUser])
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-between items-center">
        <View className="ml-1">
          <BackButton />
        </View>

        <Text className="font-bold text-lg text-center mx-2">
          Select your primary gym from the list below
        </Text>
        <View />
      </View>
      <ScrollView>
        {communities &&
          communities?.map((community) => (
            <Pressable
              onPress={() => showAlert(community.id)}
              key={community.id}
              className="m-2"
            >
              <CommunityCardAboutMe community={community} />
            </Pressable>
          ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default PrimaryGym
