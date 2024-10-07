import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
  TouchableOpacity,
} from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import BackButton from "../../components/BackButton"
import { CommunityClasses } from "../../@types/supabaseTypes"
import showAlert from "../../utilFunctions/showAlert"
import supabase from "../../../lib/supabase"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"

type DaysOption =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"

const EditSchedule = () => {
  const [scheduleName, setScheduleName] = useState<string>("")
  const [communityClasses, setCommunityClasses] = useState<CommunityClasses[]>(
    []
  )
  const [selectedClass, setSelectedClass] = useState<CommunityClasses>()
  const [selectedClassButton, setSelectedClassButton] = useState<string>("")
  const [date, setDate] = useState(new Date())
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<string[]>([])
  const [recurrenceEnabled, setRecurrenceEnabled] = useState<boolean>(false)
  const [endDate, setEndDate] = useState<boolean>(false)
  const [recurrence_end_date, setRecurrenceEndDate] = useState<Date>(new Date())
  const [show, setShow] = useState(false)

  const route = useRoute<RouteProp<RootStackParamList, "EditSchedule">>()
  const schedule = route.params.schedule
  const communityId = route.params.communityId
  const navigation = useNavigation<NavigationType>()

  const toggleSwitch = () =>
    setRecurrenceEnabled((previousState) => !previousState)
  const toggleEndDate = () => setEndDate((previousState) => !previousState)

  const EditScheduleFunc = async () => {
    try {
      if (!scheduleName || !selectedClass || selectedDayOfWeek.length === 0) {
        showAlert({
          title: "Error",
          message: "Please fill in all required fields",
        })
        return
      }

      const { error } = await supabase
        .from("community_class_schedule")
        .update([
          {
            schedule_name: scheduleName,
            class_id: selectedClass?.id,
            start_time: date,
            selected_days_of_week: selectedDayOfWeek,
            recurring_class: recurrenceEnabled,
            recurrence_end: endDate ? recurrence_end_date : null,
          },
        ])
        .eq("id", schedule.id)
      if (error) {
        showAlert({
          title: "Error",
          message: error.message,
        })
        throw error
      }
      showAlert({
        title: "Success",
        message: "Schedule updated successfully",
      })
      navigation.goBack()
    } catch (error) {
      showAlert({
        title: "Error",
        message: "Unexpected error",
      })
      navigation.goBack()
    }
  }

  const DaysOptions: DaysOption[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]

  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios")
    setDate(currentDate)
  }

  const getClassesFunc = async () => {
    try {
      const { data, error } = await supabase
        .from("community_classes")
        .select("*")
        .eq("community_id", communityId)
      if (error) {
        showAlert({
          title: "Error",
          message: error.message,
        })
        throw error
      }
      if (data) {
        setCommunityClasses(data)
      }
    } catch (error) {
      showAlert({
        title: "Error",
        message: "Unexpected error",
      })
      navigation.goBack()
    }
  }

  useEffect(() => {
    getClassesFunc()
    setScheduleName(schedule.schedule_name)
    setSelectedClass(schedule.class_id)
    setSelectedClassButton(schedule.class_id)
    setDate(new Date(schedule.start_time))
    setSelectedDayOfWeek(schedule.selected_days_of_week)
    setRecurrenceEnabled(schedule.recurring_class)
    setEndDate(schedule.end_date ? true : false)
    setRecurrenceEndDate(
      schedule.end_date ? new Date(schedule.end_date) : new Date()
    )
  }, [schedule, communityId])

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-row justify-between items-center px-4 py-3">
        <BackButton size={24} colour="white" />
        <Text className="text-xl font-bold text-white">Edit Schedule</Text>
        <TouchableOpacity onPress={EditScheduleFunc}>
          <Text className="text-blue-500 font-semibold">Update</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            className="flex-1 px-4 py-6"
            showsVerticalScrollIndicator={false}
          >
            <View className="space-y-6">
              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Schedule Name (Required)
                </Text>
                <TextInput
                  value={scheduleName}
                  onChangeText={setScheduleName}
                  className="bg-white px-4 py-3 rounded-lg"
                  placeholder="Enter schedule name"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Select Class
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {communityClasses.map((classObj) => (
                    <Pressable
                      key={classObj.id}
                      onPress={() => {
                        setSelectedClass(classObj)
                        setSelectedClassButton(classObj.id)
                      }}
                      className={`mr-2 px-4 py-2 rounded-full ${
                        selectedClassButton === classObj.id
                          ? "bg-blue-600 border-blue-700"
                          : "bg-gray-700 border-gray-600"
                      }`}
                    >
                      <Text
                        className={`text-sm font-semibold ${
                          selectedClassButton === classObj.id
                            ? "text-white"
                            : "text-gray-300"
                        }`}
                      >
                        {classObj.class_name}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Start Time
                </Text>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeDate}
                  themeVariant="dark"
                />
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Days of the week
                </Text>
                <View className="flex-row flex-wrap">
                  {DaysOptions.map((day) => (
                    <Pressable
                      key={day}
                      onPress={() => {
                        setSelectedDayOfWeek((prev) => {
                          if (prev.includes(day)) {
                            return prev.filter((item) => item !== day)
                          } else {
                            return [...prev, day]
                          }
                        })
                      }}
                      className={`border-2 rounded-full px-3 py-2 m-1 ${
                        selectedDayOfWeek.includes(day)
                          ? "bg-blue-600 border-blue-700"
                          : "bg-gray-700 border-gray-600"
                      }`}
                    >
                      <Text
                        className={`text-sm font-semibold ${
                          selectedDayOfWeek.includes(day)
                            ? "text-white"
                            : "text-gray-300"
                        }`}
                      >
                        {day}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Recurrence
                </Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-white">
                    Will this class reoccur every week?
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#3b82f6" }}
                    thumbColor={recurrenceEnabled ? "#60a5fa" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={recurrenceEnabled}
                  />
                </View>
              </View>

              {recurrenceEnabled && (
                <View>
                  <Text className="text-lg text-white font-bold mb-2">
                    End Date
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-white">
                      Will there be an End Date?
                    </Text>
                    <Switch
                      trackColor={{ false: "#767577", true: "#3b82f6" }}
                      thumbColor={endDate ? "#60a5fa" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleEndDate}
                      value={endDate}
                    />
                  </View>
                  {endDate && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={recurrence_end_date}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || recurrence_end_date
                        setShow(Platform.OS === "ios")
                        setRecurrenceEndDate(currentDate)
                      }}
                      themeVariant="dark"
                    />
                  )}
                </View>
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default EditSchedule
