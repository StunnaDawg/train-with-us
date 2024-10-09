import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native"
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"
import { Profile } from "../../../@types/supabaseTypes"
import ActivityTags from "../../../components/AcvitivityTags"
import calculateAge from "../../../utilFunctions/calculateAge"
import MessageButton from "./MessageButton"
import supabase from "../../../../lib/supabase"

type ConnectionsScrollCardProps = {
  profile: Profile
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

const ConnectionsScrollCard = ({
  profile,
  loading,
  setLoading,
}: ConnectionsScrollCardProps) => {
  const [showPlaceholder, setPlaceholder] = useState<boolean>(false)
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const [communityTitle, setCommunityTitle] = useState<string>("")
  const windowHeight = Dimensions.get("window").height

  const isMounted = useRef(true)

  const returnCommunityName = async (communityId: number) => {
    const { data, error } = await supabase
      .from("communities")
      .select("community_title")
      .eq("id", communityId)
      .single()

    if (error) {
      console.error("Error fetching community name:", error.message)
      throw error
    }

    setCommunityTitle(data.community_title)
  }

  useEffect(() => {
    readImage()
    if (profile.primary_gym) {
      returnCommunityName(profile.primary_gym)
    }
  }, [profile])

  const readImage = async () => {
    setLoading(true)

    try {
      if (!profile.photos_url?.length) {
        setPlaceholder(true)

        setLoading(false)
        return
      }
      const { data, error } = await supabase.storage
        .from("photos")
        .download(`${profile.photos_url[0]}`, {
          transform: {
            quality: 20,
          },
        })
      if (error) {
        setPlaceholder(true)

        if (isMounted.current) {
          setLoading(false)
        }
      }
      const fr = new FileReader()
      fr.readAsDataURL(data!)
      fr.onload = () => {
        if (isMounted.current) {
          const imageDataUrl = fr.result as string
          setAvatarUrl(imageDataUrl)
        }
      }
    } catch (error) {
      setPlaceholder(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ height: windowHeight }}>
      <ImageBackground
        source={
          !showPlaceholder && avatarUrl
            ? { uri: avatarUrl }
            : require("../../../../assets/images/TWU-Logo.png")
        }
        style={styles.imageBackground}
        imageStyle={styles.image} // Style for the image inside the ImageBackground
      >
        <View style={styles.overlay} />

        {/* Top Section */}
        <View style={styles.topSection}>
          <Text className="font-bold text-2xl text-white">
            {profile.first_name} {profile.last_name}
          </Text>
          <Text className="font-bold text-3xl text-center mx-1 text-white">
            {calculateAge(profile.birthday)}
          </Text>
        </View>

        {/* Middle Section */}
        <View style={styles.middleSection}>
          <MessageButton
            setLoading={setLoading}
            loading={loading}
            profileId={profile?.id}
            coach={false}
            profilePic={profile?.profile_pic || ""}
          />
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {profile.primary_gym ? (
            <View>
              <Text className="text-white font-bold">{communityTitle}</Text>
            </View>
          ) : null}
          <View className="m-2">
            <Text className="text-white font-bold">{profile.about}</Text>
          </View>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            className="mt-1"
          >
            {profile?.activities && profile.activities.length > 0
              ? profile.activities.map((tag) => (
                  <View key={tag} className="mb-1">
                    <ActivityTags activity={`${tag}`} />
                  </View>
                ))
              : null}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    borderRadius: 10,
    objectFit: "cover",
    opacity: 0.8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  topSection: {
    marginHorizontal: 15,
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  middleSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 20,
  },
  bottomSection: {
    marginHorizontal: 15,
    marginBottom: 100,
  },
})

export default React.memo(ConnectionsScrollCard)
