import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth"; // Correct import
import { auth } from "../firebase/connect"; // Assuming app is your Firebase app

export default function HomeScreen() {
  const onSignoutPress = async () => {
    try {
      await signOut(auth); // Call signOut on the auth instance
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 flex-row justify-center items-center">
      <Text className="text-lg">Home Page -</Text>
      <TouchableOpacity
        className="p-1 bg-red-400 rounded-lg m-2"
        onPress={onSignoutPress}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
