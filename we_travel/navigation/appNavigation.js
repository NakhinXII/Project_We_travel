import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CreaterScreen from "../screens/CreaterScreen";
import ItemScreen from "../screens/ItemScreen";
import SignUpScreen from "../screens/SignUpScreen";
import useAuth from "../hooks/useAuth";
import SearchForm from "../screens/SearchScreen";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/connect";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { user } = useAuth();
  const onSignoutPress = async () => {
    try {
      await signOut(auth); // Call signOut on the auth instance
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="ItemScreen"
            // options={{ headerShown: false }}
            component={ItemScreen}
          />
          <Stack.Screen
            name="CreaterScreen"
            options={{ headerShown: false }}
            component={CreaterScreen}
          />
          <Stack.Screen
            name="SearchFlights"
            options={() => ({
              title: "Search Flights",
              headerLeft: () => {
                const navigation = useNavigation(); // Use the useNavigation hook here
                return (
                  <TouchableOpacity
                    style={{ marginLeft: 16 }}
                    // onPress={() => navigation.goBack()}
                    onPress={() => navigation.goBack()}
                  >
                    <ArrowLeftIcon size="20" color="black" />
                  </TouchableOpacity>
                );
              },
            })}
            component={SearchForm}
          />
          <Stack.Screen
            name="Flightlist"
            options={() => ({
              title: "Flight lists",
              headerLeft: () => {
                const navigation = useNavigation(); // Use the useNavigation hook here
                return (
                  <TouchableOpacity
                    style={{ marginLeft: 16 }}
                    onPress={() => navigation.goBack()}
                  >
                    <ArrowLeftIcon size="20" color="black" />
                  </TouchableOpacity>
                );
              },
            })}
            component={SearchForm}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            options={{ headerShown: false }}
            component={WelcomeScreen}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="SignUp"
            options={{ headerShown: false }}
            component={SignUpScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
