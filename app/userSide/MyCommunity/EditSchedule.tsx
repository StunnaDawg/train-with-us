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
} from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import EditProfileTopBar from "../../components/TopBarEdit"
import { CommunityClasses } from "../../@types/supabaseTypes"
import showAlert from "../../utilFunctions/showAlert"
import supabase from "../../../lib/supabase"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"

import BouncyCheckbox from "react-native-bouncy-checkbox"
import { set } from "mongoose"

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
  const [recurrenceEnabled, setRecurrenceEnabled] = useState<boolean>()
  const [endDate, setEndDate] = useState<boolean>(false)
  const [recurrence_end_date, setRecurrenceEndDate] = useState<Date>()
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
    setShow(Platform.OS === "ios") // For iOS, keep the picker open
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
        console.log(data)
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
    setRecurrenceEndDate(new Date(schedule.end_date))
  }, [schedule, communityId])

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <EditProfileTopBar
        text="Edit Schedule"
        doneButtonText="Update"
        functionProp={() => EditScheduleFunc()}
      />

      <View>
        <View>
          <Text className="font-bold text-sm text-white">
            Schedule Name (Required)
          </Text>
          <View className="border rounded-lg p-2 w-full bg-white">
            <TextInput value={scheduleName} onChangeText={setScheduleName} />
          </View>
        </View>

        <View>
          <View>
            <Text className="text-white">
              Which class do you want to create a schedule for
            </Text>

            <ScrollView horizontal={true} className="flex flex-row">
              {communityClasses.map((classObj) => (
                <View key={classObj.id} className="mx-1">
                  <Pressable
                    onPress={() => {
                      setSelectedClass(classObj),
                        setSelectedClassButton(classObj.id)
                    }}
                    className={`${
                      selectedClassButton === classObj.id
                        ? "bg-yellow-500"
                        : null
                    } p-2 rounded-md`}
                  >
                    <Text className="text-white">{classObj.class_name}</Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>

      <View className="pb-10 pt-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex flex-row mx-5">
              <View className="w-full">
                <View className="mb-4">
                  <Text className="mb-2 text-sm font-semibold text-white">
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
                <View className="mb-4">
                  {/* Instead of Dates we need to pick days of the week, since 1 time classes are events and can be slotted into the schedule as well */}
                  {/* So ask the days that the classes are, amount on each day, and then the times for each of those classes sheesh so confusing */}
                  <Text className="mb-2 text-sm font-semibold text-white">
                    Days of the week
                  </Text>

                  <View className="flex flex-row justify-center flex-wrap">
                    {DaysOptions.map((day) => (
                      <View key={day} className="m-1">
                        <BouncyCheckbox
                          isChecked={selectedDayOfWeek.includes(day)}
                          size={25}
                          fillColor="#eab308"
                          unFillColor="#FFFFFF"
                          text={day}
                          textStyle={{
                            color: "#FFFFFF",
                            textDecorationLine: "none",
                          }}
                          onPress={() => {
                            setSelectedDayOfWeek((prev) => {
                              if (prev.includes(day)) {
                                return prev.filter((item) => item !== day)
                              } else {
                                return [...prev, day]
                              }
                            })
                          }}
                        />
                      </View>
                    ))}
                  </View>
                </View>

                <View>
                  <View className="flex flex-row justify-center items-center">
                    <Text className="mb-2 text-sm font-semibold text-white">
                      Will this class reoccur every week?
                    </Text>
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={recurrenceEnabled ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={recurrenceEnabled}
                    />
                  </View>

                  {recurrenceEnabled ? (
                    <>
                      <View className="flex flex-row justify-center items-center">
                        <Text className="mb-2 text-sm font-semibold text-white">
                          Will there be an End Date?
                        </Text>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={endDate ? "#f5dd4b" : "#f4f3f4"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={toggleEndDate}
                          value={endDate}
                        />
                      </View>
                      {endDate ? (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={recurrence_end_date || new Date()}
                          mode="date"
                          display="default"
                          onChange={(event, selectedDate) => {
                            const currentDate =
                              selectedDate || recurrence_end_date
                            setShow(Platform.OS === "ios")
                            setRecurrenceEndDate(currentDate)
                          }}
                          themeVariant="dark"
                        />
                      ) : null}
                    </>
                  ) : null}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  )
}

export default EditSchedule
