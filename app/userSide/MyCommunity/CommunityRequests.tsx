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
import {
  Communities,
  CommunityRequests,
  Profile,
} from "../../@types/supabaseTypes"
import { FontAwesome6 } from "@expo/vector-icons"
import getCommunityRequests from "../../supabaseFunctions/getFuncs/getCommunityRequests"
import acceptRequest from "../../supabaseFunctions/addFuncs/acceptRequest"
import denyRequest from "../../supabaseFunctions/addFuncs/denyRequest"
import showAlert from "../../utilFunctions/showAlert"
import getSingleCommunity from "../../supabaseFunctions/getFuncs/getSingleCommunity"
import BackButton from "../../components/BackButton"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { set } from "mongoose"

const CommunityRequestsPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [community, setCommunity] = useState<Communities | null>(null)
  const [communityRequests, setCommunityRequests] = useState<
    CommunityRequests[] | null
  >([])
  const [viewUserProfile, setViewUserProfile] = useState<Profile | null>(null)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [acceptButtonPressed, setAcceptButtonPressed] = useState<string | null>(
    null
  )
  const [denyButtonPressed, setDenyButtonPressed] = useState<string | null>(
    null
  )

  const [eyePressed, setEyePressed] = useState<string | null>(null)

  const handleAcceptButtonPressed = (requestId: string) => {
    setAcceptButtonPressed(requestId)
  }
  const handleAcceptButtonReleased = () => {
    setAcceptButtonPressed(null)
  }

  const handleDenyButtonPressed = (requestId: string) => {
    setDenyButtonPressed(requestId)
  }

  const handleDenyButtonReleased = () => {
    setDenyButtonPressed(null)
  }

  const handleEyePressed = (requestId: string) => {
    setEyePressed(requestId)
  }

  const handleEyeReleased = () => {
    setEyePressed(null)
  }

  const route = useRoute<RouteProp<RootStackParamList, "MyCommunityRequests">>()
  const communityId = route.params.communityId
  const communityTitle = route.params.communityTitle
  const navigation = useNavigation<NavigationType>()
  const title = `${communityTitle || ""}`
  const acceptRequestFunc = async (request: CommunityRequests) => {
    try {
      setLoading(true)

      if (request.requested_community !== null) {
        getSingleCommunity(
          setLoading,
          request.requested_community,
          setCommunity
        )
      }

      if (
        request.user_id &&
        request.requested_community &&
        request.id &&
        community
      ) {
        acceptRequest(
          setLoading,
          request.user_id,
          request.expo_push_token,
          community,
          request.id
        )
        showAlert({
          title: "Request Accepted",
          message: "User has been added to the community",
        })
        setTimeout(() => {
          getCommunityRequests(setLoading, communityId, setCommunityRequests)
        }, 500)
      }
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
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex flex-row justify-between items-center mx-2">
        <BackButton colour="white" />
        <View>
          <Text className="font-bold text-xl text-white">Join Requests</Text>
        </View>
        <View />
      </View>

      <ScrollView
        className="flex-1 "
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <ActivityIndicator />
        ) : communityRequests && communityRequests?.length > 0 ? (
          communityRequests?.map((request) => {
            return (
              <View
                key={request.id}
                className="flex flex-row justify-between m-5"
              >
                <Pressable
                  onPressIn={() => handleEyePressed(request.id)}
                  onPressOut={handleEyeReleased}
                  onPress={async () => {
                    if (request.user_id) {
                      const userProfile = await useCurrentUser(
                        request.user_id,
                        setViewUserProfile
                      )
                      if (userProfile) {
                        navigation.navigate("ViewFullUserProfile", {
                          user: userProfile,
                        })
                      }
                    } else {
                      showAlert({ title: "Error", message: "User not found" })
                    }
                  }}
                  className={` ${
                    eyePressed === request.id ? "opacity-50" : ""
                  } flex flex-row items-center`}
                  key={request.user_id}
                >
                  <Text className="text-lg text-white font-semibold px-2">
                    {request.first_name}
                  </Text>
                  <FontAwesome6 name="eye" size={24} color="white" />
                </Pressable>
                <View className="flex flex-row ">
                  <Pressable
                    onPressIn={() => handleAcceptButtonPressed(request.id)}
                    onPressOut={handleAcceptButtonReleased}
                    onPress={async () => {
                      await acceptRequestFunc(request)
                    }}
                    className={`${
                      acceptButtonPressed === request.id ? "opacity-50" : null
                    } mx-5`}
                  >
                    <FontAwesome6 name="square-check" size={48} color="green" />
                  </Pressable>
                  <Pressable
                    onPressIn={() => handleDenyButtonPressed(request.id)}
                    onPressOut={handleDenyButtonReleased}
                    onPress={() => {
                      if (request.id)
                        denyRequest(
                          setLoading,
                          request.id,
                          request.expo_push_token,
                          title
                        )
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
                    className={`${
                      denyButtonPressed === request.id ? "opacity-50" : null
                    }`}
                  >
                    <FontAwesome6 name="square-xmark" size={48} color="red" />
                  </Pressable>
                </View>
              </View>
            )
          })
        ) : (
          <View className="flex-1 justify-center items-center">
            <View className="flex flex-row justify-center">
              <Text className="text-lg text-white font-semibold">
                No requests at the moment
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default CommunityRequestsPage
