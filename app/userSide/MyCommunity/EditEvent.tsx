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
  Switch,
  TouchableOpacity,
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
import Loading from "../../components/Loading"
import showAlertFunc from "../../utilFunctions/showAlertFunc"

type ActvitiesOption = string

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
  const [updateEventPressed, setUpdateEventPressed] = useState<boolean>(false)
  const [eventStyle, setEventStyle] = useState<string>("")
  const [show, setShow] = useState(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const navigation = useNavigation<NavigationType>()
  const route = useRoute<RouteProp<RootStackParamList, "EditEvent">>()
  const [selectedActvities, setSelectedActvities] = useState<ActvitiesOption[]>(
    []
  )
  const eventId = route.params.eventId

  const handleSelectActivities = (activity: ActvitiesOption) => {
    if (!selectedActvities.includes(activity)) {
      setSelectedActvities([...selectedActvities, activity])
    } else {
      handleDeselectActivities(activity)
    }
  }

  const handleDeselectActivities = (activity: ActvitiesOption) => {
    const index = selectedActvities.indexOf(activity)
    if (index > -1) {
      selectedActvities.splice(index, 1)
    }
    setSelectedActvities([...selectedActvities])
  }

  const handleEventButtonPressedIn = () => {
    setUpdateEventPressed(true)
  }

  const handleEventButtonPressedOut = () => {
    setUpdateEventPressed(false)
  }

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
    setSelectedActvities(event?.event_tags || [])

    if (event?.event_limit) {
      setAttendaceLimitSwitch(true)
    }
  }, [event])

  const ActvitiesOptions: ActvitiesOption[] = [
    "Aerobics 🏃‍♀️",
    "Boxing 🥊",
    "CrossFit 🏋️‍♂️",
    "Hyrox 💪",
    "Running 🏃",
    "Weightlifting 🏋️‍♀️",
    "Cycling 🚴",
    "Yoga 🧘",
    "Pilates 🧘‍♀️",
    "Powerlifting 🏋️‍♂️",
    "Basketball 🏀",
    "Bodybuilding 💪",
    "Calisthenics 🤸‍♂️",
    "Swimming 🏊",
    "Dance 💃",
    "Hiking 🥾",
    "Rock Climbing 🧗",
    "Rowing 🚣",
    "Martial Arts 🥋",
    "Soccer ⚽",
    "Tennis 🎾",
    "Golf ⛳",
    "Baseball ⚾",
    "Softball ⚾",
    "Football 🏈",
    "Rugby 🏉",
    "Hockey 🏒",
    "Mountain Biking 🚵",
    "Skiing 🎿",
    "Snowboarding 🏂",
    "Surfing 🏄",
    "Skateboarding 🛹",
    "Zumba 🕺",
    "Kickboxing 🥊",
    "Spin Class 🚴‍♂️",
    "Tai Chi 🧘‍♂️",
    "Stretching 🤸‍♀️",
    "HIIT 🔥",
    "TRX Training 🏋️",
    "Functional Training 🏋️‍♂️",
    "Trail Running 🏃‍♂️",
    "Obstacle Course Racing 🏅",
    "Stand-Up Paddleboarding (SUP) 🏄‍♂️",
    "Cross-Country Skiing 🎿",
    "Fencing 🤺",
    "Taekwondo 🥋",
    "Jiu-Jitsu 🥋",
    "Karate 🥋",
    "Judo 🥋",
    "Badminton 🏸",
    "Table Tennis 🏓",
    "Volleyball 🏐",
    "Cricket 🏏",
    "Handball 🤾‍♂️",
    "Figure Skating ⛸",
    "Track and Field 🏃‍♀️",
    "Climbing 🧗‍♂️",
    "Parkour 🏃‍♂️",
    "Cheerleading 🎀",
    "Gymnastics 🤸‍♀️",
    "Pole Dancing 💃",
    "Diving 🤿",
    "Water Polo 🤽‍♂️",
    "Wrestling 🤼‍♂️",
    "Racquetball 🎾",
    "Squash 🎾",
    "Frisbee 🥏",
    "Lacrosse 🥍",
    "Sailing ⛵",
    "Kayaking 🛶",
    "Canoeing 🛶",
    "Horseback Riding 🐎",
    "Archery 🏹",
  ]
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-row justify-between items-center px-4 py-3">
        <BackButton size={24} colour="white" />
        <Text className="text-xl font-bold text-white">Edit Event</Text>
        <TouchableOpacity
          onPress={() => {
            showAlertFunc({
              title: "Delete Event",
              message: "Are you sure you want to delete this event?",
              buttons: [
                { text: "Cancel", onPress: () => {}, style: "cancel" },
                { text: "Delete", onPress: deleteEvent, style: "destructive" },
              ],
            })
          }}
        >
          <FontAwesome6 name="trash" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {!loading ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
          className="flex-1"
        >
          <ScrollView className="flex-1 px-4 py-6">
            <View className="space-y-6">
              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Event Photo
                </Text>
                <EventCoverPhotoEdit
                  eventId={eventId}
                  imageUrl={eventPicture}
                  imageUrlToRead={eventPicture}
                  setImageUrl={setEventPicture}
                />
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">Title</Text>
                <TextInput
                  value={eventTitle}
                  onChangeText={setEventTitle}
                  placeholder="Add a Title"
                  placeholderTextColor="#9CA3AF"
                  className="bg-gray-800 text-white px-4 py-3 rounded-lg"
                />
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Description
                </Text>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Event Description"
                  placeholderTextColor="#9CA3AF"
                  className="bg-gray-800 text-white px-4 py-3 rounded-lg"
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">Date</Text>
                <DateTimePicker
                  themeVariant="dark"
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeDate}
                  textColor="white"
                />
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">Time</Text>
                <DateTimePicker
                  themeVariant="dark"
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeDate}
                  textColor="white"
                />
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">Price</Text>
                <TextInput
                  value={price}
                  onChangeText={setPrice}
                  placeholder="Set a Price"
                  placeholderTextColor="#9CA3AF"
                  className="bg-gray-800 text-white px-4 py-3 rounded-lg"
                  keyboardType="numeric"
                />
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Location
                </Text>
                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Set Location"
                  placeholderTextColor="#9CA3AF"
                  className="bg-gray-800 text-white px-4 py-3 rounded-lg"
                />
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Event Style
                </Text>
                <TextInput
                  value={eventStyle}
                  onChangeText={setEventStyle}
                  placeholder="What's the event style? eg: Hyrox, Crossfit, etc."
                  placeholderTextColor="#9CA3AF"
                  className="bg-gray-800 text-white px-4 py-3 rounded-lg"
                />
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Event Tags
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {ActvitiesOptions.map((activity, index) => {
                    const isSelected = selectedActvities.includes(activity)
                    return (
                      <Pressable
                        onPress={() => handleSelectActivities(activity)}
                        key={index}
                        className={`mr-2 px-3 py-2 rounded-full ${
                          isSelected ? "bg-blue-600" : "bg-gray-700"
                        }`}
                      >
                        <Text className="text-white font-semibold">
                          {activity}
                        </Text>
                      </Pressable>
                    )
                  })}
                </ScrollView>
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Advanced Settings
                </Text>
                <View className="space-y-4">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-white font-semibold">
                      Attendance Limit
                    </Text>
                    <Switch
                      value={attendaceLimitSwitch}
                      onValueChange={() =>
                        setAttendaceLimitSwitch(!attendaceLimitSwitch)
                      }
                    />
                  </View>
                  {attendaceLimitSwitch && (
                    <TextInput
                      keyboardType="numeric"
                      value={eventLimit}
                      onChangeText={setEventLimit}
                      placeholder="Attendance Limit"
                      placeholderTextColor="#9CA3AF"
                      className="bg-gray-800 text-white px-4 py-3 rounded-lg"
                    />
                  )}
                </View>
              </View>
            </View>

            <View className="mt-6 mb-10">
              <TouchableOpacity
                onPress={async () => {
                  setLoading(true)
                  try {
                    if (!currentUser?.id && !currentUser?.community_created)
                      return
                    if (!event) return

                    console.log(event.event_host, eventId)

                    if (!eventTitle.trim()) {
                      alert("Title is required.")
                      return
                    }

                    // Event title update
                    if (event.event_title !== eventTitle) {
                      await updateSingleEventTrait(
                        setLoading,
                        eventId,
                        "event_title",
                        eventTitle
                      )
                    }

                    // Description update
                    if (event.event_description !== description) {
                      await updateSingleEventTrait(
                        setLoading,
                        eventId,
                        "event_description",
                        description
                      )
                    }

                    // Location update
                    if (event.location !== location) {
                      await updateSingleEventTrait(
                        setLoading,
                        eventId,
                        "location",
                        location
                      )
                    }

                    // Price update
                    if (event.price !== Number(price)) {
                      await updateSingleEventTrait(
                        setLoading,
                        eventId,
                        "price",
                        Number(price)
                      )
                    }

                    // Event style update
                    if (event.event_style !== eventStyle) {
                      await updateSingleEventTrait(
                        setLoading,
                        eventId,
                        "event_style",
                        eventStyle
                      )
                    }

                    // Attendance limit logic
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
                      await updateSingleEventTrait(
                        setLoading,
                        eventId,
                        "event_limit",
                        eventLimitNumber
                      )
                    } else if (!attendaceLimitSwitch) {
                      await updateSingleEventTrait(
                        setLoading,
                        eventId,
                        "event_limit",
                        null
                      )
                    }

                    // Date update
                    if (event.date !== null) {
                      const dateVar = Date.parse(event?.date)
                      const editDate = new Date(dateVar)
                      if (editDate !== date) {
                        await updateSingleEventTrait(
                          setLoading,
                          eventId,
                          "date",
                          date
                        )
                      }
                    }

                    // Activity tags update
                    if (selectedActvities !== event.event_tags) {
                      await updateSingleEventTrait(
                        setLoading,
                        eventId,
                        "event_tags",
                        selectedActvities
                      )
                    }

                    // On success, navigate back and show alert
                    navigation.goBack()
                    showAlert({
                      title: "Success",
                      message: "Event Updated",
                    })
                  } catch (error) {
                    console.error("Error updating event: ", error)
                  } finally {
                    setLoading(false)
                  }
                }}
                className="bg-blue-600 p-4 rounded-lg active:bg-blue-700"
              >
                <Text className="text-white text-center text-lg font-bold">
                  Update Event
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  )
}

export default EditEvent
