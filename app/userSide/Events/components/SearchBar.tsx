import React from "react"
import { TextInput, View } from "react-native"

type SearchBarProps = {
  value: string
  onChange: (text: string) => void
  placeholder: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <View className="m-4">
      <TextInput
        className="bg-white h-12 border border-gray-300 rounded-lg text-xl px-4"
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        autoCapitalize="none"
        {...props}
      />
    </View>
  )
}

export default SearchBar
