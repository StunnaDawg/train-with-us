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
import { fi, se } from "date-fns/locale"

type SinglePicProps = {
  size: number
  item: string | undefined | null
  avatarRadius: number
  noAvatarRadius: number
  skeletonRadius?: any
}

export default function SinglePicCommunity({
  size = 150,
  skeletonRadius = "round",
  item,
  avatarRadius,
  noAvatarRadius,
}: SinglePicProps) {
  const [showPlaceholder, setPlaceholder] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [scale] = useState(new Animated.Value(1))
  const avatarSize = { height: size, width: size }

  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    if (!item) {
      setPlaceholder(true)
      return
    }
    readImage()

    return () => {
      isMounted.current = false
    }
  }, [item])

  const readImage = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.storage
        .from("photos")
        .download(`${item}`)
      if (error) {
        setPlaceholder(true)
        console.error("Error downloading image:", error)
        if (isMounted.current) {
          setLoading(false)
        }
      }
      const fr = new FileReader()
      fr.readAsDataURL(data!)
      fr.onload = () => {
        if (isMounted.current) {
          setAvatarUrl(fr.result as string)
          setLoading(false)
        }
      }
    } catch (error) {
      setPlaceholder(true)
      console.error("Error downloading image:", error)

      setLoading(false)
    } finally {
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
      <TouchableOpacity onPress={openModal}>
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
