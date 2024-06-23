import { View, ActivityIndicator } from "react-native"
import React from "react"

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
      {/* Optional: added color for visibility */}
    </View>
  )
}

export default Loading
