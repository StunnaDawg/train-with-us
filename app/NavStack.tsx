import { RootStackParamList, TabParamList } from "./@types/navigation"
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
import Profile from "./userSide/Profile/Profile"
import Connections from "./userSide/Connections/Connections"
import MessageScreen from "./userSide/UserCommunities/components/MessageScreen"
import ViewEvent from "./userSide/Events/ViewEvent"
import EventCheckout from "./userSide/Events/EventCheckout"
import ViewCommunities from "./userSide/Communities/ViewCommunities"
import { set } from "date-fns"
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
import CommunityRequests from "./userSide/MyCommunity/CommunityRequests"
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

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<TabParamList>()

// const GymFooter = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Tab.Screen name="GymDashboard" component={GymChat} />
//       <Tab.Screen name="GymEvents" component={EventsTab} />
//       <Tab.Screen name="Profile" component={GymProfile} />
//       <Tab.Screen name="Requests" component={GymRequests} />
//     </Tab.Navigator>
//   )
// }

// const GymScreens = () => {
//   return (
//     <>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="GymFooter" component={GymFooter} />
//         <Stack.Screen name="CreateEvent" component={CreateEvent} />
//         <Stack.Screen name="EditEvent" component={EditEvent} />
//         <Stack.Screen name="GymEditProfile" component={EditGymProfileHome} />
//         <Stack.Screen name="UserSettings" component={UserSettings} />
//         <Stack.Screen name="CreateNewChannel" component={CreateNewChannel} />
//         <Stack.Screen name="GymQuestionTwo" component={GymQuestionTwo} />
//         <Stack.Screen name="GymModerateMembers" component={ModerateUsers} />
//         <Stack.Screen
//           name="GymInitalAddPhoto"
//           component={GymInitialAddPhotos}
//         />
//       </Stack.Navigator>
//     </>
//   )
// }

const UserFooter = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: () => {
          let iconName

          if (route.name === "Events") {
            iconName = "calendar"
          } else if (route.name === "Communities") {
            iconName = "user-group"
          } else if (route.name === "Profile") {
            iconName = "user"
          } else if (route.name === "Connections") {
            iconName = "people-group"
          } else if (route.name === "Messages") {
            iconName = "message"
          } else if (route.name === "Community") {
            iconName = "house"
          }

          // You can return any component that you like here!
          return <FontAwesome6 name={iconName} size={20} color={"black"} />
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Communities" component={CommunitiesHome} />
      <Tab.Screen name="Connections" component={Connections} />
      <Tab.Screen name="Profile" component={ProfileView} />
      <Tab.Screen name="Community" component={CommunitiesDash} />
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

  useEffect(() => {
    getUserId(setCurrentUserId)
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
        header: () => (user ? <NavBar /> : null),
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
                name="EditEvent"
                component={EditEvent}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="PrimaryGym"
                component={PrimaryGym}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="MusicPreference"
                component={MusicPref}
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
              {/* Question 3 is gender */}
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
            name="Login"
            component={Login}
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
