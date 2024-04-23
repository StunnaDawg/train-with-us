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
import { useAuth } from "./supabaseFunctions/authcontext"
import { FontAwesome6 } from "@expo/vector-icons"
import Events from "./userSide/Events/Events"
import Question1 from "./UserOnBoard/Question1"
import Question2 from "./UserOnBoard/Question2"
import Question3 from "./UserOnBoard/Question3"
import Question4 from "./UserOnBoard/Question4"
import { useEffect, useState } from "react"
import supabase from "../lib/supabase"
import useCurrentUser from "./supabaseFunctions/getFuncs/useCurrentUser"
import { ca } from "date-fns/locale"
import getUserId from "./supabaseFunctions/getFuncs/getUserId"
import { Database } from "./@types/supabase"
import { set } from "date-fns"
import CommunitiesHome from "./userSide/Communities/CommunitiesHome"
import CommunitiesDash from "./userSide/UserCommunities/CommunitiesDash"
import Profile from "./userSide/Profile/Profile"
import MessagesHome from "./userSide/Messages/MessagesHome"
import Connections from "./userSide/Connections/Connections"

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
          } else if (route.name === "My Communities") {
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
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="My Communities" component={CommunitiesDash} />
      <Tab.Screen name="Messages" component={MessagesHome} />
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
          {userProfile?.onboard ? (
            <Stack.Group>
              <Stack.Screen name="Footer" component={UserFooter} />
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
