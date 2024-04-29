import { View, Text, Button, Pressable } from "react-native"
import { Image } from "expo-image"
import React, { useEffect, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { FontAwesome6 } from "@expo/vector-icons"
import supabase from "../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import { useAuth } from "../supabaseFunctions/authcontext"
import { decode } from "base64-arraybuffer"
import uploadImage from "../supabaseFunctions/imageFuncs/uploadImage"
import { set } from "date-fns"
import updateUserPhotos from "../supabaseFunctions/imageFuncs/updateUserPhotos"

type SingleImageProp = {
  item: FileObject
}

const SingleEditPic = ({ item }: SingleImageProp) => {
  const { user } = useAuth()
  const avatarSize = { height: 150, width: 150 }
  const userId = user?.id

  const [image, setImage] = useState<string>("")

  const getUniqueFilename = (userId: string | undefined) => {
    if (userId === undefined) throw new Error("User ID is undefined")
    const timestamp = new Date().getTime()
    const fileExtension = "userPhoto".split(".").pop()
    return `${userId}_${timestamp}.${fileExtension}`
  }

  useEffect(() => {
    readImage()
  }, [item])

  const readImage = () => {
    if (item === undefined) return
    supabase.storage
      .from("photos")
      .download(`${user?.id}/${item.name}`)
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
      allowsMultipleSelection: true,
      selectionLimit: 6,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      await uploadImage(
        result.assets[0].uri,
        getUniqueFilename(userId),
        setImage
      )
      updateUserPhotos(user?.id, image)
    }
  }

  return (
    <View className="flex flex-row justify-center flex-wrap">
      {image !== "" ? (
        <View>
          <Image
            className="m-1 relative overflow-hidden max-w-full rounded-lg bg-gray-800 border-1 border-solid border-gray-200 border-r-10"
            source={{ uri: image }}
            style={{ width: 150, height: 150 }}
          />
          <Pressable
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded hover:bg-blue-800 m-2"
            onPress={async () => {
              //   await pickImage()
              //   await deleteImage(image)
              //   await deletePhotoFromFireStore(image)
              //   await uploadImage(image, "image", image + id, submitNewUserPhotos)
            }}
          >
            <FontAwesome6 name="circle-plus" size={24} color="black" />
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

export default SingleEditPic
