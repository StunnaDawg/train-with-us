import { Alert } from "react-native"
import * as MailComposer from "expo-mail-composer"

type EmailOptions = {
  recipients: string[]
  body: string
  subject: string
}

const sendEmail = async ({ recipients, subject, body }: EmailOptions) => {
  const options = {
    recipients: recipients,
    subject: subject,
    body: body,
    isHtml: false,
  }

  try {
    const result = await MailComposer.composeAsync(options)
    if (result.status === MailComposer.MailComposerStatus.SENT) {
      Alert.alert("Success", "Email sent successfully!")
    } else if (result.status === MailComposer.MailComposerStatus.SAVED) {
      Alert.alert("Saved", "Email draft saved.")
    } else if (result.status === MailComposer.MailComposerStatus.CANCELLED) {
      Alert.alert("Cancelled", "Email sending cancelled.")
    }
  } catch (error) {
    Alert.alert("Error", "An error occurred while trying to send the email.")
  }
}

export default sendEmail
