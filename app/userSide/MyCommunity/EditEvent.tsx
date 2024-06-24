import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { Events, Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import getSingleEvent from "../../supabaseFunctions/getFuncs/getSingleEvent"
import EventCoverPhotoEdit from "../../components/EventCoverPhoto"
import updateSingleEventTrait from "../../supabaseFunctions/updateFuncs/updateSingleEventTrait"
import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"
import { FontAwesome6 } from "@expo/vector-icons"
import BackButton from "../../components/BackButton"
import { TouchableWithoutFeedback } from "react-native"
import Loading from "../../components/Loading"
import { Switch } from "react-native-gesture-handler"

const EditEvent = () => {
  const { user } = useAuth()
  const [event, setEvent] = useState<Events | null>(null)
  const [attendaceLimitSwitch, setAttendaceLimitSwitch] =
    useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [location, setLocation] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [eventTitle, setEventTitle] = useState<string>("")
  const [eventLimit, setEventLimit] = useState<string>("")
  const [date, setDate] = useState<Date>(new Date())
  const [price, setPrice] = useState<string>("")
  const [eventPicture, setEventPicture] = useState<string | null | undefined>(
    null
  )
  const [eventStyle, setEventStyle] = useState<string>("")
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

  const deleteEvent = async () => {
    const { error } = await supabase.from("events").delete().eq("id", eventId)

    if (error) {
      showAlert({ title: "Error", message: "Could not delete event" })
      throw error
    }

    navigation.goBack()
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
    setLocation(event?.location || "")
    setEventStyle(event?.event_style || "")
    setEventLimit(event?.event_limit?.toString() || "")

    if (event?.event_limit) {
      setAttendaceLimitSwitch(true)
    }
  }, [event])
  return (
    <SafeAreaView className="flex-1">
      {!loading ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView className=" p-4 bg-white">
              <View className="flex flex-row justify-between items-center mb-8">
                <BackButton />
                <Text className="mx-1 text-lg font-semibold ">
                  Update Event
                </Text>
                <Pressable
                  onPress={() => {
                    deleteEvent()
                  }}
                >
                  <FontAwesome6 name="trash" size={24} color="black" />
                </Pressable>
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
                <Text className="mb-2 text-sm font-semibold text-gray">
                  Title
                </Text>
                <TextInput
                  value={eventTitle}
                  onChangeText={setEventTitle}
                  placeholder="Add a Title"
                  className="border  p-2 rounded-lg"
                />
              </View>

              <View className="mb-4">
                <Text className="mb-2 text-sm font-semibold text-gray">
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
                <Text className="mb-2 text-sm font-semibold text-gray">
                  Date
                </Text>
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
                <Text className="mb-2 text-sm font-semibold text-gray">
                  Time
                </Text>
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
                <Text className="mb-2 text-sm font-semibold text-gray">
                  Price
                </Text>
                <TextInput
                  value={price || ""}
                  onChangeText={setPrice}
                  placeholder="Set a Price"
                  className="border  p-2 rounded-lg"
                  keyboardType="numeric"
                />
              </View>

              <View className="mb-4">
                <Text className="mb-2 text-sm font-semibold text-gray">
                  Location
                </Text>
                <TextInput
                  value={location || ""}
                  onChangeText={setLocation}
                  placeholder="Set Location"
                  className="border  p-2 rounded-lg"
                  keyboardType="numeric"
                />
              </View>

              <View className="mb-4">
                <Text className="mb-2 text-sm font-semibold text-gray">
                  Event Style
                </Text>
                <TextInput
                  value={eventStyle}
                  onChangeText={setEventStyle}
                  placeholder="What's the event style? eg: Hyrox, Crossfit, etc."
                  className="border  p-2 rounded-lg"
                />
              </View>

              <View className="items-center mb-1">
                <Text className="text-lg font-bold text-gray underline">
                  Advanced Settings
                </Text>
              </View>

              <View className="mb-4">
                <View className="flex flex-row justify-between items-center mb-2">
                  <Text className=" text-sm font-semibold text-gray">
                    Attendance Limit
                  </Text>
                  <Switch
                    value={attendaceLimitSwitch}
                    onChange={() =>
                      setAttendaceLimitSwitch(!attendaceLimitSwitch)
                    }
                  />
                </View>
                {attendaceLimitSwitch ? (
                  <TextInput
                    keyboardType="numeric"
                    value={eventLimit}
                    onChangeText={setEventLimit}
                    placeholder="Attendance Limit, leave blank for no limit"
                    className="border  p-2 rounded-lg"
                  />
                ) : null}
              </View>

              <Pressable
                onPress={async () => {
                  setTimeout(() => {
                    setLoading(true)
                    if (!currentUser?.id && !currentUser?.community_created)
                      return
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

                    if (event.location !== location) {
                      updateSingleEventTrait(
                        setLoading,
                        eventId,
                        "location",
                        location
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

                    if (event.event_style !== eventStyle) {
                      updateSingleEventTrait(
                        setLoading,
                        eventId,
                        "event_style",
                        eventStyle
                      )
                    }

                    if (
                      event.event_limit !== Number(eventLimit) &&
                      attendaceLimitSwitch
                    ) {
                      const eventLimitNumber =
                        eventLimit.trim() === "" ? null : Number(eventLimit)

                      if (!eventLimitNumber || eventLimitNumber <= 0) {
                        showAlert({
                          title: "Invalid Limit",
                          message:
                            "Please enter a valid limit greater than zero.",
                        })
                        return
                      }
                      updateSingleEventTrait(
                        setLoading,
                        eventId,
                        "event_limit",
                        eventLimitNumber
                      )
                    } else if (!attendaceLimitSwitch) {
                      updateSingleEventTrait(
                        setLoading,
                        eventId,
                        "event_limit",
                        null
                      )
                    }

                    if (event.date !== null) {
                      const dateVar = Date.parse(event?.date)
                      const editDate = new Date(dateVar)
                      if (editDate !== date) {
                        updateSingleEventTrait(
                          setLoading,
                          eventId,
                          "date",
                          date
                        )
                      }
                    }
                    setLoading(false)
                    navigation.goBack()
                  }, 2000)
                }}
                className=" bg-black p-4 rounded-lg items-center mb-20"
              >
                <Text className="text-white text-lg font-bold">
                  Update Event
                </Text>
              </Pressable>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  )
}

export default EditEvent
