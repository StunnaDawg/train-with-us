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

const CommunityRequestsPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [communityRequests, setCommunityRequests] = useState<
    CommunityRequests[] | null
  >([])
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const route = useRoute<RouteProp<RootStackParamList, "MyCommunityRequests">>()
  const communityId = route.params.communityId
  const navigation = useNavigation<NavigationType>()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
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
            <View className="flex flex-row justify-between mx-5">
              <Pressable
                onPress={() => {
                  if (request.user_id)
                    navigation.navigate("ViewRequestProfile", {
                      userId: request.user_id,
                    })
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
                  onPress={() => {
                    if (
                      request.user_id &&
                      request.requested_community &&
                      request.id
                    )
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

                    getCommunityRequests(
                      setLoading,
                      communityId,
                      setCommunityRequests
                    )
                  }}
                  className="mx-5"
                >
                  <FontAwesome6 name="square-check" size={36} color="green" />
                </Pressable>
                <Pressable
                  onPress={() => {
                    if (request.id) denyRequest(setLoading, request.id)
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
