import {
  View,
  Text,
  Platform,
  Dimensions,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import MessageButton from "./MessageButton"
import { Profile } from "../../../@types/supabaseTypes"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { FontAwesome6, Foundation, FontAwesome5 } from "@expo/vector-icons"
import calculateAge from "../../../utilFunctions/calculateAge"
import ActivityTags from "../../../components/AcvitivityTags"
import { Image } from "expo-image"
import SinglePicCommunity from "../../../components/SinglePicCommunity"

type ConnectionsCardProps = {
  profile?: Profile | null
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  isLast: boolean
  setEndOfData: Dispatch<SetStateAction<boolean>>
}

const ConnectionsCard = ({
  profile,
  loading,
  setLoading,
  isLast,
  setEndOfData,
}: ConnectionsCardProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const screenHeight = Dimensions.get("window").height
  const cardHeight = Platform.OS == "android" ? screenHeight * 0.75 : 600
  const navigation = useNavigation<NavigationType>()
  const avatarSize = { height: 250, width: 250 }

  const handlePressIn = () => {
    setIsPressed(true)
  }
  const handlePressOut = () => {
    setIsPressed(false)
  }

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

  useEffect(() => {
    if (isLast && !profile && !loading) {
      setEndOfData(true)
    }
  }, [isLast])

  return (
    <View className="flex-1 mx-5" style={{ height: cardHeight }}>
      {!isLast && profile ? (
        <>
          <View className="bg-white border-slate-200 rounded-md px-1 py-3">
            <View className="flex flex-row justify-center">
              <Text className="font-bold text-2xl">{profile.first_name}</Text>
            </View>
            <View className="flex flex-row p-2">
              <View className="flex flex-row items-center">
                <FontAwesome6 name="cake-candles" size={20} color="black" />
                <Text className="font-bold text-center mx-1">
                  {calculateAge(profile.birthday)}
                </Text>
              </View>
            </View>

            <View className="flex flex-row items-center p-2">
              <View className="flex flex-row items-center">
                {profile.gender === "Male" ? (
                  <Foundation name="male-symbol" size={20} color="black" />
                ) : profile.gender === "Female" ? (
                  <Foundation name="female-symbol" size={20} color="black" />
                ) : (
                  <FontAwesome5
                    name="transgender-alt"
                    size={20}
                    color="black"
                  />
                )}
                <Text className="font-bold text-center mx-1">
                  {profile.gender}
                </Text>
              </View>
            </View>

            <View className="flex flex-row items-center p-2">
              <View>
                <View className="flex flex-row items-center">
                  <FontAwesome6 name="person-running" size={20} color="black" />
                  <Text className="font-bold mx-1">Fitness Interests</Text>
                </View>

                <ScrollView horizontal={true} className="mt-1">
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
            <View className="flex flex-row justify-center m-1">
              {profile.photos_url?.length && profile?.photos_url[0] !== null ? (
                <View className="m-1">
                  <SinglePicCommunity
                    size={250}
                    avatarRadius={10}
                    noAvatarRadius={10}
                    item={profile?.photos_url[0]}
                    skeletonRadius={"square"}
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
            </View>
            <View className="flex flex-row justify-center items-center">
              <View>
                <MessageButton
                  setLoading={setLoading}
                  loading={loading}
                  profileId={profile?.id}
                  coach={false}
                  profilePic={profile?.profile_pic || ""}
                />
              </View>

              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                className={` ${
                  isPressed ? "bg-black" : "bg-white"
                } border-2 rounded-full px-5 py-1 mx-1`}
                onPress={() =>
                  navigation.navigate("ViewFullUserProfile", {
                    user: profile,
                  })
                }
              >
                <FontAwesome6
                  name="eye"
                  size={24}
                  color={`${isPressed ? "white" : "black"}`}
                />
              </Pressable>
            </View>
          </View>
        </>
      ) : (
        <>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text className="font-bold text-lg">That's it for today</Text>
            <Text className="font-semibold text-sm">Come back later</Text>
          </View>
        </>
      )}
    </View>
  )
}

export default ConnectionsCard
