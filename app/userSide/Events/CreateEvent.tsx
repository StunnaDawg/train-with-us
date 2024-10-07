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
  TouchableOpacity,
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
import { FontAwesome6 } from "@expo/vector-icons"
import showAlertFunc from "../../utilFunctions/showAlertFunc"

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
  const [eventChatSwitch, setEventChatSwitch] = useState<boolean>(false)
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
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-row justify-between items-center px-4 py-3">
        <BackButton size={24} colour="white" />
        <Text className="text-xl font-bold text-white">Create Event</Text>
        <View style={{ width: 24 }} />
      </View>

      {!loading ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
          className="flex-1"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView className="flex-1 px-4 py-6">
              <View className="space-y-6">
                <View>
                  <Text className="text-lg text-white font-bold mb-2">
                    Event Photo
                  </Text>
                  <NewPhoto
                    heightProp={200}
                    widthProp={200}
                    setProfilePic={setEventPicture}
                  />
                </View>

                <View>
                  <Text className="text-lg text-white font-bold mb-2">
                    Title
                  </Text>
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
                  <Text className="text-lg text-white font-bold mb-2">
                    Date
                  </Text>
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
                  <Text className="text-lg text-white font-bold mb-2">
                    Time
                  </Text>
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
                  <Text className="text-lg text-white font-bold mb-2">
                    Price
                  </Text>
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
                    placeholder="Set a valid location"
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
                    <View className="flex-row justify-between items-center">
                      <Text className="text-white font-semibold">
                        Event Chat
                      </Text>
                      <Switch
                        value={eventChatSwitch}
                        onValueChange={() =>
                          setEventChatSwitch(!eventChatSwitch)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View className="px-4 py-3 mb-5">
                <TouchableOpacity
                  onPress={() =>
                    showAlertFunc({
                      title: "Create Event",
                      message: "Are you sure you want to create this event?",
                      buttons: [
                        {
                          text: "Yes",
                          onPress: async () => {
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

                            if (
                              !currentUser?.id &&
                              !currentUser?.community_created
                            )
                              return

                            await addNewEvent(
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
                              selectedActvities,
                              eventChatSwitch
                            )
                            navigation.goBack()
                            setLoading(false)
                          },
                          style: "default",
                        },
                        {
                          text: "No",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                      ],
                    })
                  }
                  className="bg-blue-600 p-4 rounded-lg active:bg-blue-700"
                >
                  <Text className="text-white text-center text-lg font-bold">
                    Create Event
                  </Text>
                </TouchableOpacity>
              </View>
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
