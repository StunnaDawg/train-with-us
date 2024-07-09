import { View, Text } from "react-native"
import React from "react"
import { MotiView } from "moti"
import { Skeleton } from "moti/skeleton"
import Spacer from "../../../components/Spacer"

const EditProfileSkeleton = () => {
  const colorMode = "dark"
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      className="items-center mx-3 flex flex-row justify-center"
    >
      <View className="items-center">
        <Skeleton
          colorMode={colorMode}
          radius="round"
          height={120}
          width={120}
        />
        <Spacer />
        <View className="flex flex-row justify-center items-center">
          <View className="my-1">
            <Skeleton colorMode={colorMode} height={120} width={120} />
          </View>
          <View className="m-1">
            <Skeleton colorMode={colorMode} height={120} width={120} />
          </View>
          <View className="my-1">
            <Skeleton colorMode={colorMode} height={120} width={120} />
          </View>
        </View>
        <View className="flex flex-row justify-center">
          <View className="my-1">
            <Skeleton colorMode={colorMode} height={120} width={120} />
          </View>
          <View className="m-1">
            <Skeleton colorMode={colorMode} height={120} width={120} />
          </View>
          <View className="my-1">
            <Skeleton colorMode={colorMode} height={120} width={120} />
          </View>
        </View>
      </View>
    </MotiView>
  )
}

export default EditProfileSkeleton
