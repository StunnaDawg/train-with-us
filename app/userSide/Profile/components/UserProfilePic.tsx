import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import { Profile } from "../../../@types/supabaseTypes"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

type UserProfilePicProps = {
  refresh: boolean
  profile: Profile | null
}

const UserProfilePic = ({ refresh, profile }: UserProfilePicProps) => {
  const [pressed, setPressed] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [profilePic, setProfilePic] = useState<string | null>(null)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  const handleOnPressIn = () => {
    setPressed(true)
  }

  const handleOnPressOut = () => {
    setPressed(false)
  }

  useEffect(() => {
    if (!user) return

    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (!user) return

    useCurrentUser(user?.id, setCurrentUser)
  }, [refresh])

  useEffect(() => {
    if (
      currentUser?.profile_pic === null ||
      currentUser?.profile_pic === undefined
    )
      return
    console.log("Profile picture", currentUser?.profile_pic)
    setProfilePic(currentUser?.profile_pic)
  }, [currentUser])
  return (
    <View className="flex flex-row justify-center mt-12">
      <View>
        <SinglePicCommunity
          size={150}
          item={profilePic}
          avatarRadius={230}
          noAvatarRadius={230}
        />
        <View className="flex flex-row justify-center mt-4 items-center">
          <Text className="font-bold text-xl mx-2">{profile?.first_name}</Text>
          <Pressable
            onPress={() => {
              if (currentUser) {
                navigation.navigate("UserEditProfile", {
                  userProfile: currentUser,
                })
              }
            }}
            onPressIn={handleOnPressIn}
            onPressOut={handleOnPressOut}
          >
            <FontAwesome6
              name="edit"
              size={24}
              color={pressed ? "blue" : "black"}
            />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default UserProfilePic
