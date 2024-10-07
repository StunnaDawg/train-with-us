import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import BackButton from "../../components/BackButton"
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
        setClassAbout(data.description)
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
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-row justify-between items-center px-4 py-3">
        <BackButton size={24} colour="white" />
        <Text className="text-xl font-bold text-white">Edit Class</Text>
        <TouchableOpacity onPress={EditClassFunc}>
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
                  Class Name (Required)
                </Text>
                <TextInput
                  value={className}
                  onChangeText={setClassName}
                  className="bg-white px-4 py-3 rounded-lg"
                  placeholder="Enter class name"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Class Description
                </Text>
                <TextInput
                  value={classAbout}
                  onChangeText={setClassAbout}
                  placeholder="Description of your class..."
                  multiline={true}
                  numberOfLines={6}
                  className="bg-white px-4 py-3 rounded-lg"
                  textAlignVertical="top"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Class Duration in minutes (Required)
                </Text>
                <TextInput
                  keyboardType="numeric"
                  value={classDuration}
                  onChangeText={setClassDuration}
                  className="bg-white px-4 py-3 rounded-lg"
                  placeholder="Enter duration"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View>
                <Text className="text-lg text-white font-bold mb-2">
                  Class Tags
                </Text>
                <ScrollView showsHorizontalScrollIndicator={false}>
                  <View className="flex-row flex-wrap justify-center mb-8">
                    {ActvitiesOptions.map((activity, index) => {
                      const isSelected = selectedActvities.includes(activity)
                      return (
                        <Pressable
                          onPress={() => handleSelectActivities(activity)}
                          key={index}
                          className={`border-2 rounded-full px-3 py-2 m-1 ${
                            isSelected
                              ? "bg-blue-600 border-blue-700"
                              : "bg-gray-700 border-gray-600"
                          }`}
                        >
                          <Text
                            className={`text-sm font-semibold ${
                              isSelected ? "text-white" : "text-gray-300"
                            }`}
                          >
                            {activity}
                          </Text>
                        </Pressable>
                      )
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default EditClass
