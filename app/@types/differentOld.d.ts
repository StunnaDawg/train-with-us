import { TimeStamp } from "firebase/firestore"

export type GymProfile = {
  gymId: string
  gymOwner: string
  gym_title: string
  gym_style: string
  country: string
  province: string
  city: string
  about?: string
  members?: UserProfile[]
  coaches?: UserProfile[]
  gymPhotos: string[]
  events: Event[] | null | undefined
  rewards: Reward[] | null
  gymChatChannels: GymChatChannel[] | null
}

export type UserProfile = {
  id: string
  firstName: string
  lastName: string
  gender: string
  about: string | null
  activities: string[] | []
  personalRecords?: string[]
  intentions: string
  diet: string | null
  zodiac: string | null
  education: string | null
  jobTitle: string | null
  school: string | null
  homeGym: string | null
  gyms: JoinedGymId[] | null
  userPhotos: string[]
  birthday: TimeStamp
  gyms: string[]
  eventsGoing: EventsAttending[] | null
  points: number | null
  earnedRewards: Reward[] | null
  createdGym: string | null
}

export type Activities = {
  name: string
}

export type Match = {
  id: string
  users: {
    user1: UserProfile
    user2: UserProfile
  }
  usersMatched: string[]
}

export type Messages = {
  id: string
  message: string
  userId: string
  photoUrl: string
  timeStamp: string
  userName: string
}

export type Event = {
  id: string
  gymHost: string
  eventTitle: string
  description: string
  date: Timestamp
  location: string
  price: string
  attendees: Attendee[]
  eventPhoto: string
}

export type GymRequest = {
  userProfile: UserProfile
}

export type GymMessaging = {
  id: string
  users: {
    user1: UserProfile | GymProfile
    user2: UserProfile | GymProfile
  }
  gymUser: string[]
}

export type Attendee = {
  memberId: string
}

export type EventsAttending = {
  eventId: string
}

export type Reward = {
  rewardTitle: string
  description: string
  pointCost: number
  rewardPhoto: string
  expiryDate: TimeStamp | null
}

export type GymChatChannel = {
  channelId: string
  channelTitle: string
  channelDescription: string
  channelMessages: Messages[] | null
  channelMembers: UserProfile[] | null
  gymId: string
}

export type JoinedGymId = {
  gymId: string
}
