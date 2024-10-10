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
import supabase from "../../../../lib/supabase"
import formatBirthdate from "../../../utilFunctions/calculateDOB"
import { Skeleton } from "moti/skeleton"

type EventCardProps = {
  eventId: number
  title: string | null
  date: string | null
  communityId: number | null
  eventCoverPhoto: string | null
  eventPrice: number | null
  eventCompatibility?: number | null
}

const EventCard = ({
  title,
  date,
  communityId,
  eventId,
  eventCoverPhoto,
  eventPrice,
  eventCompatibility,
}: EventCardProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isPressed, setIsPressed] = useState<boolean>(false)
  const [coverPhotoState, setCoverPhotoState] = useState<string | null>(null)
  const navigation = useNavigation<NavigationType>()

  const handlePressIn = () => {
    setIsPressed(true)
  }
  const handlePressOut = () => {
    setIsPressed(false)
  }

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

  const CompatibilityBar = ({
    score,
  }: {
    score: number | null | undefined
  }) => {
    if (score === null || score === undefined) return null
    const compatibilityScore = Math.round(score)

    const Bar = ({ filled, color }: { filled: boolean; color: string }) => (
      <View className={`w-1 h-3 mx-0.5 ${filled ? color : "bg-gray-300"}`} />
    )

    let bars: JSX.Element[]

    if (compatibilityScore >= 90) {
      bars = [
        <Bar key={1} filled={true} color="bg-green-500" />,
        <Bar key={2} filled={true} color="bg-green-500" />,
        <Bar key={3} filled={true} color="bg-green-500" />,
      ]
    } else if (compatibilityScore >= 50) {
      bars = [
        <Bar key={1} filled={true} color="bg-yellow-500" />,
        <Bar key={2} filled={true} color="bg-yellow-500" />,
        <Bar key={3} filled={false} color="bg-yellow-500" />,
      ]
    } else {
      bars = [
        <Bar key={1} filled={true} color="bg-red-500" />,
        <Bar key={2} filled={false} color="bg-red-500" />,
        <Bar key={3} filled={false} color="bg-red-500" />,
      ]
    }

    return <View className="flex flex-row">{bars}</View>
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
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className={`mx-1 ${isPressed ? "opacity-25" : ""}`}
        onPress={() => navigation.navigate("ViewEvent", { eventId })}
      >
        <ImageBackground
          source={coverPhoto}
          style={styles.container}
          imageStyle={styles.image}
        >
          <View className="m-1 rounded-lg">
            <Text className="" style={styles.price}>
              {eventPrice ? `$${eventPrice.toString()}` : "Free"}
            </Text>
          </View>
          <View style={[{ flex: 1, justifyContent: "flex-end" }]}>
            <View className="flex-row items-center justify-between bg-white px-1 py-0.5">
              <Text
                className="text-sm font-bold text-black flex-1 mr-1"
                numberOfLines={1}
              >
                {title}
              </Text>
              <CompatibilityBar score={eventCompatibility} />
            </View>
            <Text className="text-xs bg-white px-1 py-0.5 text-black">
              {formatBirthdate(date)}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </Skeleton>
  )
}

export default EventCard
