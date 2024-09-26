import React from "react"
import { Platform, View } from "react-native"
import * as AppleAuthentication from "expo-apple-authentication"
import supabase from "../../lib/supabase"
import * as Updates from "expo-updates"
import showAlert from "../utilFunctions/showAlert"

const AppleAuth = () => {
  if (Platform.OS === "ios") {
    return (
      <View>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={10}
          style={{ width: 200, height: 54 }}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              })
              if (credential.identityToken) {
                const {
                  error,
                  data: { user },
                } = await supabase.auth.signInWithIdToken({
                  provider: "apple",
                  token: credential.identityToken,
                })

                console.log(JSON.stringify({ error, user }, null, 2))

                if (!error) {
                  await Updates.reloadAsync()
                }
              } else {
                showAlert({
                  title: "Apple Sign-In failed",
                  message: "Please try again",
                })
                throw new Error("Apple Sign-In failed")
              }
            } catch (e: any) {
              if (e.code === "ERR_REQUEST_CANCELED") {
                // handle that the user canceled the sign-in flow

                showAlert({
                  title: "Apple Sign-In canceled",
                  message: "Please try again",
                })
              } else {
                throw console.error(e)
              }
            }
          }}
        />
      </View>
    )
  } else {
    return null
  }
}

export default AppleAuth
