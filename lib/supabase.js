import "react-native-url-polyfill/auto"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

// process.env.EXPO_PUBLIC_SUPAURL
const supabaseUrl = process.env.EXPO_PUBLIC_MOBILEURL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPAKEY

console.log("supabaseUrl", supabaseUrl)

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export default supabase
