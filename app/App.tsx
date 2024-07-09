import { NavigationContainer } from "@react-navigation/native"
import { NavStack } from "./NavStack"
import { AuthProvider } from "./supabaseFunctions/authcontext"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import * as SplashScreen from "expo-splash-screen"
import { Linking } from "react-native"
import * as Notifications from "expo-notifications"
import { enableScreens } from "react-native-screens"

SplashScreen.preventAutoHideAsync()

export default function App() {
  enableScreens(true)
  return (
    <AuthProvider>
      <NavigationContainer
        linking={{
          prefixes: ["https://myapp.io"],
          config: {
            screens: {
              MessageScreen: "notifications/message/:id",
            },
          },
          async getInitialURL() {
            const url = await Linking.getInitialURL()

            if (url != null) {
              return url
            }

            const response =
              await Notifications.getLastNotificationResponseAsync()

            return response?.notification.request.content.data.url
          },
          subscribe(listener) {
            const onReceiveURL = ({ url }: { url: string }) => listener(url)

            const eventListenerSubscription = Linking.addEventListener(
              "url",
              onReceiveURL
            )

            const subscription =
              Notifications.addNotificationResponseReceivedListener(
                (response) => {
                  const url = response.notification.request.content.data.url

                  listener(url)
                }
              )

            return () => {
              eventListenerSubscription.remove()
              subscription.remove()
            }
          },
        }}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <NavStack />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </AuthProvider>
  )
}
