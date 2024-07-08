import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"
import { Communities } from "../../../@types/supabaseTypes"
import supabase from "../../../../lib/supabase"
import formatBirthdate from "../../../utilFunctions/calculateDOB"
import { Skeleton } from "moti/skeleton"
import { se } from "date-fns/locale"

type EventCardProps = {
  eventId: number
  title: string | null
  date: string | null
  communityId: number | null
  eventCoverPhoto: string | null
  eventPrice: number | null
}

const EventCard = ({
  title,
  date,
  communityId,
  eventId,
  eventCoverPhoto,
  eventPrice,
}: EventCardProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  const [coverPhotoState, setCoverPhotoState] = useState<string | null>(null)
  const navigation = useNavigation<NavigationType>()

  let coverPhoto = {
    uri:
      coverPhotoState !== null
        ? coverPhotoState
        : "https://rfkabunqcmmsoqijcrhp.supabase.co/storage/v1/object/sign/photos/TWU-Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwaG90b3MvVFdVLUxvZ28ucG5nIiwiaWF0IjoxNzE0Njc4NzA0LCJleHAiOjE3MTUyODM1MDR9.Ak5z5068yCE6QFlBwcSHlcs_bH2Kg4PUUY8r6TuiaeU&t=2024-05-02T19%3A38%3A24.726Z",
  }

  useEffect(() => {
    console.log("eventCoverPhoto", eventCoverPhoto)
    readImage()
  }, [eventCoverPhoto])

  const readImage = () => {
    setLoading(true)
    if (eventCoverPhoto === undefined) return
    console.log("reading", `${eventCoverPhoto}`)
    supabase.storage
      .from("photos")
      .download(`${eventCoverPhoto}`)
      .then(({ data }) => {
        const fr = new FileReader()
        fr.readAsDataURL(data!)
        fr.onload = () => {
          setCoverPhotoState(fr.result as string)
          setLoading(false)
        }
      })
  }
  const styles = StyleSheet.create({
    container: {
      width: 175,
      height: 175,
      borderRadius: 10,
      overflow: "hidden",
      borderWidth: 8,
      borderColor: "white",
      backgroundColor: "black",
    },
    image: {
      height: 175,
      resizeMode: "cover",
    },

    text: {
      backgroundColor: "white",
      fontWeight: "bold",
      color: "black",
    },
    subText: {
      fontWeight: "bold",

      color: "white",
    },
    price: {
      fontWeight: "bold",
      fontSize: 12,
      color: "black",
      backgroundColor: "white",
      width: 50,
      textAlign: "center",
      borderRadius: 100,
      marginTop: 5,
    },
  })

  return (
    <Skeleton show={loading}>
      <Pressable
        className="mx-1"
        onPress={() => navigation.navigate("ViewEvent", { eventId })}
      >
        <ImageBackground
          source={coverPhoto}
          style={styles.container}
          imageStyle={styles.image}
        >
          <View className="m-1">
            <Text className="" style={styles.price}>
              {eventPrice ? eventPrice.toString() : "Free"}
            </Text>
          </View>
          <View style={[{ flex: 1, justifyContent: "flex-end" }]}>
            <Text className="text-sm" style={styles.text}>
              {title}
            </Text>
            <Text className="text-xs" style={styles.text}>
              {formatBirthdate(date)}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </Skeleton>
  )
}

export default EventCard
