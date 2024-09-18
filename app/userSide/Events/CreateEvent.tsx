import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
} from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType } from "../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import addNewEvent from "../../supabaseFunctions/addFuncs/addEvent"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import NewPhoto from "../../components/NewPhoto"
import * as ImagePicker from "expo-image-picker"
import showAlert from "../../utilFunctions/showAlert"
import Loading from "../../components/Loading"
import BackButton from "../../components/BackButton"

type ActvitiesOption = string

const CreateEvent = () => {
  const { user } = useAuth()
  const [createEventPressed, setCreateEventPressed] = useState<boolean>(false)
  const [attendaceLimitSwitch, setAttendaceLimitSwitch] =
    useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [location, setLocation] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [eventTitle, setEventTitle] = useState<string>("")
  const [eventStyle, setEventStyle] = useState<string>("")
  const [eventLimit, setEventLimit] = useState<string>("")
  const [selectedActvities, setSelectedActvities] = useState<ActvitiesOption[]>(
    []
  )
  const [date, setDate] = useState<Date>(new Date())
  const [price, setPrice] = useState<string>("")
  const [eventPicture, setEventPicture] =
    useState<ImagePicker.ImagePickerAsset>({} as ImagePicker.ImagePickerAsset)
  const [show, setShow] = useState(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const navigation = useNavigation<NavigationType>()

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
    setCreateEventPressed(true)
  }

  const handleEventButtonPressedOut = () => {
    setCreateEventPressed(false)
  }

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
  }, [])

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
      <View className="flex flex-row items-center justify-between mx-1 p-1">
        <BackButton />
        <Text className="mx-1 text-lg font-semibold ">Create Event</Text>
        <View />
      </View>

      {!loading ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView className=" p-4 bg-white">
              <View>
                <NewPhoto setProfilePic={setEventPicture} />
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
                  value={price}
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
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Set a valid location"
                  className="border  p-2 rounded-lg"
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
                  setLoading(true)
                  const eventLimitNumber =
                    eventLimit.trim() === "" || !attendaceLimitSwitch
                      ? null
                      : Number(eventLimit)

                  if (attendaceLimitSwitch) {
                    if (!eventLimitNumber || eventLimitNumber <= 0) {
                      setAttendaceLimitSwitch(false)
                    }
                  }

                  if (!currentUser?.id && !currentUser?.community_created)
                    return

                  console.log(eventLimitNumber)
                  addNewEvent(
                    setLoading,
                    currentUser?.id,
                    eventTitle,
                    currentUser?.community_created,
                    date,
                    Number(price),
                    description,
                    eventPicture,
                    location,
                    eventStyle,
                    eventLimitNumber,
                    selectedActvities
                  )
                  navigation.goBack()
                  setLoading(false)
                }}
                className={`${
                  createEventPressed ? "bg-opacity-50" : "bg-black"
                } p-4 rounded-lg items-center mb-20`}
              >
                <Text className="text-white text-lg font-bold">
                  Create Event
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

export default CreateEvent
