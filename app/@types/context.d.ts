import { Dispatch, SetStateAction } from "react"

export type UserAuth = {
  isSignedIn: Session
}

export type UserAuthAction = {
  setIsSignedIn: Dispatch<SetStateAction<Session>>
}
