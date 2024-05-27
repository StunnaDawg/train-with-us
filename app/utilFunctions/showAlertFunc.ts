import { Alert } from "react-native"

type AlertButton = {
  text: string
  onPress?: () => void
  style?: "default" | "cancel" | "destructive"
}

type AlertOptions = {
  title: string
  message: string
  buttons?: AlertButton[]
}

const showAlertFunc = ({
  title,
  message,
  buttons = [{ text: "OK" }],
}: AlertOptions) => {
  Alert.alert(title, message, buttons)
}

export default showAlertFunc
