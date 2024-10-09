import { Image } from "expo-image"
import { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
} from "react-native"
import supabase from "../../lib/supabase"
import { Skeleton } from "moti/skeleton"

import { cacheStorage } from "../utilFunctions/mmkvStorage"
import showAlert from "../utilFunctions/showAlert"

type SinglePicProps = {
  size: number
  item: string | undefined | null
  avatarRadius: number
  noAvatarRadius: number
  skeletonRadius?: any
  allowExpand?: boolean
  allowCacheImage?: boolean
  isMessagePic?: boolean
}

export default function SinglePicCommunity({
  size = 150,
  skeletonRadius = "round",
  item,
  avatarRadius,
  noAvatarRadius,
  allowExpand = false,
  allowCacheImage = true,
  isMessagePic = false,
}: SinglePicProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [scale] = useState(new Animated.Value(1))
  const avatarSize = { height: size, width: size }

  const isMounted = useRef(true)

  useEffect(() => {
    if (isMessagePic === false) {
      readImage()
    } else {
      setLoading(false)
      setAvatarUrl(item || "")
    }
    return () => {
      isMounted.current = false
    }
  }, [item])

  const readImage = async () => {
    setLoading(true)

    const cacheKey = `image:${item}`
    const cachedImage = cacheStorage.getString(cacheKey)

    if (cachedImage && allowCacheImage && cacheKey === "image:" + item) {
      setAvatarUrl(cachedImage)
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.storage
        .from("photos")
        .download(`${item}`, {
          transform: {
            quality: 20,
          },
        })
      if (error) throw error

      const fr = new FileReader()
      fr.readAsDataURL(data!)
      fr.onload = () => {
        if (isMounted.current) {
          const imageDataUrl = fr.result as string
          setAvatarUrl(imageDataUrl)

          if (allowCacheImage) {
            cacheStorage.set(cacheKey, imageDataUrl)
          }
          setLoading(false)
        }
      }
    } catch (error) {
      console.error("Error loading image:", error)
      setLoading(false)
    }
  }

  const openModal = () => {
    Animated.spring(scale, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start(() => setModalVisible(true))
  }

  const closeModal = () => {
    setModalVisible(false)
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
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
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalImage: {
      width: 350,
      height: 350,
    },
  })

  return (
    <View>
      <TouchableOpacity
        disabled={allowExpand ? false : true}
        onPress={openModal}
      >
        {loading ? (
          <Skeleton radius={skeletonRadius} height={size} width={size} />
        ) : (
          <Image
            source={
              avatarUrl
                ? { uri: avatarUrl }
                : require("../../assets/images/TWU-Logo.png")
            }
            accessibilityLabel="Avatar"
            style={[avatarSize, styles.avatar, styles.image]}
            cachePolicy="memory-disk"
          />
        )}
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal}>
              <Image source={{ uri: avatarUrl }} style={styles.modalImage} />
            </TouchableOpacity>
          </View>
        </Modal>
      </TouchableOpacity>
    </View>
  )
}
