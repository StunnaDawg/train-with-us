import { Alert } from "react-native"

type AlertOptions = {
  title: string
  message: string
  buttonText?: string
}

const showAlert = ({ title, message, buttonText = "OK" }: AlertOptions) => {
  Alert.alert(title, message, [{ text: buttonText }])
}

export default showAlert
