import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import useAuth from "../hooks/useAuth";
import SearchForm from "../screens/SearchScreen";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="SearchFlights"
            options={() => ({
              title: "Search Flights",
              headerStyle: {
                position: "absolute",
                backgroundColor: "transparent",
                zIndex: 100,
                top: 0,
                left: 0,
                right: 0,
              },
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
