import React from "react"
import { Pressable, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"

type EditProfileTopBarProps = {
  text: string
  onSave: () => void
  onCancel?: () => void
  cancelText?: string
  saveText?: string
  showSaveButton?: boolean
  customLeftComponent?: React.ReactNode
  customRightComponent?: React.ReactNode
  backgroundColor?: string
  primaryTextColor?: string
}

const EditProfileTopBar = ({
  text,
  onSave,
  onCancel,
  cancelText = "Cancel",
  saveText = "Save",
  showSaveButton = true,
  customLeftComponent,
  customRightComponent,
  backgroundColor = "bg-white",
  primaryTextColor = "text-white",
}: EditProfileTopBarProps) => {
  const navigation = useNavigation<NavigationType>()

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      navigation.goBack()
    }
  }

  return (
    <View
      className={`flex flex-row justify-between items-center border-b border-slate-300 p-4 ${backgroundColor}`}
    >
      {customLeftComponent || (
        <TouchableOpacity onPress={handleCancel}>
          <Text className="text-sm font-semibold text-blue-500">
            {cancelText}
          </Text>
        </TouchableOpacity>
      )}
      <Text className={`font-bold text-lg text-center ${primaryTextColor}`}>
        {text}
      </Text>
      {customRightComponent ||
        (showSaveButton ? (
          <TouchableOpacity onPress={onSave}>
            <Text className="text-sm font-semibold text-blue-500">
              {saveText}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 50 }} /> // Placeholder for alignment
        ))}
    </View>
  )
}

export default EditProfileTopBar
