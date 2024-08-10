import { View, Text } from "react-native"
import React from "react"
import { MotiView, SafeAreaView } from "moti"
import { Skeleton } from "moti/skeleton"
import Spacer from "../../../components/Spacer"

const MessageSkeleton = () => {
  const colorMode = "dark"
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      className="pb-96 items-center flex flex-row justify-between w-full"
    >
      <View className="flex-1 flex-row  justify-center">
        <View>
          <View className="flex flex-row justify-center items-center">
            <View className="mx-1">
              <Skeleton
                radius={100}
                colorMode={colorMode}
                height={50}
                width={50}
              />
            </View>
            <View className="mx-1">
              <Skeleton colorMode={colorMode} height={40} width={"85%"} />
            </View>
          </View>
          <Spacer height={8} />
          <View className="flex flex-row justify-center items-center">
            <View className="mx-1">
              <Skeleton
                radius={100}
                colorMode={colorMode}
                height={50}
                width={50}
              />
            </View>
            <View className="mx-1">
              <Skeleton colorMode={colorMode} height={40} width={"85%"} />
            </View>
          </View>
          <Spacer height={8} />
          <View className="flex flex-row justify-center items-center">
            <View className="mx-1">
              <Skeleton
                radius={100}
                colorMode={colorMode}
                height={50}
                width={50}
              />
            </View>
            <View className="mx-1">
              <Skeleton colorMode={colorMode} height={40} width={"85%"} />
            </View>
          </View>
          <Spacer height={8} />
          <View className="flex flex-row justify-start items-center">
            <View className="mx-1">
              <Skeleton
                radius={100}
                colorMode={colorMode}
                height={50}
                width={50}
              />
            </View>
            <View className="mx-1">
              <Skeleton colorMode={colorMode} height={150} width={"65%"} />
            </View>
          </View>
          <Spacer height={8} />
          <View className="flex flex-row justify-center items-center">
            <View className="mx-1">
              <Skeleton
                radius={100}
                colorMode={colorMode}
                height={50}
                width={50}
              />
            </View>
            <View className="mx-1">
              <Skeleton colorMode={colorMode} height={40} width={"85%"} />
            </View>
          </View>
          <Spacer height={8} />
          <View className="flex flex-row justify-center items-center">
            <View className="mx-1">
              <Skeleton
                radius={100}
                colorMode={colorMode}
                height={50}
                width={50}
              />
            </View>
            <View className="mx-1">
              <Skeleton colorMode={colorMode} height={40} width={"85%"} />
            </View>
          </View>
          <Spacer height={8} />
          <View className="flex flex-row justify-center items-center">
            <View className="mx-1">
              <Skeleton
                radius={100}
                colorMode={colorMode}
                height={50}
                width={50}
              />
            </View>
            <View className="mx-1">
              <Skeleton colorMode={colorMode} height={40} width={"85%"} />
            </View>
          </View>
          <Spacer height={8} />
          <View className="flex flex-row justify-center items-center">
            <View className="mx-1">
              <Skeleton
                radius={100}
                colorMode={colorMode}
                height={50}
                width={50}
              />
            </View>
            <View className="mx-1">
              <Skeleton colorMode={colorMode} height={40} width={"85%"} />
            </View>
          </View>
          <Spacer height={8} />
        </View>
      </View>
    </MotiView>
  )
}

export default MessageSkeleton
