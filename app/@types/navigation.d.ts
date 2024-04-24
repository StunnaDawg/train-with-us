import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { TabNavigationProp } from "@react-navigation/native"
import { CommunitiesProfile, UserProfile } from "./supabase"

export type RootStackParamList = {
  Footer: undefined
  CommunitiesScreens: { screen: string; params?: { screen: string } }
  SignUp: undefined
  Login: undefined
  CreateCommunities: undefined
  UserDashboard: undefined
  Meet: undefined
  Community: undefined
  FindWorkout: undefined
  CommunitiesFooter: undefined
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
  CommunitiesQuestionOne: undefined
  CommunitiesQuestionTwo: undefined
  CommunitiesQuestionThree: undefined
  CommunitiesInitalAddPhoto: undefined
  CommunitiesMessages: undefined
  CommunitiesEditProfile: undefined
  CommunitiesModerateMembers: undefined
  MatchModal: undefined
  LoadModal: undefined
  CurrentCommunitiesSettings: {
    CommunitiesProfile: CommunitiesProfile
    id: string
  }
  CreateEvent: undefined
  AttendingEvent: {
    eventId: string
  }
  EditEvent: {
    eventId: string
  }
  MessagingScreen: undefined

  CommunitiesMessagingScreen: {
    id: string
    userDocId: string
  }
  ViewCommunitiesScreen: {
    id?: string
    CommunitiesId: string
  }

  ViewCommunitiesMembersScreen: {
    CommunitiesId: string
  }
  ViewCommunitiesTopTabs: undefined
  CreateNewChannel: undefined
}

export type NavigationType = NativeStackNavigationProp<RootStackParamList>

export type TabParamList = {
  Community: undefined
  Dashboard: undefined
  Profile: undefined
  Connections: undefined
  Messages: undefined
  Communities: undefined
  Requests: undefined
  CommunitiesEvents: undefined
  Events: undefined
  AboutCommunities: undefined
  CommunitiesMembers: undefined
  CommunitiesPhotos: undefined
  HomeCommunities: undefined
}

export type TabNavigationType = TabNavigationProp<TabParamList>

export type RouteParamsType = {
  id?: string
  matchDocId: string
  eventId: string
  CommunitiesId: string
}
