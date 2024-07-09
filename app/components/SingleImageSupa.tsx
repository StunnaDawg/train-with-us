import { View, Text, Button, Pressable, ActivityIndicator } from "react-native"
import { Image } from "expo-image"
import * as FileSystem from "expo-file-system"
import React, { useEffect, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { FontAwesome6 } from "@expo/vector-icons"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"
import { decode } from "base64-arraybuffer"
import { Profile } from "../@types/supabaseTypes"
import useCurrentUser from "../supabaseFunctions/getFuncs/useCurrentUser"
import removePhoto from "../supabaseFunctions/deleteFuncs/removePhoto"
import insertProfilePhoto from "../supabaseFunctions/updateFuncs/insertProfilePhotos"
import { Skeleton } from "moti/skeleton"
import { set } from "mongoose"
import { se } from "date-fns/locale"
import { MotiView } from "moti"

type SingleImageProp = {
  imageUrl: string | null | undefined
  listIndex: number
  imageUrls: string[] | null | undefined
  setImageUrls: React.Dispatch<
    React.SetStateAction<string[] | null | undefined>
  >
  size?: number
}

const SingleImageSupa = ({
  imageUrl,
  listIndex,
  imageUrls,
  setImageUrls,
  size = 150,
}: SingleImageProp) => {
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const { user } = useAuth()
  const avatarSize = { height: size, width: size }
  const userId = user?.id
  let profileType: Profile
  const [image, setImage] = useState<string>("")

  useEffect(() => {
    readImage()
    setLoading(false)
  }, [imageUrl])

  useEffect(() => {
    if (userId === undefined) return
    useCurrentUser(userId, setCurrentUser)
  }, [])

  const readImage = () => {
    setLoading(true)
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
      quality: 1,
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
      insertProfilePhoto(setLoading, filePath, userId)
      setImage(img.uri)
      setLoading(false)
    }
  }

  const onRemoveImage = async (
    itemUrl: string | null | undefined,
    listIndex: number
  ) => {
    if (
      itemUrl === "" ||
      !imageUrls ||
      itemUrl === null ||
      itemUrl === undefined
    )
      return
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

    const newFiles = [...imageUrls]
    newFiles.splice(listIndex, 1)
    setImageUrls(newFiles)

    console.log(newFiles)
    console.log("Removed Image")
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
            className="absolute bottom-0 right-0 bg-white text-white p-2 rounded-full hover:bg-blue-800 m-2"
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
            onPress={async () => {
              await pickImage()
              //   await uploadImage(image, "image", image + id, submitNewUserPhotos)
            }}
            className="absolute bottom-0 right-0 bg-white text-white p-2 rounded-full hover:bg-blue-800 m-2"
          >
            <FontAwesome6 name="plus" size={20} color="black" />
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default SingleImageSupa
