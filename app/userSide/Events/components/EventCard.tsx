import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { NavigationType } from "../../../@types/navigation"

const EventCard = () => {
  // const [gymProfile, setGymProfile] = useState<GymProfile>({} as GymProfile)
  // const [loading, setLoading] = useState<boolean>(false)
  // const navigation = useNavigation<NavigationType>()
  // const [eventDate, setEventDate] = useState<string>("")
  // const [eventTime, setEventTime] = useState<string>("")
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
  return (
    <Pressable onPress={() => navigation.navigate("ViewEvent")}>
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
            {/* {event.eventTitle} */} Bootcamp
          </Text>

          <Text className="font-bold text-lg text-shadow text-white">
            Blended
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  )
}

export default EventCard
