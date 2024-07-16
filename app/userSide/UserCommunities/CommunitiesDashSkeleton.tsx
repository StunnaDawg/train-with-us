import { View, Text } from "react-native"
import React from "react"
import { MotiView, SafeAreaView } from "moti"
import { Skeleton } from "moti/skeleton"
import Spacer from "../../components/Spacer"

const CommunitiesDashSkeleton = () => {
  const colorMode = "dark"
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      className="pb-96 bg-primary-900 items-center flex flex-row justify-between w-full"
    >
      <View className="flex flex-row">
        <View className="mr-6">
          <Skeleton
            radius="round"
            colorMode={colorMode}
            height={72}
            width={72}
          />
          <Spacer height={8} />
          <Skeleton
            radius="round"
            colorMode={colorMode}
            height={72}
            width={72}
          />
          <Spacer height={8} />
          <Skeleton
            radius="round"
            colorMode={colorMode}
            height={72}
            width={72}
          />
          <Spacer height={8} />
          <Skeleton
            radius="round"
            colorMode={colorMode}
            height={72}
            width={72}
          />
          <Spacer height={8} />
          <Skeleton
            radius="round"
            colorMode={colorMode}
            height={72}
            width={72}
          />
          <Spacer height={8} />
        </View>

        <View>
          <Skeleton colorMode={colorMode} height={40} width={250} />
          <Spacer height={8} />
          <Skeleton colorMode={colorMode} height={40} width={250} />
          <Spacer height={8} />
          <Skeleton colorMode={colorMode} height={40} width={250} />
          <Spacer height={8} />
          <Skeleton colorMode={colorMode} height={40} width={250} />
          <Spacer height={8} />
          <Skeleton colorMode={colorMode} height={40} width={250} />
          <Spacer height={8} />
        </View>
      </View>
    </MotiView>
  )
}

export default CommunitiesDashSkeleton
