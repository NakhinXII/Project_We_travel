import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
export default function CreaterScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className=" items-center px-9 py-3">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold my-9">CEO</Text>
        </View>
        
      </View>
    
      <View className="items-center justify-between px-9 py-3">
        <TouchableOpacity className="bg-gray-400 rounded-md justify-center shadow-lg"
        onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../assets/images/newjab.png")}
            style={{ width: 380, height: 500 }}
            className="w-full h-full rounded-md object-cover items-center "
          />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );

  {/* <Text className="text-lg">Home Page -</Text>
      <TouchableOpacity
        className="p-1 bg-red-400 rounded-lg m-2"
        onPress={onSignoutPress}
      >
        <Text>Logout</Text>
      </TouchableOpacity> */}
}
