import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { signupEmailPass } from "../firebase/AuthModel";

// subscribe for more videos like this :)
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const setFullname = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      fullname: text,
    }));
  };

  const setEmail = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      email: text,
    }));
  };

  const setPassword = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      password: text,
    }));
  };

  const unsuccess = (msg) => {
    console.log(msg);
    Alert.alert(msg);
  };

  const allSuccess = (doc) => {
    Alert.alert(`${doc.firstname} has been added to system`);
    navigation.goBack();
  };

  const onSignupPress = async () => {
    if (profile.fullname && profile.email && profile.password) {
      try {
        console.log(`Fullname: ${profile.fullname}`);
        console.log(`Email: ${profile.email}`);
        console.log(`Password: ${profile.password}`);
        signupEmailPass(profile, allSuccess, unsuccess);
      } catch (err) {
        console.log("got error:", err);
      }
    } else if (profile.fullname == "") {
      Alert.alert("Alert", "Please fill your Name");
    } else if (profile.email == "") {
      Alert.alert("Alert", "Please fill your Email");
    } else if (profile.password == "") {
      Alert.alert("Alert", "Please fill your Password");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        className="flex-1 bg-white"
        style={{ backgroundColor: themeColors.bg }}
      >
        <SafeAreaView className="flex">
          <View className="flex-row justify-start">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
              <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/signup.png")}
              style={{ width: 165, height: 110 }}
            />
          </View>
        </SafeAreaView>
        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Full Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter Name"
              value={profile.fullname}
              onChangeText={(text) => setFullname(text)}
            />

            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter Email"
              value={profile.email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
              secureTextEntry
              placeholder="Enter Password"
              value={profile.password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl"
              onPress={onSignupPress}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
          </Text>
          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../assets/icons/google.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../assets/icons/apple.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image
                source={require("../assets/icons/facebook.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-semibold text-yellow-500"> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
