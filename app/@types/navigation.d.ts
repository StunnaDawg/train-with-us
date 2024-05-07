import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { TabNavigationProp } from "@react-navigation/native"
import { CommunitiesProfile, UserProfile } from "./supabase"
import {
  ChatSession,
  Communities,
  CommunityChannel,
  Profile,
} from "./supabaseTypes"

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
    eventId: number
  }
  UserEditProfile: undefined
  UserSettings: undefined
  ViewUserProfile: {
    userProfile: Profile
  }
  QuestionOne: undefined
  QuestionTwo: undefined
  QuestionThree: undefined
  QuestionFour: undefined
  QuestionFive: undefined
  Sexuality: undefined
  UserInitalAddPhoto: undefined
  ChooseUserActivity: undefined
  CommunitiesQuestionOne: undefined
  CommunitiesQuestionTwo: undefined
  CommunitiesQuestionThree: undefined
  CommunitiesInitalAddPhoto: undefined
  CommunitiesMessages: undefined
  CommunitiesEditProfile: undefined
  CommunitiesModerateMembers: undefined
  FitnessInterests: undefined
  CommunitiesPreferences: undefined
  ActivityTimePreference: undefined
  MatchModal: undefined
  LoadModal: undefined
  CreateCommunity: undefined
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
  MessagingScreen: {
    chatSession: ChatSession
  }

  CommunitiesMessagingScreen: {
    id: string
    userDocId: string
  }
  ViewCommunitiesScreen: {
    communityId: number
  }

  ViewCommunitiesMembersScreen: {
    communityId: number
  }
  ViewCommunitiesTopTabs: undefined
  CreateNewChannel: undefined
  EventCheckout: undefined
  MyCommunityHome: {
    communityId: number
  }
  CreateChannel: {
    communityId: number
  }
  MyCommunitySettings: {
    community: Communities
  }

  MyCommunityRequests: {
    communityId: number
  }

  MyCommunityMembers: {
    communityId: number
  }

  ViewRequestProfile: {
    userId: string
  }
  ChannelScreen: {
    channelId: CommunityChannel
  }

  AddMoreUserInfo: {
    userProfile: UserProfile
  }
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
