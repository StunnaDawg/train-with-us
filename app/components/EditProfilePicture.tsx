import { View, Pressable, ActivityIndicator } from "react-native"
import { Image } from "expo-image"
import * as FileSystem from "expo-file-system"
import React, { useEffect, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { FontAwesome6 } from "@expo/vector-icons"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"
import { decode } from "base64-arraybuffer"
import removeProfilePic from "../supabaseFunctions/deleteFuncs/removeProfilePic"
import updateProfilePic from "../supabaseFunctions/imageFuncs/addProiflePic"
import { MotiView } from "moti"
import { Skeleton } from "moti/skeleton"

type SingleImageProp = {
  imageUrl: string | null | undefined
  imageUrlToRead: string | null | undefined
  setImageUrl: React.Dispatch<React.SetStateAction<string | null | undefined>>
  size?: number
}

const ProfilePicSupa = ({
  size = 120,
  imageUrl,
  imageUrlToRead,
  setImageUrl,
}: SingleImageProp) => {
  const [loading, setLoading] = useState(false)
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const { user } = useAuth()
  const avatarSize = { height: size, width: size }
  const userId = user?.id

  const [image, setImage] = useState<string>("")

  const handlePressIn = () => {
    setIsPressed(true)
  }
  const handlePressOut = () => {
    setIsPressed(false)
  }

  useEffect(() => {
    readImage()
  }, [imageUrl])

  const readImage = () => {
    if (imageUrl === "") return
    console.log("reading", `${imageUrl}`)
    supabase.storage
      .from("photos")
      .download(`${imageUrl}`)
      .then(({ data }) => {
        const fr = new FileReader()
        fr.readAsDataURL(data!)
        fr.onload = () => {
          setImage(fr.result as string)
        }
      })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [9, 16],
      quality: 0,
      allowsEditing: true,
    })

    if (!result.canceled) {
      setLoading(true)
      const img = result.assets[0]
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      })
      const filePath = `${userId}/${new Date().getTime()}.${
        img.type === "image"
      }`
      const contentType = "image/png"
      await supabase.storage.from("photos").upload(filePath, decode(base64), {
        contentType: contentType,
      })

      if (userId === undefined) return
      updateProfilePic(userId, filePath)
      setImageUrl(filePath)
      setImage(img.uri)
      setLoading(false)
    }
  }

  const onRemoveImage = async (itemUrl: string | null | undefined) => {
    if (
      itemUrl === "" ||
      !imageUrlToRead ||
      itemUrl === null ||
      itemUrl === undefined ||
      userId === undefined
    )
      return
    console.log(`${itemUrl}`)
    const { error } = await supabase.storage
      .from("photos")
      .remove([`${itemUrl}`])

    removeProfilePic(userId)

    if (error) {
      console.log("Error removing image")
      return
    }

    setImage("")
  }

  return (
    <View className="flex flex-row justify-center flex-wrap">
      {loading ? (
        <MotiView
          transition={{
            type: "timing",
          }}
        >
          <Skeleton radius={"round"} height={size} width={size} />
        </MotiView>
      ) : image !== "" ? (
        <View>
          <Image
            className="m-1 relative overflow-hidden max-w-full rounded-full bg-gray-800 border-1 border-solid border-gray-200 border-r-10"
            source={{ uri: image }}
            style={{ width: size, height: size }}
          />
          {loading ? <ActivityIndicator /> : null}
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            className={`absolute bottom-0 right-0 ${
              isPressed ? "opacity-50" : "bg-white"
            } text-white p-2 rounded-full m-2`}
            onPress={async () => {
              onRemoveImage(imageUrl)
            }}
          >
            <FontAwesome6 name="x" size={20} color="black" />
          </Pressable>
        </View>
      ) : (
        <View
          className="m-1 relative overflow-hidden max-w-full rounded-full bg-gray-600 border-1 border-solid border-gray-200 border-r-10"
          style={[avatarSize]}
        >
          {loading ? <ActivityIndicator /> : null}
          <Pressable
            onPress={async () => {
              await pickImage()
            }}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            className={`absolute bottom-0 right-0 ${
              isPressed ? "opacity-50" : "bg-white"
            } text-white p-2 rounded-full m-2`}
          >
            <FontAwesome6 name="plus" size={20} color="black" />
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default ProfilePicSupa
