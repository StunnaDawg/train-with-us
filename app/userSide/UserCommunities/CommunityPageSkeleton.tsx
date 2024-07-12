import { View, Text } from "react-native"
import React from "react"
import { MotiView, SafeAreaView } from "moti"
import { Skeleton } from "moti/skeleton"
import Spacer from "../../components/Spacer"

const CommunityPageSkeleton = () => {
  const colorMode = "dark"
  return (
    <SafeAreaView className="flex-1">
      <MotiView
        transition={{
          type: "timing",
        }}
        className="items-center mx-3 flex flex-row justify-center"
      >
        <View className="items-center">
          <Spacer height={32} />
          <Skeleton colorMode={colorMode} height={30} width={"100%"} />
          <Spacer height={8} />
          <Skeleton colorMode={colorMode} height={65} width={"75%"} />
          <Spacer height={8} />
          <Skeleton colorMode={colorMode} height={65} width={"75%"} />
          <Spacer height={8} />
          <Skeleton colorMode={colorMode} height={65} width={"75%"} />
          <Spacer height={32} />

          <Skeleton colorMode={colorMode} height={65} width={"75%"} />
          <Spacer height={8} />
          <Skeleton colorMode={colorMode} height={65} width={"75%"} />
          <Spacer height={8} />
          <Skeleton colorMode={colorMode} height={65} width={"75%"} />
          <Spacer height={8} />
        </View>
      </MotiView>
    </SafeAreaView>
  )
}

export default CommunityPageSkeleton
