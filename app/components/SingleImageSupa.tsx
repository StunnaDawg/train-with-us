import { View, Pressable, ActivityIndicator } from "react-native"
import { Image } from "expo-image"
import * as FileSystem from "expo-file-system"
import React, { useEffect, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { FontAwesome6 } from "@expo/vector-icons"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"
import { decode } from "base64-arraybuffer"
import removePhoto from "../supabaseFunctions/deleteFuncs/removePhoto"
import insertProfilePhoto from "../supabaseFunctions/updateFuncs/insertProfilePhotos"
import { Skeleton } from "moti/skeleton"
import { MotiView } from "moti"
import { ca } from "date-fns/locale"
import { cacheStorage } from "../utilFunctions/mmkvStorage"
import showAlert from "../utilFunctions/showAlert"

type SingleImageProp = {
  imageUrl: string | null
  listIndex: number
  size?: number
}

const SingleImageSupa = ({
  imageUrl,
  listIndex,
  size = 150,
}: SingleImageProp) => {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const avatarSize = { height: size, width: size }
  const userId = user?.id
  const [image, setImage] = useState<string>("")
  const [isPressed, setIsPressed] = useState<boolean>(false)

  const handlePressIn = () => {
    setIsPressed(true)
  }
  const handlePressOut = () => {
    setIsPressed(false)
  }

  useEffect(() => {
    readImage()
    setLoading(false)
  }, [imageUrl])

  const readImage = async () => {
    setLoading(true)
    if (imageUrl === "") return
    const cacheKey = `image:${imageUrl}`
    const cachedImage = cacheStorage.getString(cacheKey)

    if (cachedImage) {
      setImage(cachedImage)
      setLoading(false)
      return
    }

    try {
      supabase.storage
        .from("photos")
        .download(`${imageUrl}`)
        .then(({ data }) => {
          const fr = new FileReader()
          fr.readAsDataURL(data!)
          fr.onload = () => {
            const img = fr.result as string
            setImage(img)
            cacheStorage.set(cacheKey, img)
          }
        })
    } catch (error) {
      console.log("Error reading image", error)
    } finally {
      setLoading(false)
    }
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
      const { error } = await supabase.storage
        .from("photos")
        .upload(filePath, decode(base64), {
          contentType: contentType,
        })

      if (error) {
        console.log("Error uploading image", error)
        showAlert({
          title: "Error",
          message: `Error uploading image ${error}`,
        })
        return
      }

      if (userId === undefined) return
      insertProfilePhoto(setLoading, filePath, userId)
      setImage(img.uri)
      setLoading(false)
    }
  }

  const onRemoveImage = async (
    itemUrl: string | null | undefined,
    listIndex: number
  ) => {
    if (itemUrl === "" || itemUrl === null || itemUrl === undefined) return
    console.log(`${itemUrl}`)
    const { error } = await supabase.storage
      .from("photos")
      .remove([`${itemUrl}`])

    removePhoto(itemUrl, userId!)

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
          <Skeleton height={size} width={size} />
        </MotiView>
      ) : image !== "" ? (
        <View>
          <Image
            className="m-1 relative overflow-hidden max-w-full rounded-lg bg-gray-800 border-1 border-solid border-gray-200 border-r-10"
            source={{ uri: image }}
            style={{ width: size, height: size }}
            cachePolicy="memory-disk"
          />
          {loading ? <ActivityIndicator /> : null}
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            className={`absolute bottom-0 right-0 ${
              isPressed ? "opacity-50" : "bg-white"
            } text-white p-2 rounded-full m-2`}
            onPress={async () => {
              onRemoveImage(imageUrl, listIndex)
            }}
          >
            <FontAwesome6 name="x" size={20} color="black" />
          </Pressable>
        </View>
      ) : (
        <View
          className="m-1 relative overflow-hidden max-w-full rounded-lg bg-gray-600 border-1 border-solid border-gray-200 border-r-10"
          style={[avatarSize]}
        >
          {loading ? <ActivityIndicator /> : null}
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={async () => {
              await pickImage()
              //   await uploadImage(image, "image", image + id, submitNewUserPhotos)
            }}
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

export default SingleImageSupa
