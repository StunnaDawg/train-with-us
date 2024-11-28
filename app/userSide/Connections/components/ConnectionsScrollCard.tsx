import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Easing,
} from "react-native"
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"
import { Animated } from "react-native"
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

const ProfileDetailsCard = ({
  string,
  stringArray,
  title,
  icon,
}: {
  string: string | null
  stringArray: string[] | null
  title: string
  icon: string | null
}) => {
  return (
    <View className="rounded-lg pb-4 bg-primary-700 p-4 my-4">
      <View className="flex-row items-center">
        {icon && <FontAwesome6 name={icon} size={12} color="white" />}
        <Text className="text-white font-bold text-sm mx-1">{title}</Text>
      </View>
      {string && <Text className="text-white/70">{string}</Text>}

      {stringArray && (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          className="flex-row gap-1 p-1 py-2"
        >
          {stringArray?.map((item) => (
            <View className="rounded-2xl bg-primary-300 p-1" key={item}>
              <Text className="text-white/70">{item}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  )
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

  const [isDetailView, setIsDetailView] = useState(false)
  const fadeAnim = useRef(new Animated.Value(1)).current
  const slideAnim = useRef(new Animated.Value(0)).current

  const toggleDetailView = () => {
    // Fade out current view
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: isDetailView ? 0 : 1,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsDetailView(!isDetailView)
      // Fade in new view
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start()
    })
  }

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
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <Animated.View
          className="flex-1"
          style={{
            opacity: fadeAnim,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -50],
                }),
              },
            ],
          }}
        >
          <View className="flex-1 justify-end">
            <View
              className={`rounded-t-2xl bg-primary-900 p-6 ${
                isDetailView ? "h-1/2" : ""
              }`}
            >
              {!isDetailView ? (
                // Original card view
                <>
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
                    <Text className="text-white/70 font-medium text-xs">
                      "{profile.about}"
                    </Text>
                  </View>

                  <View
                    className={`flex-row justify-between items-center mt-2 ${
                      windowHeight < 700 ? "pb-14" : "pb-20"
                    }`}
                  >
                    <Pressable
                      className="bg-blue-600 p-1 rounded-lg flex-row items-center"
                      onPress={toggleDetailView}
                    >
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
                </>
              ) : (
                // Detailed view
                <ScrollView className="flex-1 space-y-4">
                  <Pressable
                    className="bg-primary-600 p-2 rounded-lg self-start mb-4"
                    onPress={toggleDetailView}
                  >
                    <FontAwesome5 name="arrow-left" size={16} color="white" />
                  </Pressable>

                  {/* Additional profile details */}

                  {profile.activities && (
                    <ProfileDetailsCard
                      stringArray={profile.activities}
                      title="Activities"
                      string={null}
                      icon="person-running"
                    />
                  )}

                  {profile.about && (
                    <ProfileDetailsCard
                      string={profile.about}
                      title="About Me"
                      stringArray={null}
                      icon="user"
                    />
                  )}

                  {profile.bucket_list && (
                    <ProfileDetailsCard
                      stringArray={null}
                      title="Bucket List"
                      string={profile.bucket_list}
                      icon="bucket"
                    />
                  )}

                  {profile.hobbies && (
                    <ProfileDetailsCard
                      stringArray={null}
                      title="Outside of the gym I enjoy..."
                      string={profile.hobbies}
                      icon="mug-hot"
                    />
                  )}
                </ScrollView>
              )}
            </View>
          </View>
        </Animated.View>
      </ImageBackground>
    </View>
  )
}

export default React.memo(ConnectionsScrollCard)
