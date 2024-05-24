import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import { CommunityRequests } from "../../@types/supabaseTypes"
import { FontAwesome6 } from "@expo/vector-icons"
import getCommunityRequests from "../../supabaseFunctions/getFuncs/getCommunityRequests"
import acceptRequest from "../../supabaseFunctions/addFuncs/acceptRequest"
import denyRequest from "../../supabaseFunctions/addFuncs/denyRequest"
import showAlert from "../../utilFunctions/showAlert"
import { set } from "date-fns"

const CommunityRequestsPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [communityRequests, setCommunityRequests] = useState<
    CommunityRequests[] | null
  >([])
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const route = useRoute<RouteProp<RootStackParamList, "MyCommunityRequests">>()
  const communityId = route.params.communityId
  const navigation = useNavigation<NavigationType>()

  const acceptRequestFunc = async (request: CommunityRequests) => {
    try {
      setLoading(true)
      if (request.user_id && request.requested_community && request.id)
        acceptRequest(
          setLoading,
          request.user_id,
          request.requested_community,
          request.id
        )
      showAlert({
        title: "Request Accepted",
        message: "User has been added to the community",
      })
      setTimeout(() => {
        getCommunityRequests(setLoading, communityId, setCommunityRequests)
      }, 500)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getCommunityRequests(setLoading, communityId, setCommunityRequests)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])
  useEffect(() => {
    getCommunityRequests(setLoading, communityId, setCommunityRequests)
  }, [])
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center">
        <Text className="font-bold text-2xl">Join Requests</Text>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <ActivityIndicator />
        ) : communityRequests && communityRequests?.length > 0 ? (
          communityRequests?.map((request) => (
            <View
              key={request.id}
              className="flex flex-row justify-between mx-5"
            >
              <Pressable
                onPress={async () => {
                  if (request.user_id !== null) {
                    navigation.navigate("ViewRequestProfile", {
                      userId: request.user_id,
                    })
                  } else {
                    showAlert({ title: "Error", message: "User not found" })
                  }
                }}
                className="flex flex-row items-center"
                key={request.user_id}
              >
                <Text className="text-2xl font-bold px-2">
                  {request.first_name}
                </Text>
                <FontAwesome6 name="eye" size={24} color="black" />
              </Pressable>
              <View className="flex flex-row ">
                <Pressable
                  onPress={async () => {
                    await acceptRequestFunc(request)
                  }}
                  className="mx-5"
                >
                  <FontAwesome6 name="square-check" size={36} color="green" />
                </Pressable>
                <Pressable
                  onPress={() => {
                    if (request.id) denyRequest(setLoading, request.id)
                    showAlert({
                      title: "Request Denied",
                      message: "User has been Denied Access",
                    })
                    setTimeout(() => {
                      getCommunityRequests(
                        setLoading,
                        communityId,
                        setCommunityRequests
                      )
                    }, 500)
                  }}
                >
                  <FontAwesome6 name="square-xmark" size={36} color="red" />
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          <Text>No requests</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default CommunityRequestsPage
