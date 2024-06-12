import { View, Text, Pressable } from "react-native"
import { useEffect, useState } from "react"
import { Image } from "expo-image"
import { NavigationType } from "../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import supabase from "../../lib/supabase"

type HeaderProps = {
  title: string | null | undefined
  imageUrl?: string | null | undefined
}

const Header = ({ title, imageUrl }: HeaderProps) => {
  const [image, setImage] = useState<string>("")
  const navigation = useNavigation<NavigationType>()

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

  useEffect(() => {
    if (imageUrl === undefined || imageUrl === null) return
    readImage()
  }, [imageUrl])

  return (
    <View className="flex flex-row items-center">
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          className="m-1 relative overflow-hidden max-w-full rounded-full bg-gray-800 border-1 border-solid border-gray-200 border-r-10"
          source={image ? image : require("../../assets/images/TWU-Logo.png")}
          style={{ width: 50, height: 50 }}
        />
      </Pressable>
      <View className="mx-2">
        <Text className="text-white text-xl font-bold">
          {title ? title : "Community"}
        </Text>
      </View>
    </View>
  )
}

export default Header
