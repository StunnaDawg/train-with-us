// import { View, Text, Pressable } from "react-native"
// import React, { useState } from "react"
// import SinglePic from "../../../components/SinglePic"
// import { useNavigation } from "@react-navigation/native"
// import { NavigationType } from "../../../@types/navigation"
// import { useEffect } from "react"
// import { FileObject } from "@supabase/storage-js"
// import { useAuth } from "../../../supabaseFunctions/authcontext"
// import supabase from "../../../../lib/supabase"

// const CommunitiesUnRead = () => {
//   const [files, setFiles] = useState<FileObject[]>([])
//   const { user } = useAuth()
//   const navigation = useNavigation<NavigationType>()
//   useEffect(() => {
//     if (!user) return

//     loadImages()
//   }, [user])

//   const loadImages = async () => {
//     const { data } = await supabase.storage.from("photos").list(user!.id)
//     if (data) {
//       setFiles(data)
//     }
//   }
//   return (
//     <View className="mt-8 mx-8 border-b pb-2">
//       <View>
//         <Text className="font-bold text-xl">Unread</Text>
//       </View>

//       <Pressable
//         // onPress={() => {
//         //   navigation.navigate("MessagingScreen")
//         // }}
//         className="flex flex-row items-center"
//       >
//         <View className="m-2">
//           <SinglePic
//             size={55}
//             avatarRadius={100}
//             noAvatarRadius={100}
//             item={files[0]}
//           />
//         </View>

//         <View>
//           <Text className="font-bold mb-1">#3AM Crew</Text>
//           <Text className="text-sm">Hey, how are you?</Text>
//         </View>
//       </Pressable>

//       <Pressable className="flex flex-row items-center">
//         <View className="m-2">
//           <SinglePic
//             size={55}
//             avatarRadius={100}
//             noAvatarRadius={100}
//             item={files[1]}
//           />
//         </View>

//         <View>
//           <Text className="font-bold mb-1">#1pm Crew</Text>
//           <Text className="text-sm">Ya, I agree. that wou...</Text>
//         </View>
//       </Pressable>
//     </View>
//   )
// }

// export default CommunitiesUnRead
