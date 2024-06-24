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

const CreateEvent = () => {
  const { user } = useAuth()
  const [attendaceLimitSwitch, setAttendaceLimitSwitch] =
    useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [location, setLocation] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [eventTitle, setEventTitle] = useState<string>("")
  const [eventStyle, setEventStyle] = useState<string>("")
  const [eventLimit, setEventLimit] = useState<string>("")
  const [date, setDate] = useState<Date>(new Date())
  const [price, setPrice] = useState<string>("")
  const [eventPicture, setEventPicture] =
    useState<ImagePicker.ImagePickerAsset>({} as ImagePicker.ImagePickerAsset)
  const [show, setShow] = useState(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const navigation = useNavigation<NavigationType>()

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
  return (
    <SafeAreaView className="flex-1">
      {!loading ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView className=" p-4 bg-white">
              <View className="flex flex-row justify-center items-center mb-8">
                <Text className="mx-1 text-lg font-semibold ">
                  Create Event
                </Text>
              </View>

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
                    const eventLimitNumber =
                      eventLimit.trim() === "" || attendaceLimitSwitch
                        ? null
                        : Number(eventLimit)

                    // Now we know eventLimitNumber is a number, check if it is zero or any other invalid case
                    if (!eventLimitNumber || eventLimitNumber <= 0) {
                      showAlert({
                        title: "Invalid Limit",
                        message:
                          "Please enter a valid limit greater than zero.",
                      })
                      return // Stop further execution if validation fails
                    }

                    if (!currentUser?.id && !currentUser?.community_created)
                      return
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
                      eventLimitNumber
                    )
                    navigation.goBack()
                    setLoading(false)
                  }, 1000)
                }}
                className=" bg-black p-4 rounded-lg items-center mb-20"
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
