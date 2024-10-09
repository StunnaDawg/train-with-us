import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { TabNavigationProp } from "@react-navigation/native"
import { CommunitiesProfile, UserProfile } from "./supabase"
import {
  ChatSession,
  Communities,
  CommunityChannel,
  CommunityClasses,
  EventChat,
  Events,
  Profile,
} from "./supabaseTypes"

export type RootStackParamList = {
  Footer: undefined
  CommunitiesScreens: { screen: string; params?: { screen: string } }
  SignUp: undefined
  Login: undefined
  ViewFullUserProfile: {
    user: Profile
  }
  LoginWithEmail: undefined
  SignUpWithEmail: undefined
  TitleScreen: undefined
  CreateCommunities: undefined
  UserDashboard: undefined
  Meet: undefined
  Community: undefined
  FindWorkout: undefined
  CommunitiesFooter: undefined
  ViewEvent: {
    eventId: number
  }
  UserEditProfile: {
    userProfile: Profile | undefined | null
  }
  UserSettings: undefined
  ViewUserProfile: {
    userProfile: Profile
  }
  Welcome: undefined
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
  FitnessInterests: {
    userProfile: Profile | null
  }
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
    eventId: number
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
  EventCheckout: {
    event: Events

    ticketPrice: number
  }
  MyCommunityHome: {
    communityId: number
  }
  CreateChannel: {
    community: Communities
  }
  MyCommunitySettings: {
    community: Communities
  }

  MyCommunityRequests: {
    communityId: number
    communityTitle: string | undefined | null
  }

  MyCommunityMembers: {
    communityId: number
  }

  ViewRequestProfile: {
    userId: string | null
  }
  ChannelScreen: {
    channelId: CommunityChannel
  }

  AddMoreUserInfo: {
    userProfile: UserProfile
  }

  PurchaseScreen: undefined
  ViewEventGoers: {
    eventId: number
  }
  MyEvents: undefined

  ManageEvents: {
    events: Events[]
  }

  MyCommunityEvents: {
    community: Communities
  }
  Notifications: undefined
  Location: undefined
  MusicPreference: {
    userProfile: Profile
  }

  FitnessGoals: {
    userProfile: Profile
  }
  FitnessLevel: {
    userProfile: Profile
  }
  Hobbies: {
    userProfile: Profile
  }
  FitnessRecords: { userProfile: Profile }
  FitnessBucketList: { userProfile: Profile }

  CommunityPage: {
    community: Communities
  }

  PrimaryGym: {
    userProfile: Profile | null
  }

  AllEventsPage: undefined

  SearchCommunities: undefined

  SearchUsers: undefined

  RequestAccess: undefined

  ManageChannels: {
    communityId: number
  }

  EditChannel: {
    channelId: string
  }

  UserSettings: undefined

  AnnouncementChannel: {
    channelId: CommunityChannel
  }

  EditBio: {
    userProfile: Profile
  }

  ManageConnections: undefined

  DirectMessageTab: undefined

  SexualityEdit: undefined

  ViewEventAttendees: {
    profile: Profile[] | null
  }

  CreateNewsPost: {
    communityId: number
    communityTitle: string
  }
  Communities: undefined
  ViewFullUserProfileFromMessages: { userId: string }

  EndOnBoarding: undefined
  EditGender: undefined
  EditFitnessInterests: {
    userProfile: Profile
  }
  NotificationsTab: undefined
  ChooseCommunityActivities: undefined
  AddNewCommunityPhotos: {
    communityId: number
  }
  CreateAboutCommunity: { communityId: number }
  AddCommunityTags: { community: Communities }

  ManageSchedules: {
    community: Communities
  }

  ManageClasses: {
    community: Communities
  }

  CreateClass: {
    communityId: number
  }

  CreateSchedule: {
    communityId: number
  }

  EditClass: {
    classId: string
  }

  EditSchedule: {
    schedule: CommununitySchedule
    communityId: number
  }

  ClassInformationPage: {
    class: CommunityClasses
  }

  EventChat: {
    eventChat: EventChat
  }

  ViewEventWaitlist: {
    profile: Profile[] | null
  }
}

export type NavigationType = NativeStackNavigationProp<RootStackParamList>

export type TabParamList = {
  Community: undefined
  Dashboard: undefined
  Profile: undefined
  Connections: undefined
  Messages: undefined

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
