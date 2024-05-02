import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { TabNavigationType } from "../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import supabase from "../../lib/supabase"
import getUserId from "../supabaseFunctions/getFuncs/getUserId"

const Question4 = () => {
  const [currentId, setCurrentId] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<TabNavigationType>()

  useEffect(() => {
    getUserId(setCurrentId)
  }, [])

  const finishOnBoard = async () => {
    setLoading(true)
    if (currentId === "") return
    const { error } = await supabase
      .from("profiles")
      .update({ onboard: true })
      .eq("id", currentId)

    if (error) {
      console.log("Error updating onBoard status", error)
    }
    setLoading(false)
    throw Error("Error updating onBoard status")
  }
  return (
    <View className="flex flex-1 justify-center">
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <>
          <View className="flex flex-row justify-center">
            <Pressable onPress={async () => await finishOnBoard()}>
              <Text className="font-bold text-3xl text-center">Press Me</Text>
              <Text className="font-semibold text-lg">
                Now restart the app... IDK how to fix this yet
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  )
}

export default Question4
