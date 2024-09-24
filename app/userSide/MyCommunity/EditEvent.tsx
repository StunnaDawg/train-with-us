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
                    showAlertFunc({
                      title: "Delete Event",
                      message: "Are you sure you want to delete this event?",
                      buttons: [
                        {
                          text: "Cancel",
                          onPress: () => {},
                          style: "cancel",
                        },
                        {
                          text: "Delete",
                          onPress: deleteEvent,
                          style: "destructive",
                        },
                      ],
                    })
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

              <View className="mb-4">
                <Text className="mb-2 text-sm font-semibold text-gray">
                  Event Tags
                </Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className="flex flex-row justify-center flex-wrap">
                    {ActvitiesOptions.map((activity, index) => {
                      const isSelected = selectedActvities.includes(activity)
                      return (
                        <Pressable
                          onPress={() => handleSelectActivities(activity)}
                          key={index}
                          className={`border-2 rounded-full p-1 text-center mx-1 my-1 ${
                            isSelected
                              ? "bg-yellow-300 border-yellow-400 shadow-xl"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          <Text className={`text-xs font-semibold`}>
                            {activity}
                          </Text>
                        </Pressable>
                      )
                    })}
                  </View>
                </ScrollView>
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
                onPressIn={handleEventButtonPressedIn}
                onPressOut={handleEventButtonPressedOut}
                onPress={async () => {
                  setLoading(true) // Set loading to true immediately

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
                    setLoading(false) // Set loading to false after everything is done
                  }
                }}
                className={`${
                  updateEventPressed ? "opacity-50" : null
                } bg-black p-4 rounded-lg items-center mb-20`}
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
