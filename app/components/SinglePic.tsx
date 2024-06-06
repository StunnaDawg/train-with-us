import { Image } from "expo-image"
import { useState, useEffect } from "react"
import { StyleSheet, View, ActivityIndicator } from "react-native"
import supabase from "../../lib/supabase"
import { StatusBar } from "expo-status-bar"

type SinglePicProps = {
  size: number
  item: string | undefined | null
  avatarRadius: number
  noAvatarRadius: number
}

export default function SinglePic({
  size = 150,
  item,
  avatarRadius,
  noAvatarRadius,
}: SinglePicProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>()
  const avatarSize = { height: size, width: size }

  useEffect(() => {
    readImage()
  }, [item])

  const readImage = () => {
    if (item === undefined) return
    setLoading(true)
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
    loader: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: [{ translateX: -15 }, { translateY: -15 }],
    },
  })
  {
    /* <ActivityIndicator size="large" color="black" style={styles.loader} /> */
  }
  return (
    <View style={avatarSize}>
      {loading && (
        <ActivityIndicator size="large" color="black" style={styles.loader} />
      )}
      {!loading && avatarUrl !== "" ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
          cachePolicy={"memory-disk"}
        />
      ) : null}
    </View>
  )
}
