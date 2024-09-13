import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import EditProfileTopBar from "../../components/TopBarEdit"
import showAlert from "../../utilFunctions/showAlert"
import supabase from "../../../lib/supabase"
import { CommunityClasses } from "../../@types/supabaseTypes"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"

const CreateSchedule = () => {
  const [communityClasses, setCommunityClasses] = useState<CommunityClasses[]>(
    []
  )

  const [selectedClass, setSelectedClass] = useState<CommunityClasses | null>(
    null
  )

  const [selectedClassButton, setSelectedClassButton] = useState<string | null>(
    null
  )
  const [date, setDate] = useState<Date>(new Date())
  const [show, setShow] = useState(false)

  const route = useRoute<RouteProp<RootStackParamList, "CreateSchedule">>()
  const communityId = route.params.communityId
  const navigation = useNavigation<NavigationType>()

  const CreateScheduleFunc = async () => {
    if (!selectedClass) {
      showAlert({
        title: "Error",
        message: "Please select a class",
      })
      return
    }

    try {
      const { error } = await supabase.from("class_schedule").insert([
        {
          class_id: selectedClass.id,
          community_id: communityId,
        },
      ])
      if (error) {
        showAlert({
          title: "Error",
          message: error.message,
        })
        throw error
      }
      showAlert({
        title: "Success",
        message: "Schedule created successfully",
      })
      navigation.goBack()
    } catch (error) {
      showAlert({
        title: "Error",
        message: "Unexpected error",
      })
    }
  }

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
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <EditProfileTopBar
        text="Create Schedule"
        doneButtonText="Create"
        functionProp={() => CreateScheduleFunc()}
      />

      <View className="flex flex-row items-center">
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
                    selectedClassButton === classObj.id ? "bg-yellow-500" : null
                  } p-2 rounded-md`}
                >
                  <Text className="text-white">{classObj.class_name}</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      <View className="pb-10 pt-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex flex-row mx-5">
                <View className="w-full">
                  <View className="mb-4">
                    {/* Instead of Dates we need to pick days of the week, since 1 time classes are events and can be slotted into the schedule as well */}
                    {/* So ask the days that the classes are, amount on each day, and then the times for each of those classes sheesh so confusing */}
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
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  )
}

export default CreateSchedule
