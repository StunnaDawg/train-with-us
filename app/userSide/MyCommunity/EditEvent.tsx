import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
  Pressable,
} from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import addNewEvent from "../../supabaseFunctions/addFuncs/addEvent"
import { set } from "date-fns"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { Events, Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import NewPhoto from "../../components/NewPhoto"
import * as ImagePicker from "expo-image-picker"
import getSingleEvent from "../../supabaseFunctions/getFuncs/getSingleEvent"
import EventCoverPhotoEdit from "../../components/EventCoverPhoto"
import updateSingleEventTrait from "../../supabaseFunctions/updateFuncs/updateSingleEventTrait"

const EditEvent = () => {
  const { user } = useAuth()
  const [event, setEvent] = useState<Events | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [description, setDescription] = useState<string>("")
  const [eventTitle, setEventTitle] = useState<string>("")
  const [date, setDate] = useState<Date>(new Date())
  const [price, setPrice] = useState<string>("")
  const [eventPicture, setEventPicture] = useState<string | null | undefined>(
    null
  )
  const [show, setShow] = useState(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const navigation = useNavigation<NavigationType>()
  const route = useRoute<RouteProp<RootStackParamList, "EditEvent">>()
  const eventId = route.params.eventId

  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios") // For iOS, keep the picker open
    setDate(currentDate)
  }

  useEffect(() => {
    if (user?.id === undefined) return
    useCurrentUser(user?.id, setCurrentUser)
  }, [user?.id])

  useEffect(() => {
    getSingleEvent(setLoading, eventId, setEvent)
  }, [eventId])

  useEffect(() => {
    if (!event) return
    if (!event?.date) return
    const dateVar = Date.parse(event?.date)
    const editDate = new Date(dateVar)
    setEventTitle(event?.event_title || "")
    setDescription(event?.event_description || "")
    setPrice(event?.price?.toString() || "0")
    setDate(editDate || new Date())
    setEventPicture(event?.event_cover_photo || null)
  }, [event])
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className=" p-4 bg-white">
        <View className="flex flex-row items-center mb-8">
          <Text className="mx-1 text-3xl font-semibold ">Create Event</Text>
        </View>

        <View>
          <EventCoverPhotoEdit
            eventId={eventId}
            imageUrl={eventPicture}
            imageUrlToRead={eventPicture}
            setImageUrl={setEventPicture}
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-lg font-semibold text-gray">Title</Text>
          <TextInput
            value={eventTitle}
            onChangeText={setEventTitle}
            placeholder="Add a Title"
            className="border  p-2 rounded-lg"
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-lg font-semibold text-gray">
            Description
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Event Description"
            className="border p-2 rounded-lg"
            multiline={true}
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-lg font-semibold text-gray">Date</Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
            className="mb-4"
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-lg font-semibold text-gray">Time</Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-lg font-semibold text-gray">Price</Text>
          <TextInput
            value={price || ""}
            onChangeText={setPrice}
            placeholder="Set a Price"
            className="border  p-2 rounded-lg"
            keyboardType="numeric"
          />
          <Pressable
            onPress={async () => {
              setTimeout(() => {
                if (!currentUser?.id && !currentUser?.community_created) return
                if (!event) return

                console.log(event.event_host, eventId)

                if (!eventTitle.trim()) {
                  alert("Title is required.")
                  return
                }

                if (event.event_title !== eventTitle) {
                  updateSingleEventTrait(
                    setLoading,
                    eventId,
                    "event_title",
                    eventTitle
                  )
                }

                if (event.event_description !== description) {
                  updateSingleEventTrait(
                    setLoading,
                    eventId,
                    "event_description",
                    description
                  )
                }

                if (event.price !== Number(price)) {
                  updateSingleEventTrait(
                    setLoading,
                    eventId,
                    "price",
                    Number(price)
                  )
                }
                if (event.date !== null) {
                  const dateVar = Date.parse(event?.date)
                  const editDate = new Date(dateVar)
                  if (editDate !== date) {
                    updateSingleEventTrait(setLoading, eventId, "date", date)
                  }
                }

                navigation.goBack()
              }, 2000)
            }}
            className=" bg-black p-4 rounded-lg items-center mb-20"
          >
            <Text className="text-white text-xl font-bold">Update Event</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditEvent
