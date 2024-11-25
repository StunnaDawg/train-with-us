import { Image } from "expo-image"
import { useState, useEffect } from "react"
import { StyleSheet, View, ActivityIndicator, Dimensions } from "react-native"
import supabase from "../../../../lib/supabase"
import { Skeleton } from "moti/skeleton"
import { cacheStorage } from "../../../utilFunctions/mmkvStorage"

type SinglePicProps = {
  height: number
  width: number
  item: string | undefined | null
  avatarRadius: number
  noAvatarRadius: number
}

export default function EventCoverPic({
  height,
  width,
  item,
  avatarRadius,
  noAvatarRadius,
}: SinglePicProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>()
  const avatarSize = { height: height, width: width }

  useEffect(() => {
    readImage()
  }, [item])

  const readImage = async () => {
    if (item === undefined) return
    setLoading(true)
    const cacheKey = `image:${item}`
    const cachedImage = cacheStorage.getString(cacheKey)

    if (cachedImage) {
      setAvatarUrl(cachedImage)
      setLoading(false)
      return
    }

    try {
      supabase.storage
        .from("photos")
        .download(`${item}`)
        .then(({ data }) => {
          const fr = new FileReader()
          fr.readAsDataURL(data!)
          fr.onload = () => {
            const base64 = fr.result as string
            setAvatarUrl(base64)
            cacheStorage.set(cacheKey, base64)
          }
        })
        .catch((error) => {
          console.error("Error downloading image:", error)
          setLoading(false)
        })
    } catch (error) {
      console.error("Error downloading image:", error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const styles = StyleSheet.create({
    avatar: {
      borderRadius: avatarRadius,
      overflow: "hidden",
      maxWidth: width,
    },
    image: {
      objectFit: "cover",
      paddingTop: 0,
      overflow: "hidden",
      maxWidth: width,
    },
    noImage: {
      backgroundColor: "#333",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "rgb(200, 200, 200)",
      borderRadius: noAvatarRadius,
      maxWidth: "100%",
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
    <View
      className="flex flex-row justify-center items-center"
      style={avatarSize}
    >
      {loading && (
        <Skeleton colorMode={"dark"} radius={0} height={height} width={width} />
      )}
      {!loading && avatarUrl !== "" ? (
        <View>
          <Image
            className="rounded-xl"
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar"
            style={[avatarSize, styles.avatar, styles.image]}
            cachePolicy={"memory-disk"}
          />
        </View>
      ) : null}
    </View>
  )
}
