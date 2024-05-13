import React from "react"
import { Platform, View } from "react-native"
import * as AppleAuthentication from "expo-apple-authentication"
import supabase from "../../lib/supabase"

const AppleAuth = () => {
  if (Platform.OS === "ios") {
    return (
      <View>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          className="w-54 h-16"
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
                  //user is signed in
                }
              } else {
                throw new Error("Apple Sign-In failed")
              }
            } catch (e: any) {
              if (e.code === "ERR_REQUEST_CANCELED") {
                // handle that the user canceled the sign-in flow
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
