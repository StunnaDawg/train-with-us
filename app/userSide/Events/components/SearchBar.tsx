import React from "react"
import { TextInput, View, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

type SearchBarProps = {
  value: string
  onChange: (text: string) => void
  placeholder: string
  onClear?: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder,
  onClear,
  ...props
}) => {
  return (
    <View className="m-2 flex-row items-center bg-gray-100 rounded-full overflow-hidden">
      <View className="p-2">
        <Ionicons name="search" size={20} color="#6B7280" />
      </View>
      <TextInput
        className="flex-1 h-10 text-base text-gray-700"
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        {...props}
      />
      {value.length > 0 && onClear && (
        <TouchableOpacity onPress={onClear} className="p-2">
          <Ionicons name="close-circle" size={20} color="#6B7280" />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default SearchBar
