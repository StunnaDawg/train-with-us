import { View, Text, ScrollView } from "react-native"
import React from "react"
import CommunitiesScroll from "./components/CommunitiesScroll"
import Tabs from "./components/Tabs"
import Unread from "./components/Unread"
import Messages from "./components/Messages"

const CommunitiesDash = () => {
  return (
    <ScrollView>
      <View>
        <CommunitiesScroll />
        <View className="mt-5">
          <Tabs />
        </View>
      </View>

      <View>
        <View>
          <Unread />
        </View>

        <View>
          <Messages />
        </View>
      </View>
    </ScrollView>
  )
}

export default CommunitiesDash
