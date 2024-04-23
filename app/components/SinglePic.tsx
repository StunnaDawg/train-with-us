import { Image } from "expo-image"
import { useState, useEffect } from "react"
import { StyleSheet, View } from "react-native"

type SinglePicProps = {
  id?: string
  size: number
  picNumber: number
  avatarRadius: number
  noAvatarRadius: number
}

export default function SinglePic({
  size = 150,
  picNumber,
  avatarRadius,
  noAvatarRadius,
}: SinglePicProps) {
  const [avatarUrl, setAvatarUrl] = useState<string[]>(["", ""])
  const avatarSize = { height: size, width: size }

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
      {avatarUrl[picNumber] !== "" ? (
        <Image
          source={{ uri: avatarUrl[picNumber] }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
    </View>
  )
}
