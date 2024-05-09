import React, { useState } from "react"
import { View, Text, Pressable, Image } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useAuth } from "../supabaseFunctions/authcontext"
import { FontAwesome6 } from "@expo/vector-icons"

type NewPhotoProps = {
  setProfilePic: React.Dispatch<
    React.SetStateAction<ImagePicker.ImagePickerAsset>
  >
}

const NewPhoto = ({ setProfilePic }: NewPhotoProps) => {
  const { user } = useAuth()
  const userId = user?.id
  const avatarSize = { height: 150, width: 150 }

  const [imageUri, setImageUri] = useState("")

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      selectionLimit: 1,
    })

    if (!result.canceled && result.assets) {
      const img = result.assets[0]
      setImageUri(img.uri)
      setProfilePic(img)
    }
  }

  return (
    <View className="flex flex-row justify-center flex-wrap">
      {imageUri !== "" ? (
        <View>
          <Image
            className="m-1 relative overflow-hidden max-w-full rounded-lg bg-gray-800 "
            source={{ uri: imageUri }}
            style={{ width: 150, height: 150 }}
          />
          <Pressable
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded hover:bg-blue-800 m-2"
            onPress={async () => {
              await pickImage()
            }}
          >
            <FontAwesome6 name="trash" size={24} color="black" />
          </Pressable>
        </View>
      ) : (
        <View
          className="m-1 relative overflow-hidden max-w-full rounded-lg bg-gray-600 border-1 border-solid border-gray-200 border-r-10"
          style={[avatarSize]}
        >
          <Pressable
            onPress={async () => {
              await pickImage()
              //   await uploadImage(image, "image", image + id, submitNewUserPhotos)
            }}
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded hover:bg-blue-800 m-2"
          >
            <FontAwesome6 name="circle-plus" size={24} color="black" />
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default NewPhoto
