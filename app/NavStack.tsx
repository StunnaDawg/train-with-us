import {
  NavigationType,
  RootStackParamList,
  TabParamList,
} from "./@types/navigation"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavBar } from "../components"
import Login from "./UserAuth/Login"
import SignUp from "./UserAuth/SignUp"
import { useAuth } from "./supabaseFunctions/authcontext"
import { FontAwesome6 } from "@expo/vector-icons"
import Events from "./userSide/Events/Events"
import Question1 from "./UserOnBoard/Question1"
import Question2 from "./UserOnBoard/Question2"
import Question3 from "./UserOnBoard/Question3"
import Question4 from "./UserOnBoard/Question4"
import { useEffect, useState } from "react"
import useCurrentUser from "./supabaseFunctions/getFuncs/useCurrentUser"
import getUserId from "./supabaseFunctions/getFuncs/getUserId"
import { Database } from "./@types/supabase"
import CommunitiesHome from "./userSide/Communities/CommunitiesHome"
import CommunitiesDash from "./userSide/UserCommunities/CommunitiesDash"
import Connections from "./userSide/Connections/Connections"
import MessageScreen from "./userSide/UserCommunities/components/MessageScreen"
import ViewEvent from "./userSide/Events/ViewEvent"
import EventCheckout from "./userSide/Events/EventCheckout"
import ViewCommunities from "./userSide/Communities/ViewCommunities"
import Sexuality from "./UserOnBoard/Sexuality"
import FitnessInterests from "./UserOnBoard/FitnessInterests"
import CommunityPreference from "./UserOnBoard/CommunitiesPref"
import ActivityTimePreference from "./UserOnBoard/ActvityTimePreference"
import EditProfile from "./userSide/Profile/EditProfile"
import CreateCommunity from "./userSide/CreateCommunity/CreateCommunity"
import CreateEvent from "./userSide/Events/CreateEvent"
import CommunityMembers from "./userSide/Communities/CommunityMembers"
import ViewUserProfile from "./userSide/Communities/ViewUserProfile"
import ProfileView from "./userSide/Profile/Profile"
import CommunityHome from "./userSide/MyCommunity/CommunityHome"
import CommunitySettings from "./userSide/MyCommunity/CommunitySettings"
import CreateChannel from "./userSide/MyCommunity/CreateChannel"
import ManageCommunityMembers from "./userSide/MyCommunity/ManageCommunityMembers"
import CommunityRequestsPage from "./userSide/MyCommunity/CommunityRequests"
import ViewRequestProfile from "./userSide/MyCommunity/ViewRequestProfile"
import ChannelMessageScreen from "./userSide/UserCommunities/components/ChannelMessages"
import AddMoreInfo from "./userSide/Profile/AddMoreInfo"
import PurchaseScreen from "./userSide/Events/PurchaseScreen"
import MyEvents from "./userSide/Events/MyEvents"
import ViewEventGoers from "./userSide/Events/ViewEventGoers"
import ManageEvents from "./userSide/Events/ManageEvents"
import * as SplashScreen from "expo-splash-screen"
import ManageCommunityEvents from "./userSide/MyCommunity/ManageCommunityEvents"
import EditEvent from "./userSide/MyCommunity/EditEvent"
import EnableNotifcations from "./UserOnBoard/EnableNotifcations"
import Location from "./UserOnBoard/Location"
import MusicPref from "./userSide/Profile/AddInfoComponents/MusicPref"
import FitnessGoals from "./userSide/Profile/AddInfoComponents/FitnessGoals"
import ExperienceLvl from "./userSide/Profile/AddInfoComponents/ExperienceLvl"
import OtherHobbies from "./userSide/Profile/AddInfoComponents/OtherHobbies"
import FitnessBucketList from "./userSide/Profile/AddInfoComponents/FitnessBucketList"
import FitnessRecords from "./userSide/Profile/AddInfoComponents/FitnessRecords"
import CommunityPage from "./userSide/UserCommunities/CommunityPage"
import PrimaryGym from "./userSide/Profile/AddInfoComponents/PrimaryGym"
import ViewAllEvents from "./userSide/Events/ViewAllEvents"
import SearchCommunities from "./userSide/Communities/SearchCommunities"
import SearchUsers from "./userSide/Connections/SearchUsers"
import ManageChannels from "./userSide/MyCommunity/ManageChannels"
import EditChannel from "./userSide/MyCommunity/EditChannel"
import Settings from "./userSide/Settings"
import TitleScreen from "./UserAuth/TitleScreen"
import LoginWithEmail from "./UserAuth/LoginWithEmail"
import SignUpWithEmail from "./UserAuth/SignUpWithEmail"
import ViewFullUserProfile from "./userSide/Connections/ViewFullUserProfile"
import AnnoucementsScreen from "./userSide/UserCommunities/components/AnnoucmentChannel"
import AddBio from "./userSide/Profile/AddInfoComponents/AddBio"
import ManageConnections from "./userSide/ManageConnections"
import * as Notifications from "expo-notifications"
import { useNavigation } from "@react-navigation/native"
import Messages from "./userSide/UserCommunities/components/Messages"
import SexualityEdit from "./userSide/Profile/AddInfoComponents/SexualityEdit"
import EventAttendees from "./userSide/Events/components/EventAttendees"
import CreateNewsPost from "./userSide/MyCommunity/CreateNewsPost"
import ViewFullUserProfileFromMessages from "./userSide/UserCommunities/components/ViewUserProfileFromMessage"

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<TabParamList>()

const UserFooter = () => {
  return (
    <Tab.Navigator
      initialRouteName="Events"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName

          if (route.name === "Events") {
            iconName = "calendar-day"
          } else if (route.name === "Communities") {
            iconName = "user-group"
          } else if (route.name === "Profile") {
            iconName = "user-large"
          } else if (route.name === "Connections") {
            iconName = "people-group"
          } else if (route.name === "Messages") {
            iconName = "message"
          } else if (route.name === "Community") {
            iconName = "house"
          }

          return <FontAwesome6 name={iconName} size={20} color={color} />
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Communities" component={CommunitiesHome} />
      <Tab.Screen name="Connections" component={Connections} />

      <Tab.Screen name="Community" component={CommunitiesDash} />
      <Tab.Screen name="Profile" component={ProfileView} />
    </Tab.Navigator>
  )
}

const NavStack = () => {
  const { user } = useAuth()
  const [currentUserId, setCurrentUserId] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [appReady, setAppReady] = useState<boolean>(false)
  const [userProfile, setUserProfile] = useState<
    Database["public"]["Tables"]["profiles"]["Row"] | null
  >(null)
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    getUserId(setCurrentUserId)
  }, [])

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("response from notification", response.notification)
        const data = response.notification.request.content.data
        console.log("data from notification", JSON.stringify(data))
        if (data.chatSession) {
          navigation.navigate("MessagingScreen", {
            chatSession: data.chatSession,
          })
        } else if (data.channel) {
          navigation.navigate("ChannelScreen", { channelId: data.channel })
        } else if (data.type === "community_request_sent") {
          navigation.navigate("MyCommunityRequests", {
            communityId: data.communityId,
            communityTitle: data.communityTitle,
          })
        } else if (data.type === "request_accepted") {
          navigation.navigate("CommunityPage", {
            community: data.community,
          })
        } else if (data.type === "event_joined") {
          navigation.navigate("ViewEvent", { eventId: data.eventId })
        } else if (data.type === "new_event") {
          navigation.navigate("ViewEvent", { eventId: data.eventId })
        } else if (data.type === "connection_request") {
          navigation.navigate("DirectMessageTab")
        } else if (data.type === "connection_accepted") {
          navigation.navigate("MessagingScreen", {
            chatSession: data.chatSession,
          })
        }
      }
    )

    return () => subscription.remove()
  }, [])

  useEffect(() => {
    const setProfile = async () => {
      try {
        setLoading(true)
        if (currentUserId) {
          useCurrentUser(currentUserId, setUserProfile)
        } else {
          console.log("no user")
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    setProfile()
  }, [currentUserId])

  useEffect(() => {
    if (userProfile) {
      setAppReady(true)
      setTimeout(() => {
        SplashScreen.hideAsync()
      }, 1000)
    } else {
      setAppReady(true)
      setTimeout(() => {
        SplashScreen.hideAsync()
      }, 1000)
    }
  }, [userProfile])
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          {userProfile?.onboard ? (
            <Stack.Group>
              <Stack.Screen name="Footer" component={UserFooter} />

              <Stack.Screen
                options={{ headerShown: false }}
                name="MyCommunityHome"
                component={CommunityHome}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="EditBio"
                component={AddBio}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ViewFullUserProfile"
                component={ViewFullUserProfile}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="UserSettings"
                component={Settings}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ManageConnections"
                component={ManageConnections}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="EditChannel"
                component={EditChannel}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="AnnouncementChannel"
                component={AnnoucementsScreen}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ManageChannels"
                component={ManageChannels}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="EditEvent"
                component={EditEvent}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="CreateNewsPost"
                component={CreateNewsPost}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="DirectMessageTab"
                component={Messages}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="PrimaryGym"
                component={PrimaryGym}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ViewFullUserProfileFromMessages"
                component={ViewFullUserProfileFromMessages}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="MusicPreference"
                component={MusicPref}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="SexualityEdit"
                component={SexualityEdit}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ViewEventAttendees"
                component={EventAttendees}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="SearchUsers"
                component={SearchUsers}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="FitnessBucketList"
                component={FitnessBucketList}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="FitnessGoals"
                component={FitnessGoals}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="SearchCommunities"
                component={SearchCommunities}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="AllEventsPage"
                component={ViewAllEvents}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="CommunityPage"
                component={CommunityPage}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="FitnessLevel"
                component={ExperienceLvl}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="FitnessRecords"
                component={FitnessRecords}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="Hobbies"
                component={OtherHobbies}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="MyCommunityEvents"
                component={ManageCommunityEvents}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="MyCommunitySettings"
                component={CommunitySettings}
              />

              <Stack.Screen
                options={{ headerShown: false, gestureEnabled: false }}
                name="PurchaseScreen"
                component={PurchaseScreen}
              />

              <Stack.Screen name="MyEvents" component={MyEvents} />

              <Stack.Screen
                options={{ headerShown: false }}
                name="AddMoreUserInfo"
                component={AddMoreInfo}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ChannelScreen"
                component={ChannelMessageScreen}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ViewRequestProfile"
                component={ViewRequestProfile}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="MyCommunityRequests"
                component={CommunityRequestsPage}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="MyCommunityMembers"
                component={ManageCommunityMembers}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="CreateChannel"
                component={CreateChannel}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="MessagingScreen"
                component={MessageScreen}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="CreateCommunity"
                component={CreateCommunity}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ViewCommunitiesMembersScreen"
                component={CommunityMembers}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ViewUserProfile"
                component={ViewUserProfile}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="CreateEvent"
                component={CreateEvent}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ViewEvent"
                component={ViewEvent}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="EventCheckout"
                component={EventCheckout}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ViewCommunitiesScreen"
                component={ViewCommunities}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="UserEditProfile"
                component={EditProfile}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Sexuality"
                component={Sexuality}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="FitnessInterests"
                component={FitnessInterests}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ManageEvents"
                component={ManageEvents}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ViewEventGoers"
                component={ViewEventGoers}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="CommunitiesPreferences"
                component={CommunityPreference}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ActivityTimePreference"
                component={ActivityTimePreference}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="QuestionThree"
                component={Question3}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="Notifications"
                component={EnableNotifcations}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen
                options={{ headerShown: false }}
                name="QuestionOne"
                component={Question1}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="Sexuality"
                component={Sexuality}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="QuestionTwo"
                component={Question2}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="QuestionThree"
                component={Question3}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="Notifications"
                component={EnableNotifcations}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="Location"
                component={Location}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="QuestionFour"
                component={Question4}
              />
            </Stack.Group>
          )}
        </>
      ) : (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="TitleScreen"
            component={TitleScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="LoginWithEmail"
            component={LoginWithEmail}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUpWithEmail"
            component={SignUpWithEmail}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUp}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export { NavStack }
