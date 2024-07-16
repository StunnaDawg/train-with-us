import { Image } from "expo-image"
import { useState, useEffect } from "react"
import { StyleSheet, View } from "react-native"
import supabase from "../../lib/supabase"
import { Skeleton } from "moti/skeleton"

type SinglePicProps = {
  size: number
  item: string | undefined | null
  avatarRadius: number
  noAvatarRadius: number
  skeletonRadius?: any
  showPlaceholder?: boolean
}

export default function SinglePicCommunity({
  size = 150,
  skeletonRadius = "round",
  showPlaceholder = true,
  item,
  avatarRadius,
  noAvatarRadius,
}: SinglePicProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const avatarSize = { height: size, width: size }

  useEffect(() => {
    readImage()
  }, [item])

  const readImage = () => {
    setLoading(true)
    if (item === undefined) {
      setLoading(false)
      return
    }
    console.log("reading ya mom", `${item}`)
    supabase.storage
      .from("photos")
      .download(`${item}`)
      .then(({ data }) => {
        const fr = new FileReader()
        fr.readAsDataURL(data!)
        fr.onload = () => {
          setAvatarUrl(fr.result as string)
          setLoading(false)
        }
      })

      .catch((error) => {
        console.error("Error downloading image:", error)
        setLoading(false)
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
      {loading ? (
        <Skeleton radius={skeletonRadius} height={size} width={size} />
      ) : avatarUrl !== "" ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
          cachePolicy="memory-disk"
        />
      ) : showPlaceholder ? (
        <Image
          source={require("../../assets/images/TWU-Logo.png")}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
          cachePolicy="memory-disk"
        />
      ) : null}
    </View>
  )
}
