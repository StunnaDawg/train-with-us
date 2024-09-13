import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import EditProfileTopBar from "../../components/TopBarEdit"
import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"

type ActvitiesOption = string

const EditClass = () => {
  const [className, setClassName] = useState<string>("")
  const [classAbout, setClassAbout] = useState<string>("")
  const [classDuration, setClassDuration] = useState<string>("")
  const [selectedActvities, setSelectedActvities] = useState<ActvitiesOption[]>(
    []
  )
  const route = useRoute<RouteProp<RootStackParamList, "EditClass">>()
  const classId = route.params.classId
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

  const getClassFunc = async () => {
    try {
      if (!classId) {
        showAlert({
          title: "Error",
          message: "Class ID is required",
        })
        navigation.goBack()
      }
      const { data, error } = await supabase
        .from("community_classes")
        .select("*")
        .eq("id", classId)
        .single()
      if (error) {
        showAlert({
          title: "Error",
          message: error.message,
        })
        navigation.goBack()
      }
      if (data) {
        setClassName(data.class_name)
        setClassAbout(data.class_about)
        setClassDuration(data.duration.toString())
        setSelectedActvities(data.class_tags)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  const EditClassFunc = async () => {
    if (!className || !classDuration) {
      alert("Please fill in all required fields")
      return
    }
    try {
      const { error } = await supabase
        .from("community_classes")
        .update([
          {
            class_name: className,
            description: classAbout,
            duration: Number(classDuration),
            class_tags: selectedActvities,
          },
        ])
        .eq("id", classId)
      if (error) {
        console.log("error", error)
        alert("Error updating class")
      }

      showAlert({
        title: "Class Updated",
        message: "Your class has been updated successfully",
      })
      navigation.goBack()
    } catch (error) {
      console.log("error", error)
    }
  }

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

  useEffect(() => {
    getClassFunc()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <EditProfileTopBar
        text="Create Class"
        doneButtonText="Update"
        functionProp={() => EditClassFunc()}
      />

      <View className="pb-10 pt-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex flex-row mx-5">
                <View className="w-full">
                  <Text className="font-bold text-sm text-white">
                    Class Name (Required)
                  </Text>
                  <View className="border rounded-lg p-2 w-full bg-white">
                    <TextInput
                      value={className} // Binds the TextInput value to the state
                      onChangeText={setClassName}
                    />
                  </View>

                  <Text className="font-bold text-sm text-white">
                    Class Description
                  </Text>
                  <View className="border rounded-lg p-2 w-full bg-white">
                    <TextInput
                      value={classAbout}
                      onChangeText={setClassAbout}
                      placeholder="Description of your class..."
                      multiline={true}
                      numberOfLines={10}
                      className="h-20"
                    />
                  </View>

                  <Text className="font-bold text-sm text-white">
                    Class Duration in minutes (Required)
                  </Text>
                  <View className="border rounded-lg p-2 w-full bg-white">
                    <TextInput
                      keyboardType="numeric"
                      value={classDuration}
                      onChangeText={setClassDuration}
                    />
                  </View>

                  <View className="mb-4">
                    <Text className="mb-2 text-white text-sm font-semibold text-gray">
                      Class Tags
                    </Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <View className="flex flex-row justify-center flex-wrap">
                        {ActvitiesOptions.map((activity, index) => {
                          const isSelected =
                            selectedActvities.includes(activity)
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
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  )
}

export default EditClass
