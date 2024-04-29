import { View, Text, Pressable } from "react-native"
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"
import { Feather } from "@expo/vector-icons"
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet"

type ZodiacProp = {
  zodiac: string | undefined | null
}

const Zodiac = ({ zodiac }: ZodiacProp) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { dismiss } = useBottomSheetModal()

  const snapPoints = useMemo(() => ["25%", "40%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const zodiacSigns = [
    { name: "Aries", dates: "March 21 - April 19" },
    { name: "Taurus", dates: "April 20 - May 20" },
    { name: "Gemini", dates: "May 21 - June 20" },
    { name: "Cancer", dates: "June 21 - July 22" },
    { name: "Leo", dates: "July 23 - August 22" },
    { name: "Virgo", dates: "August 23 - September 22" },
    { name: "Libra", dates: "September 23 - October 22" },
    { name: "Scorpio", dates: "October 23 - November 21" },
    { name: "Sagittarius", dates: "November 22 - December 21" },
    { name: "Capricorn", dates: "December 22 - January 19" },
    { name: "Aquarius", dates: "January 20 - February 18" },
    { name: "Pisces", dates: "February 19 - March 20" },
  ]
  return (
    <>
      <View className="mx-2">
        <Text className="font-bold text-xl">Zodiac</Text>
      </View>
      <View>
        <Pressable
          onPress={() => {
            handlePresentModalPress()
          }}
        >
          <View className="flex flex-row justify-between bg-slate-200 h-10 items-center px-2">
            <View className="flex flex-row">
              <Text>{zodiac ? zodiac : "Add Zodiac Sign"}</Text>
            </View>

            <Feather name="arrow-right" size={32} color="black" />
          </View>
        </Pressable>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View className="flex flex-row justify-center my-2 pt-2 border-t">
            <Text className="text-xl font-bold">What is your Zodiac Sign?</Text>
          </View>
          <View className="flex flex-row flex-wrap">
            {zodiacSigns.map((sign) => (
              <Pressable
                key={sign.name}
                className="border-2 rounded-full bg-slate-300 p-2 m-1"
                onPress={async () => {
                  //   setLoading(true)
                  //   await singleValueEdit("user", "zodiac", sign.name)
                  //   setLoading(false)
                  dismiss()
                }}
              >
                <Text className="text-center">{sign.name}</Text>
              </Pressable>
            ))}
          </View>
        </BottomSheetModal>
      </View>
    </>
  )
}

export default Zodiac
