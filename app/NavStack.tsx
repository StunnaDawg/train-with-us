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

// const UserFooter = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: () => {
//           let iconName

//           if (route.name === "Events") {
//             iconName = "calendar"
//           } else if (route.name === "Gyms") {
//             iconName = "dumbbell"
//           } else if (route.name === "Profile") {
//             iconName = "user-pen"
//           } else if (route.name === "Connections") {
//             iconName = "people-group"
//           } else if (route.name === "Messages") {
//             iconName = "message"
//           }

//           // You can return any component that you like here!
//           return <FontAwesome6 name={iconName} size={20} color={"black"} />
//         },
//         tabBarActiveTintColor: "red",
//         tabBarInactiveTintColor: "gray",
//       })}
//     >
//       <Tab.Screen name="Events" component={Events} />
//       <Tab.Screen name="Gyms" component={GymsTab} />
//       <Tab.Screen name="Profile" component={UserProfile} />
//       <Tab.Screen name="Connections" component={Meet} />
//       <Tab.Screen name="Messages" component={MessageTab} />
//       <Tab.Screen name="HomeGym" component={HomeGym} />
//     </Tab.Navigator>
//   )
// }

const NavStack = () => {
  const { user } = useAuth()
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
          {/*<Stack.Group>
             <Stack.Screen name="Footer" component={UserFooter} />
            <Stack.Screen name="ViewGymTopTabs" component={GymTopTabs} />
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
            <Stack.Screen name="GymScreens" component={GymScreens} />
          </Stack.Group>

          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="MatchModal" component={MatchModal} />
            <Stack.Screen name="LoadModal" component={LoadModal} /> 
          </Stack.Group>*/}
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
