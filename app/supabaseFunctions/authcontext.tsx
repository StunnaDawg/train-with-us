import { Session, User } from "@supabase/supabase-js"
import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
  useCallback,
} from "react"
import supabase from "../../lib/supabase"
import useCurrentUser from "./getFuncs/useCurrentUser"
import { Profile } from "../@types/supabaseTypes"

const AuthContext = createContext<{
  session: Session | null | undefined
  user: User | null | undefined
  userProfile: Profile | null | undefined
  signOut: () => void
}>({ session: null, user: null, userProfile: null, signOut: () => {} })

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [userProfile, setUserProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const setData = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error("Error getting session:", error)
        setLoading(false)
        return
      }
      setSession(data.session)
      setUser(data.session?.user || null)
      setLoading(false)
    }

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user || null)
        setLoading(false)
      }
    )

    setData()

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        await useCurrentUser(user.id, setUserProfile) // Adjust to use your actual fetching logic
      }
    }
    fetchUserProfile()
  }, [user])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    setUserProfile(null)
  }, [])

  const value = React.useMemo(
    () => ({
      session,
      user,
      userProfile,
      signOut,
    }),
    [session, user, userProfile, signOut]
  )

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
