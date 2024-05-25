import React, { useState } from "react"
import { View, Text, Pressable } from "react-native"

type TabsProps = {
  changeToCommunityTab: () => void
  changeToMessagesTab: () => void
  userMessages: boolean
}

const Tabs = ({
  changeToCommunityTab,
  changeToMessagesTab,
  userMessages,
}: TabsProps) => {
  const [pressedMsg, setPressedMsg] = useState(false)
  const [pressedComm, setPressedComm] = useState(false)

  const messageTabStyle = `mx-2 p-1 px-4 border rounded-full ${
    userMessages ? "bg-blue-500 text-white" : "bg-white text-black"
  } ${pressedMsg ? "bg-white" : ""}`

  const communityTabStyle = `mx-2 p-1 px-4 border rounded-full ${
    !userMessages ? "bg-blue-500 text-white" : "bg-white text-black"
  } ${pressedComm ? "bg-white" : ""}`

  return (
    <View className="flex flex-row justify-center">
      <Pressable
        onPress={changeToMessagesTab}
        onPressIn={() => setPressedMsg(true)}
        onPressOut={() => setPressedMsg(false)}
        className={messageTabStyle}
      >
        <Text className="font-bold text-md">My Messages</Text>
      </Pressable>

      <Pressable
        onPress={changeToCommunityTab}
        onPressIn={() => setPressedComm(true)}
        onPressOut={() => setPressedComm(false)}
        className={communityTabStyle}
      >
        <Text className="font-bold text-md">Communities</Text>
      </Pressable>
    </View>
  )
}

export default Tabs
