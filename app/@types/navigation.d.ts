import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { TabNavigationProp } from "@react-navigation/native"
import { GymProfile, UserProfile } from "./supabase"

export type RootStackParamList = {
  Footer: undefined
  GymScreens: { screen: string; params?: { screen: string } }
  SignUp: undefined
  Login: undefined
  CreateGym: undefined
  UserDashboard: undefined
  Meet: undefined
  Community: undefined
  FindWorkout: undefined
  GymFooter: undefined
  ViewEvent: {
    id: string
    eventId: string
  }
  UserEditProfile: undefined
  UserSettings: undefined
  ViewUserProfile: {
    userProfile: UserProfile
  }
  QuestionOne: undefined
  QuestionTwo: undefined
  QuestionThree: undefined
  QuestionFour: undefined
  QuestionFive: undefined
  UserInitalAddPhoto: undefined
  ChooseUserActivity: undefined
  GymQuestionOne: undefined
  GymQuestionTwo: undefined
  GymQuestionThree: undefined
  GymInitalAddPhoto: undefined
  GymMessages: undefined
  GymEditProfile: undefined
  GymModerateMembers: undefined
  MatchModal: undefined
  LoadModal: undefined
  CurrentGymSettings: {
    gymProfile: GymProfile
    id: string
  }
  CreateEvent: undefined
  AttendingEvent: {
    eventId: string
  }
  EditEvent: {
    eventId: string
  }
  MessagingScreen: {
    id: string
    matchDocId: string
  }
  GymMessagingScreen: {
    id: string
    userDocId: string
  }
  ViewGymScreen: {
    id?: string
    gymId: string
  }

  ViewGymMembersScreen: {
    gymId: string
  }
  ViewGymTopTabs: undefined
  CreateNewChannel: undefined
}

export type NavigationType = NativeStackNavigationProp<RootStackParamList>

export type TabParamList = {
  GymDashboard: undefined
  Dashboard: undefined
  Profile: undefined
  Connections: undefined
  Messages: undefined
  Gyms: undefined
  Requests: undefined
  GymEvents: undefined
  Events: undefined
  AboutGym: undefined
  GymMembers: undefined
  GymPhotos: undefined
  HomeGym: undefined
}

export type TabNavigationType = TabNavigationProp<TabParamList>

export type RouteParamsType = {
  id?: string
  matchDocId: string
  eventId: string
  gymId: string
}
