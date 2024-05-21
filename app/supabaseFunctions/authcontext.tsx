import { Session, User } from "@supabase/supabase-js"
import {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
} from "react"
import supabase from "../../lib/supabase"

// Create a context for authentication
const AuthContext = createContext<{
  session: Session | null | undefined
  user: User | null | undefined
  signOut: () => void
}>({ session: null, user: null, signOut: () => {} })

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
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

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
  }

  const value = {
    session,
    user,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
