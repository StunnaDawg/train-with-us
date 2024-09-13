import { View, Text, SafeAreaView, FlatList, Pressable } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import BackButton from "../../components/BackButton"
import EditProfileTopBar from "../../components/TopBarEdit"
import { CommunityClasses } from "../../@types/supabaseTypes"
import supabase from "../../../lib/supabase"
import showAlert from "../../utilFunctions/showAlert"

const ManageClasses = () => {
  const [communityClasses, setCommunityClasses] = useState<CommunityClasses[]>(
    []
  )
  const route = useRoute<RouteProp<RootStackParamList, "ManageClasses">>()
  const community = route.params.community
  const navigation = useNavigation<NavigationType>()

  const getClassesFunc = async () => {
    console.log(community.id)
    try {
      const { data, error } = await supabase
        .from("community_classes")
        .select("*")
        .eq("community_id", community.id)
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

  useFocusEffect(
    useCallback(() => {
      let isMounted = true
      getClassesFunc()
      return () => {
        isMounted = false
      }
    }, [])
  )

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <EditProfileTopBar
        text="Manage Classes"
        cancelText={"Back"}
        doneButtonText="Create"
        functionProp={() =>
          navigation.navigate("CreateClass", {
            communityId: community.id,
          })
        }
      />

      <FlatList
        data={communityClasses}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("EditClass", {
                classId: item.id,
              })
            }}
          >
            <Text className="text-white">{item.class_name}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

export default ManageClasses
