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

import supabase from "../../../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import CommunityCardAboutMe from "./CommuntiyCard"

import EditProfileTopBar from "./EditProfileTopBar"

const PrimaryGym = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [communities, setCommunities] = useState<Communities[] | null>([])
  const [pressedStates, setPressedStates] = useState<{
    [key: number]: boolean
  }>({})
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  const handlePressIn = (community_id: number) => {
    setPressedStates((prevState) => ({
      ...prevState,
      [community_id]: true,
    }))
  }

  const handlePressOut = (community_id: number) => {
    setPressedStates((prevState) => ({
      ...prevState,
      [community_id]: false,
    }))
  }

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
    <SafeAreaView className="flex-1 bg-primary-900">
      <EditProfileTopBar
        text="Primary Gym"
        functionProp={() => console.log}
        doneButton={false}
      />
      <ScrollView>
        {communities &&
          communities?.map((community) => (
            <Pressable
              onPressIn={() => handlePressIn(community.id)}
              onPressOut={() => handlePressOut(community.id)}
              onPress={() => showAlert(community.id)}
              key={community.id}
              className={`${pressedStates[community.id] ? "opacity-50" : null}`}
            >
              <CommunityCardAboutMe community={community} />
            </Pressable>
          ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default PrimaryGym
