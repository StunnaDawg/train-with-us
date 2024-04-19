import {
  RootStackParamList,
  TabNavigationType,
  TabParamList,
} from "./@types/navigation"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavBar } from "../components"
import Login from "./UserAuth/Login"
import SignUp from "./UserAuth/SignUp"
import { useAuth } from "./hooks/authcontext"
import { FontAwesome6 } from "@expo/vector-icons"
import Events from "./userSide/Events/Events"
import Question1 from "./UserOnBoard/Question1"
import Question2 from "./UserOnBoard/Question2"
import Question3 from "./UserOnBoard/Question3"
import Question4 from "./UserOnBoard/Question4"
import { useEffect, useState } from "react"
import supabase from "../lib/supabase"
import useCurrentUser from "./hooks/useCurrentUser"
import { ca } from "date-fns/locale"
import getUserId from "./hooks/getUserId"
import { Database } from "./@types/supabase"
import { set } from "date-fns"

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
          } else if (route.name === "Gyms") {
            iconName = "dumbbell"
          } else if (route.name === "Profile") {
            iconName = "user-pen"
          } else if (route.name === "Connections") {
            iconName = "people-group"
          } else if (route.name === "Messages") {
            iconName = "message"
          }

          // You can return any component that you like here!
          return <FontAwesome6 name={iconName} size={20} color={"black"} />
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Events" component={Events} />
      {/* <Tab.Screen name="Gyms" component={GymsTab} />
      <Tab.Screen name="Profile" component={UserProfile} />
      <Tab.Screen name="Connections" component={Meet} />
      <Tab.Screen name="Messages" component={MessageTab} />
      <Tab.Screen name="HomeGym" component={HomeGym} /> */}
    </Tab.Navigator>
  )
}

const NavStack = () => {
  const { user } = useAuth()
  const [currentUserId, setCurrentUserId] = useState<string>("")
  const [userProfile, setUserProfile] = useState<
    Database["public"]["Tables"]["profiles"]["Row"] | null
  >(null)

  useEffect(() => {
    getUserId(setCurrentUserId)
  }, [])

  useEffect(() => {
    const setProfile = async () => {
      try {
        if (currentUserId) {
          useCurrentUser(currentUserId, setUserProfile)
        } else {
          console.log("no user")
        }
      } catch (error) {
        console.log(error)
      }
    }
    setProfile()
  }, [currentUserId])
  // const { isUser } = useisUser()

  //   UserQuestionOne: undefined
  //   UserQuestionTwo: undefined
  //   UserQuestionThree: undefined
  //   UserInitalAddPhoto: undefined
  //   GymQuestionOne: undefined
  //   GymQuestionTwo: undefined
  //   GymQuestionThree: undefined
  //   GymInitalAddPhoto: undefined
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => (user ? <NavBar /> : null),
      }}
    >
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Footer" component={UserFooter} />
            {/*<Stack.Screen name="ViewGymTopTabs" component={GymTopTabs} />
            <Stack.Screen name="UserDashboard" component={Dashboard} />
            <Stack.Screen name="AttendingEvent" component={AttendingEvent} />
            <Stack.Screen name="UserSettings" component={UserSettings} />

            <Stack.Screen name="CreateGym" component={CreateGymPage} />

            <Stack.Screen
              name="CurrentGymSettings"
              component={CurrentGymSettings}
            />

            <Stack.Screen
              name="ViewUserProfile"
              component={ViewUserProfileScreen}
            />
            <Stack.Screen
              name="ViewGymMembersScreen"
              component={ViewGymMembers}
            />
            <Stack.Screen
              name="ChooseUserActivity"
              component={ChooseActivity}
            />

            <Stack.Screen name="Meet" component={Meet} />

            <Stack.Screen name="UserEditProfile" component={EditProfileHome} />
            <Stack.Screen name="ViewGymScreen" component={ViewGymProfile} />
            <Stack.Screen name="ViewEvent" component={ViewEvent} />
            <Stack.Screen name="UserQuestionOne" component={QuestionOne} />
            <Stack.Screen name="UserQuestionTwo" component={QuestionTwo} />
            <Stack.Screen name="UserQuestionThree" component={QuestionThree} />
            <Stack.Screen name="UserQuestionFour" component={QuestionFour} />
            <Stack.Screen name="UserQuestionFive" component={QuestionFive} />
            <Stack.Screen
              name="UserInitalAddPhoto"
              component={IntialAddPhotos}
            />
            <Stack.Screen name="MessagingScreen" component={MessageScreen} />
            <Stack.Screen name="GymScreens" component={GymScreens} />*/}
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen name="QuestionOne" component={Question1} />
            <Stack.Screen name="QuestionTwo" component={Question2} />
            <Stack.Screen name="QuestionThree" component={Question3} />
            <Stack.Screen name="QuestionFour" component={Question4} />
          </Stack.Group>

          {/* <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="MatchModal" component={MatchModal} />
            <Stack.Screen name="LoadModal" component={LoadModal} /> 
          </Stack.Group> */}
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
