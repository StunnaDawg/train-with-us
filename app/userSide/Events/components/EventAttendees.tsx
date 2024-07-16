import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"
import BackButton from "../../../components/BackButton"
import AttendeeCard from "./AttendeeCard"

const EventAttendees = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ViewEventAttendees">>()
  const eventGoers = route.params.profile

  return (
    <SafeAreaView className="flex-1">
      <View className="m-2">
        <View className="flex flex-row justify-between items-center">
          <BackButton />
          <Text className=" font-bold text-xl">Attendees</Text>
          <View />
        </View>
        <ScrollView className=" h-full">
          {eventGoers?.map((member) => {
            return <AttendeeCard key={member.id} member={member} />
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default EventAttendees
