import { View, Text, ScrollView, Pressable } from "react-native"
import React, { useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useEffect } from "react"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { Profile } from "../../../@types/supabaseTypes"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import { Image } from "expo-image"
import { StyleSheet } from "react-native"

type PhotoArrayProps = {
  profileId: string | null | undefined
  index1: number
  index2: number
  index3: number
}

const PhotoArray = ({ profileId, index1, index2, index3 }: PhotoArrayProps) => {
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const { user } = useAuth()
  const avatarSize = { height: 150, width: 150 }

  useEffect(() => {
    if (!user || profileId === null || profileId === undefined) return

    useCurrentUser(profileId, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (currentUser?.photos_url === null || undefined) return
    setImageFiles(currentUser?.photos_url)
  }, [currentUser])

  const styles = StyleSheet.create({
    avatar: {
      borderRadius: 10,
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
      borderRadius: 10,
    },
  })
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {imageFiles?.length && imageFiles[index1] !== null ? (
          <View className="m-1">
            <SinglePic
              size={150}
              avatarRadius={10}
              noAvatarRadius={10}
              item={imageFiles[index1]}
            />
          </View>
        ) : (
          <View className="m-1">
            <Image
              source={require("../../../../assets/images/TWU-Logo.png")}
              accessibilityLabel="Avatar"
              style={[avatarSize, styles.avatar, styles.image]}
            />
          </View>
        )}

        <View className="m-1">
          <SinglePic
            size={150}
            avatarRadius={10}
            noAvatarRadius={10}
            item={imageFiles?.[index2]}
          />
        </View>
        <View className="m-1">
          <SinglePic
            size={150}
            avatarRadius={10}
            noAvatarRadius={10}
            item={imageFiles?.[index3]}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default PhotoArray
