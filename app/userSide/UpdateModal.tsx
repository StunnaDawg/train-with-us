import { View, Text, Pressable, ScrollView } from "react-native"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { BottomSheetModal } from "@gorhom/bottom-sheet"

const UpdateModal = () => {
  const [isPressed, setIsPressed] = useState(false)
  const [sessionsToSend, setSessionsToSend] = useState<string[]>([])

  const handleOnPressIn = () => {
    setIsPressed(true)
  }

  const handleOnPressOut = () => {
    setIsPressed(false)
  }

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["1%", "30%"], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  useEffect(() => {
    handlePresentModalPress()
  }, [])

  return (
    <>
      <BottomSheetModal
        enablePanDownToClose={true}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View>
          <Text>Update Modal</Text>
        </View>
      </BottomSheetModal>
    </>
  )
}

export default UpdateModal
