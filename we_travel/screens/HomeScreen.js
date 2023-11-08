import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth"; // Correct import
import { auth } from "../firebase/connect"; // Assuming app is your Firebase app
import { FontAwesome } from "@expo/vector-icons";
import ItemCarDontainer from "../components/ItemCarDontainer";

export default function HomeScreen() {
  const onSignoutPress = async () => {
    try {
      await signOut(auth); // Call signOut on the auth instance
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="flex-row items-center justify-between px-9 py-3">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold">We Travel</Text>
          <Text className="text-[#527283] text-[36px]">Flights Plane</Text>
        </View>
        <View className=" w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <Image
            source={require("../assets/images/avatar.png")}
            style={{ width: 50, height: 50 }}
            className="w-full h-full rounded-md object-cover"
          />
        </View>
      </View>

      <View className="items-center justify-between px-9 py-3">
        <TouchableOpacity className="bg-gray-400 rounded-md justify-center shadow-lg">
          <Image
            source={require("../assets/images/plane.png")}
            style={{ width: 380, height:200}}
            className="w-full h-full rounded-md object-cover items-center "
          />
        </TouchableOpacity>
      </View>

      <View>
            <View className="flex-row items-center justify-between px-4 mt-8">
              <Text className="text-[#2C7379] text-[28px] font-bold">
                Top Flights
              </Text>
              <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                <Text className="text-[#A0C4C7] text-[20px] font-bold">
                  Explore
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color="#A0C4C7"
                />
              </TouchableOpacity>
            </View>
        </View>
        <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
           <ItemCarDontainer key={"101"} imageSrc={"https://cdn-jkmaf.nitrocdn.com/GIAADXXAAmQrrzOrNKoHBSAlpIdNtxHq/assets/images/optimized/rev-0adf657/blog.bangkokair.com/wp-content/uploads/2023/04/image-125.png"} 
           title="Something" location="Doha"/>
           <ItemCarDontainer key={"102"} imageSrc={"https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5K3yaivc0Mbvz6OJvOPnndnhvbFrrlR5veRmafU6n0ZUQi3Obs8.webp"} 
           title="Sample" location="Qatar"/>
           <ItemCarDontainer key={"103"} imageSrc={"https://tonkit360.com/wp-content/uploads/2021/10/%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B9%84%E0%B8%97%E0%B8%A21-1024x683.jpg"} 
           title="Sample" location="Qatar"/>
           <ItemCarDontainer key={"104"} imageSrc={"https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5K3yaivc0Mbvz6OJvOPnndnhvbFrrlR5veRmafU6n0ZUQi3Obs8.webp"} 
           title="Sample" location="OOO"/>
        </View>
      
      {/* <Text className="text-lg">Home Page -</Text>
      <TouchableOpacity
        className="p-1 bg-red-400 rounded-lg m-2"
        onPress={onSignoutPress}
      >
        <Text>Logout</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}
