import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"
import { Communities } from "../../../@types/supabaseTypes"

type EventCardProps = {
  eventId: number
  title: string | null
  date: string | null
  communityId: number | null
}

const EventCard = ({ title, date, communityId, eventId }: EventCardProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [community, setCommunity] = useState<Communities | null>(
    {} as Communities
  )
  const navigation = useNavigation<NavigationType>()
  const avatarSize = {
    width: 200,
    height: 200,
  }

  const styles = StyleSheet.create({
    avatar: {
      borderRadius: 0,
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
    if (communityId === null) return
    console.log("communityId", communityId)
    getSingleCommunity(setLoading, communityId, setCommunity)
  }, [])

  useEffect(() => {
    console.log("community", community?.community_title)
  }, [community])
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ViewEvent", {
          eventId: eventId,
        })
      }
    >
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1615395255362-f0b24845e1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        }}
        style={[avatarSize, styles.avatar]}
        imageStyle={styles.image}
      >
        <View className="m-1">
          <Text className="font-bold text-md text-white">9$</Text>
        </View>
        <View className="flex-1 flex-col items-start justify-end">
          <Text className="font-bold text-lg text-white">
            {/* {eventDate},{eventTime} */} June 17th @ 3:30 pm
          </Text>
          <Text className="font-bold text-2xl text-white">
            {/* {event.eventTitle} */} {title}
          </Text>

          <Text className="font-bold text-lg text-shadow text-white">
            {/* {event.communityName} */} {community?.community_title}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  )
}

export default EventCard
