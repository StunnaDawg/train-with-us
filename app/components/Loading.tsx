import { View, ActivityIndicator } from "react-native"
import React from "react"

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // Semi-transparent background
        position: "absolute", // Ensure it covers the entire screen
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  )
}

export default Loading
