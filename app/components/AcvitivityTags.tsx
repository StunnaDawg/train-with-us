import { Text, View } from "react-native"

type ActivityTagProps = {
  activity: string
}

const ActivityTags = ({ activity }: ActivityTagProps) => {
  return (
    <View className=" border-2  rounded-full bg-white p-1 text-center mx-1">
      <Text className="text-xs font-semibold">{activity}</Text>
    </View>
  )
}

export default ActivityTags
