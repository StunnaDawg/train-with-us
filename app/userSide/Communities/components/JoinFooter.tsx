import { View, Text, Alert, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import GenericButton from "../../../components/GenericButton"
import { Profile } from "../../../@types/supabaseTypes"
import requestToJoin from "../../../supabaseFunctions/addFuncs/requestToJoin"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import supabase from "../../../../lib/supabase"

type ViewCommunityTitleProps = {
  communityId: number
  communityOwner: string | null
  communityTitle: string | undefined | null
  publicCommunity: boolean
  setJoinedState: React.Dispatch<React.SetStateAction<boolean>>
}

const JoinFooter = ({
  communityId,
  communityOwner,
  communityTitle,
  publicCommunity,
  setJoinedState,
}: ViewCommunityTitleProps) => {
  const [requestSent, setRequestSent] = useState<boolean>(false)

  const [isPressed, setIsPressed] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const { user } = useAuth()
  const title = `${communityTitle || ""}`

  const handleOnPressIn = () => {
    setIsPressed(true)
  }

  const handleOnPressOut = () => {
    setIsPressed(false)
  }

  const showAlert = (title: string, message: string) =>
    Alert.alert(title, message, [{ text: "OK" }])

  const showErrorAlert = () =>
    Alert.alert(
      "User not Authenticated",
      "Please Check your Connection and try again. Or Check for any missing information.",
      [{ text: "OK" }]
    )

  const requestFunc = async () => {
    if (user?.id === undefined || !currentProfile?.first_name) {
      showErrorAlert()
      return
    }

    if (publicCommunity) {
      const { data: existingMember, error: fetchError } = await supabase
        .from("community_members")
        .select()
        .eq("community_id", communityId)
        .eq("user_id", user.id)
        .single()

      if (fetchError && fetchError.code !== "PGRST116") {
        showAlert("Error Joining Community", "Please try again.")
        throw fetchError
      }

      if (existingMember) {
        showAlert(
          "Already a Member",
          "You are already a member of this community."
        )
        return
      }

      const { error: joinError } = await supabase
        .from("community_members")
        .insert({
          community_id: communityId,
          user_id: user?.id,
          role: "member",
          joined_at: new Date(),
        })

      if (joinError) {
        showAlert("Error Joining Community", "Please try again.")
        throw joinError
      }

      showAlert(
        "Community Joined",
        "You have successfully joined the community"
      )

      setJoinedState(true)
      return
    } else {
      await requestToJoin(
        communityId,
        communityOwner,
        title,
        user?.id,
        currentProfile?.first_name,
        currentProfile?.expo_push_token,
        showAlert
      )

      setRequestSent(true)
    }
  }

  useEffect(() => {
    if (!user) return
    useCurrentUser(user?.id, setCurrentProfile)
  }, [user])

  return (
    <View className=" bg-primary-900 h-12">
      <View className="flex flex-row justify-center items-center h-full">
        <Pressable
          style={{ width: "80%", height: "100%" }}
          className={`${
            isPressed
              ? `bg-slate-400 border-2 border-solid border-slate-400`
              : `bg-white border-2 border-solid border-slate-400`
          } flex justify-center items-center rounded-xl`}
          onPress={async () => await requestFunc()}
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
        >
          <Text className="font-bold text-center text-xl">{`${
            requestSent ? "Request Sent" : "Join"
          }`}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default JoinFooter
