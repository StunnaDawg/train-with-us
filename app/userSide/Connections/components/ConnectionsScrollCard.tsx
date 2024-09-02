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
import { FontAwesome6, Foundation, FontAwesome5 } from "@expo/vector-icons"
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
  const windowHeight = Dimensions.get("window").height

  const isMounted = useRef(true)

  useEffect(() => {
    readImage()
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

  // require("../../../../assets/images/TWU-Logo.png")
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
        {/* Optional overlay for darker background */}

        <View className="flex flex-row items-center justify-center">
          <Text className="font-bold text-2xl text-white">
            {profile.first_name}
          </Text>
          <Text className="font-bold text-3xl text-center mx-1 text-white">
            {calculateAge(profile.birthday)}
          </Text>
          {profile.gender === "Male" ? (
            <Foundation name="male-symbol" size={24} color="white" />
          ) : profile.gender === "Female" ? (
            <Foundation name="female-symbol" size={20} color="white" />
          ) : (
            <FontAwesome5 name="transgender-alt" size={20} color="white" />
          )}
        </View>

        <View className="flex flex-row justify-end items-center">
          <View>
            <MessageButton
              setLoading={setLoading}
              loading={loading}
              profileId={profile?.id}
              coach={false}
              profilePic={profile?.profile_pic || ""}
            />
          </View>
        </View>

        <View className="flex flex-row ">
          <View>
            <View className="flex flex-row items-center">
              <FontAwesome6 name="person-running" size={20} color="white" />
              <Text className="font-bold mx-1 text-white">
                Fitness Interests
              </Text>
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
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 10,
    objectFit: "cover",
    opacity: 0.8, // Adjust the opacity to make the content more readable
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional overlay to darken the background
  },
})

export default React.memo(ConnectionsScrollCard)
