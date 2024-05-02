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
import { NavigationType } from "../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import addNewEvent from "../../supabaseFunctions/addFuncs/addEvent"
import { set } from "date-fns"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import NewPhoto from "../../components/NewPhoto"
import * as ImagePicker from "expo-image-picker"

const CreateEvent = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [description, setDescription] = useState<string>("")
  const [eventTitle, setEventTitle] = useState<string>("")
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
      <ScrollView className=" p-4 bg-white">
        <View className="flex flex-row items-center mb-8">
          <Text className="mx-1 text-3xl font-semibold ">Create Event</Text>
        </View>

        <View>
          <NewPhoto setProfilePic={setEventPicture} />
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
            value={price}
            onChangeText={setPrice}
            placeholder="Set a Price"
            className="border  p-2 rounded-lg"
            keyboardType="numeric"
          />
          <Pressable
            onPress={async () => {
              setTimeout(() => {
                if (!currentUser?.id && !currentUser?.community_created) return
                addNewEvent(
                  setLoading,
                  currentUser?.id,
                  eventTitle,
                  currentUser?.community_created,
                  date,
                  Number(price),
                  description,
                  eventPicture
                )
                navigation.goBack()
              }, 2000)
            }}
            className=" bg-black p-4 rounded-lg items-center mb-20"
          >
            <Text className="text-white text-xl font-bold">Create Event</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateEvent
