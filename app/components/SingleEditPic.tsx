import { View, Text, Button, Pressable } from "react-native"
import { Image } from "expo-image"
import * as FileSystem from "expo-file-system"
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
  listIndex: number
  files: FileObject[]
  setFiles: React.Dispatch<React.SetStateAction<FileObject[]>>
}

const SingleEditPic = ({
  item,
  listIndex,
  files,
  setFiles,
}: SingleImageProp) => {
  const { user } = useAuth()
  const avatarSize = { height: 150, width: 150 }
  const userId = user?.id

  const [image, setImage] = useState<string>("")

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
    }
  }

  const onRemoveImage = async (item: FileObject, listIndex: number) => {
    console.log(`${userId}/${item.name}`)
    const { data, error } = await supabase.storage
      .from("photos")
      .remove([`${userId}/${item.name}`])

    if (error) {
      console.log("Error removing image")
      return
    }

    const newFiles = [...files]
    newFiles.splice(listIndex, 1)
    setFiles(newFiles)

    console.log(newFiles)
    console.log("Removed Image")
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
              onRemoveImage(item, listIndex)
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

export default SingleEditPic
