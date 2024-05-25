import { Image } from "expo-image"
import { useState, useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { FileObject } from "@supabase/storage-js"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"

type SinglePicProps = {
  size: number
  item: string | undefined | null
  avatarRadius: number
  noAvatarRadius: number
}

export default function SinglePicProfileView({
  size = 150,
  item,
  avatarRadius,
  noAvatarRadius,
}: SinglePicProps) {
  const { user } = useAuth()
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const avatarSize = { height: size, width: size }

  useEffect(() => {
    console.log("item", item)
    readImage()
  }, [item])

  const readImage = () => {
    if (item === undefined) return
    console.log("reading ya mom", `${item}`)
    supabase.storage
      .from("photos")
      .download(`${item}`)
      .then(({ data }) => {
        const fr = new FileReader()
        fr.readAsDataURL(data!)
        fr.onload = () => {
          setAvatarUrl(fr.result as string)
        }
      })
  }

  const styles = StyleSheet.create({
    avatar: {
      borderRadius: avatarRadius,
      overflow: "hidden",
      maxWidth: "100%",
    },
    image: {
      objectFit: "cover",
      paddingTop: 0,
    },
    noImage: {
      backgroundColor: "#333",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "rgb(200, 200, 200)",
      borderRadius: noAvatarRadius,
    },
  })

  return (
    <View>
      {avatarUrl !== "" ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
    </View>
  )
}
