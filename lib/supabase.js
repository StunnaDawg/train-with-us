import "react-native-url-polyfill/auto"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://rfkabunqcmmsoqijcrhp.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJma2FidW5xY21tc29xaWpjcmhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3ODc5ODMsImV4cCI6MjAyODM2Mzk4M30.0Lhx9BMNGpoFG6xqXRQWgrNCNKgtZaV4OTJH1RydM78"

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export default supabase
