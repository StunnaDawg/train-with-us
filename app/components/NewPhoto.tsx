import React, { useState } from "react"
import { View, Text, Pressable, Image } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { useAuth } from "../supabaseFunctions/authcontext"
import supabase from "../../lib/supabase"
import { decode } from "base64-arraybuffer"
import { FontAwesome6 } from "@expo/vector-icons"

type NewPhotoProps = {
  type: string
}

const NewPhoto = ({ type }: NewPhotoProps) => {
  const { user } = useAuth()
  const userId = user?.id
  const avatarSize = { height: 150, width: 150 }

  const [imageUri, setImageUri] = useState("")

  const readImage = (file: string) => {
    supabase.storage
      .from("photos")
      .download(`${file}`)
      .then(({ data }) => {
        const fr = new FileReader()
        fr.readAsDataURL(data!)
        fr.onload = () => {
          setImageUri(fr.result as string)
        }
      })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: false,
      selectionLimit: 1,
    })

    if (!result.canceled && result.assets) {
      const img = result.assets[0]
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      })
      const filePath = `${userId}/${type}/${new Date().getTime()}.${img.uri
        .split(".")
        .pop()}`

      const { error } = await supabase.storage
        .from("photos")
        .upload(filePath, decode(base64), {
          contentType: `image/${img.uri.split(".").pop()}`,
        })

      if (error) {
        console.log("Error uploading image:", error.message)
        return
      }

      readImage(filePath)
    }
  }

  const onRemoveImage = async () => {
    const filePath = imageUri.split("/").pop()
    if (!filePath) return

    const { error } = await supabase.storage.from("photos").remove([filePath])
    if (error) {
      console.log("Error removing image:", error.message)
    } else {
      setImageUri("") // Clear image URI on successful removal
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
              onRemoveImage()
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
