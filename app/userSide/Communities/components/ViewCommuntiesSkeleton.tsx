import { View, Text } from "react-native"
import React from "react"
import { MotiView } from "moti"
import { Skeleton } from "moti/skeleton"
import Spacer from "../../../components/Spacer"

const ViewCommuntiesSkeleton = () => {
  const colorMode = "dark"
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      className="items-center mx-3 flex flex-row justify-center"
      animate={{ backgroundColor: "#07182d" }}
    >
      <View className="items-center">
        <Skeleton colorMode={colorMode} height={65} width={"100%"} />
        <Spacer height={8} />
        <View className="flex flex-row">
          <View className="mx-2">
            <Skeleton
              colorMode={colorMode}
              radius="square"
              height={150}
              width={150}
            />
          </View>
          <View className="mx-1">
            <Skeleton
              colorMode={colorMode}
              radius="square"
              height={150}
              width={150}
            />
          </View>
          <View className="mx-2">
            <Skeleton
              colorMode={colorMode}
              radius="square"
              height={150}
              width={150}
            />
          </View>
        </View>
        <Spacer />
        <Skeleton colorMode={colorMode} height={65} width={"100%"} />
        <Spacer height={32} />
        <View className="flex flex-row">
          <View className="mx-2">
            <Skeleton
              colorMode={colorMode}
              radius="square"
              height={150}
              width={150}
            />
          </View>
          <View className="mx-1">
            <Skeleton
              colorMode={colorMode}
              radius="square"
              height={150}
              width={150}
            />
          </View>
          <View className="mx-2">
            <Skeleton
              colorMode={colorMode}
              radius="square"
              height={150}
              width={150}
            />
          </View>
        </View>
      </View>
    </MotiView>
  )
}

export default ViewCommuntiesSkeleton
