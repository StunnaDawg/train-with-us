import { View, Text, Dimensions, Platform } from "react-native"
import React from "react"
import { MotiView } from "moti"
import { Skeleton } from "moti/skeleton"

const CardSkeleton = () => {
  const colorMode = "dark"
  const screenHeight = Dimensions.get("window").height
  const cardHeight = Platform.OS == "android" ? screenHeight * 0.75 : 600
  return (
    <View className="flex-1 mx-5" style={{ height: cardHeight }}>
      <MotiView
        transition={{
          type: "timing",
        }}
        className="items-center mx-3 flex flex-row justify-center"
        animate={{ backgroundColor: "#07182d" }}
      >
        <Skeleton colorMode={colorMode} height={500} width={"100%"} />
      </MotiView>
    </View>
  )
}

export default CardSkeleton
