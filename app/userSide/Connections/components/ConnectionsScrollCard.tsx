import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from "react-native"
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import { Profile } from "../../../@types/supabaseTypes"
import ActivityTags from "../../../components/AcvitivityTags"
import { FontAwesome5 } from "@expo/vector-icons"
import calculateAge from "../../../utilFunctions/calculateAge"
import MessageButton from "./MessageButton"
import supabase from "../../../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

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
  const navigation = useNavigation<NavigationType>()
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
        className="flex-1 "
      >
        {/* Bottom Section */}
        <View className="flex-1 justify-end">
          <View className=" rounded-t-2xl bg-primary-700 p-6">
            <View className="flex-row justify-between items-center ">
              <View>
                <Text className=" text-4xl text-white">
                  {profile.first_name}
                </Text>
                <Text className=" text-4xl text-white">
                  {profile.last_name}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-white font-semibold">
                  {calculateAge(profile.birthday)}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-white/70 font-medium">
                "{profile.about}"
              </Text>
            </View>

            <View
              className={`flex-row justify-between items-center mt-2 ${
                windowHeight < 700 ? "pb-14" : "pb-20"
              }`}
            >
              <Pressable className="bg-blue-600 p-1 rounded-lg flex-row items-center">
                <FontAwesome5 name="user" size={16} color="white" />
                <Text className="text-white text-xs mx-1 font-semibold">
                  View Profile
                </Text>
              </Pressable>

              <View className="flex flex-row items-center">
                <Pressable className="bg-primary-300 p-1 rounded-lg flex-row items-center mr-2">
                  <FontAwesome5 name="running" size={16} color="green" />
                  <Text className="text-green-400 text-sm mx-1 font-semibold">
                    6
                  </Text>
                </Pressable>
                <Pressable className="bg-primary-300 p-1 rounded-lg flex-row items-center">
                  <FontAwesome5 name="fire-alt" size={16} color="green" />
                  <Text className="text-green-400 text-sm mx-1 font-semibold">
                    98%
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default React.memo(ConnectionsScrollCard)
