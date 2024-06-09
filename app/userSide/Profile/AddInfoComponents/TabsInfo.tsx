import React, { useState } from "react"
import { View, Text, Pressable } from "react-native"

type TabsProps = {
  changeToAboutMeTab: () => void
  changeToInterestTab: () => void
  aboutMe: boolean
}

const Tabs = ({
  changeToAboutMeTab,
  changeToInterestTab,
  aboutMe,
}: TabsProps) => {
  const [pressedAboutMe, setAboutMe] = useState(false)
  const [pressedInterests, setInterests] = useState(false)

  const messageTabStyle = `mx-2 py-2 px-5 border rounded-2xl ${
    aboutMe ? "bg-blue-500 text-white" : "bg-transparent text-black"
  } ${pressedAboutMe ? "bg-blue-700" : ""}`

  const communityTabStyle = `mx-2 py-2 px-5 border rounded-2xl ${
    !aboutMe ? "bg-blue-500 text-white" : "bg-transparent text-black"
  } ${pressedInterests ? "bg-blue-700" : ""}`

  return (
    <View className="flex flex-row justify-center border-b-2 pb-2 mx-7 mt-3">
      <Pressable
        onPress={changeToAboutMeTab}
        onPressIn={() => setAboutMe(true)}
        onPressOut={() => setAboutMe(false)}
        className={`${messageTabStyle}`}
      >
        <Text className="font-bold text-md">About Me</Text>
      </Pressable>

      <Pressable
        onPress={changeToInterestTab}
        onPressIn={() => setInterests(true)}
        onPressOut={() => setInterests(false)}
        className={`${communityTabStyle}`}
      >
        <Text className="font-bold text-md">Interests</Text>
      </Pressable>
    </View>
  )
}

export default Tabs
