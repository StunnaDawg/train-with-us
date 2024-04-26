import { View, Text, ScrollView } from "react-native"
import React, { useState } from "react"
import CommunitiesScroll from "./components/CommunitiesScroll"
import Tabs from "./components/Tabs"
import Unread from "./components/Unread"
import Messages from "./components/Messages"
import CommunitiesUnRead from "./components/CommunitiesUnread"
import CommunitiesRead from "./components/CommunitiesRead"

const CommunitiesDash = () => {
  const [userMessages, setUserMessages] = useState<boolean>(true)

  const changeToCommunity = () => {
    setUserMessages(false)
  }

  const changeToUserMessage = () => {
    setUserMessages(true)
  }
  return (
    <ScrollView>
      <View>
        <CommunitiesScroll />
        <View className="mt-5">
          <Tabs
            changeToCommunityTab={changeToCommunity}
            changeToMessagesTab={changeToUserMessage}
            userMessages={userMessages}
          />
        </View>
      </View>

      {userMessages ? (
        <View>
          <View>
            <Unread />
          </View>

          <View>
            <Messages />
          </View>
        </View>
      ) : (
        <View>
          <View>
            <CommunitiesUnRead />
          </View>

          <View>
            <CommunitiesRead />
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default CommunitiesDash
