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
import removeProfilePic from "../supabaseFunctions/deleteFuncs/removeProfilePic"
import updateProfilePic from "../supabaseFunctions/imageFuncs/addProiflePic"
import updateCommunityOrEventProfilePic from "../supabaseFunctions/imageFuncs/addComunityOrEventProfilePic"
import removeCommunityOrEventProfilePic from "../supabaseFunctions/deleteFuncs/removeCommunityOrEventProfilePic"

type SingleImageProp = {
  imageUrl: string | null | undefined
  imageUrlToRead: string | null | undefined
  setImageUrl: React.Dispatch<React.SetStateAction<string | null | undefined>>
  eventId: number
}

const EventCoverPhotoEdit = ({
  imageUrl,
  imageUrlToRead,
  setImageUrl,
  eventId,
}: SingleImageProp) => {
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const { user } = useAuth()
  const avatarSize = { height: 150, width: 150 }
  const userId = user?.id

  const [image, setImage] = useState<string>("")

  useEffect(() => {
    readImage()
  }, [imageUrl])

  useEffect(() => {
    if (userId === undefined) return
    useCurrentUser(userId, setCurrentUser)
  }, [])

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
      quality: 1,
      allowsEditing: true,
    })

    if (!result.canceled) {
      const img = result.assets[0]
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      })
      const filePath = `${userId}/events/${new Date().getTime()}.${
        img.type === "image"
      }`
      const contentType = "image/png"
      await supabase.storage.from("photos").upload(filePath, decode(base64), {
        contentType: contentType,
      })

      if (userId === undefined) return
      updateCommunityOrEventProfilePic(
        eventId,
        filePath,
        "events",
        "event_cover_photo"
      )
      setImageUrl(filePath)
      setImage(img.uri)
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

    removeCommunityOrEventProfilePic(eventId, "events", "event_cover_photo")

    if (error) {
      console.log("Error removing image")
      return
    }

    setImage("")
  }

  return (
    <View className="flex flex-row justify-center flex-wrap">
      {image !== "" ? (
        <View>
          <Image
            className="m-1 relative overflow-hidden max-w-full rounded-full bg-gray-800 border-1 border-solid border-gray-200 border-r-10"
            source={{ uri: image }}
            style={{ width: 150, height: 150 }}
          />
          {loading ? <ActivityIndicator /> : null}
          <Pressable
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded hover:bg-blue-800 m-2"
            onPress={async () => {
              onRemoveImage(imageUrl)
            }}
          >
            <FontAwesome6 name="trash" size={24} color="black" />
          </Pressable>
        </View>
      ) : (
        <View
          className="m-1 relative overflow-hidden max-w-full rounded-2xl bg-gray-600 border-1 border-solid border-gray-200 border-r-10"
          style={[avatarSize]}
        >
          {loading ? <ActivityIndicator /> : null}
          <Pressable
            onPress={async () => {
              await pickImage()
              //   await uploadImage(image, "image", image + id, submitNewUserPhotos)
            }}
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded hover:bg-blue-800 m-2"
          >
            <FontAwesome6 name="circle-plus" size={24} color="blue" />
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default EventCoverPhotoEdit
