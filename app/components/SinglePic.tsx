import { Image } from "expo-image"
import { useState, useEffect } from "react"
import { StyleSheet, View, ActivityIndicator } from "react-native"
import supabase from "../../lib/supabase"
import { Skeleton } from "moti/skeleton"
import { Cache } from "../utilFunctions/cacheImage"

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
  const [loading, setLoading] = useState<boolean>(true)
  const avatarSize = { height: size, width: size }

  useEffect(() => {
    if (item) {
      Cache.get(item, fetchAndCacheImage)
    }
  }, [item])

  const fetchAndCacheImage = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("photos")
        .download(item!)
      if (error) throw error

      const fr = new FileReader()
      fr.readAsDataURL(data!)
      fr.onload = () => {
        const url = fr.result as string
        Cache.set(item!, url) // Cache the image URL
        setAvatarUrl(url)
        setLoading(false)
      }
    } catch (error) {
      console.error("Error downloading image:", error)
      setLoading(false)
    }
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

  return (
    <View style={avatarSize}>
      {loading && <Skeleton height={size} width={size} radius="round" />}
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
