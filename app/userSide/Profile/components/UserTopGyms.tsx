import { View, Text } from "react-native"

type UserTopGymsProps = {
  borderB: boolean
  mt: boolean
  communityName: string
}

const UserTopGyms = ({ borderB, mt, communityName }: UserTopGymsProps) => {
  return (
    <View className="flex flex-row  ">
      {communityName !== "No Primary gym" ? (
        <Text className="text-md font-bold">
          Primary Gym: <Text className="font-semibold">{communityName}</Text>
        </Text>
      ) : null}
    </View>
  )
}

export default UserTopGyms
