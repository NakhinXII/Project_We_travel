import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from "react-native";
import React, { useState, useEffect, useLayoutEffect, } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth"; // Correct import
import { auth } from "../firebase/connect"; // Assuming app is your Firebase app
import { FontAwesome } from "@expo/vector-icons";
import ItemCarDontainer from "../components/ItemCarDontainer";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from "@react-navigation/native";
import { getPlacesData } from "../api";
import MenuContainer from "../components/MenuContainer";
export default function HomeScreen() {
  const onSignoutPress = async () => {
    try {
      await signOut(auth); // Call signOut on the auth instance
    } catch (error) {
      console.log(error);
    }
  };
  const navigation = useNavigation();
  const [type, setType] = useState("restaurants");
  const [isLoading, setisLoading] = useState(false)
  const [mainData, setMainData] = useState([]);
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setisLoading(true);
    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
      console.log(data); // แสดงข้อมูลที่ได้รับจาก API
      setMainData(data);
      setInterval(() => {
        setisLoading(false);
      }, 2000);
    });
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);  
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="flex-row items-center justify-between px-9 py-3">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold">We Travel</Text>
          <Text className="text-[#527283] text-[36px]">Flights Plane</Text>
        </View>
        <View className=" w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <TouchableOpacity onPress={() => navigation.navigate("CreaterScreen")}>
          <Image
            source={require("../assets/images/avatar.jpg")}
            style={{ width: 75, height: 75 }}
            className="w-full h-full rounded-md object-cover"
          /></TouchableOpacity>
        </View>
      </View>
      <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details?.geometry?.viewport);
            setBl_lat(details?.geometry?.viewport?.southwest?.lat);
            setBl_lng(details?.geometry?.viewport?.southwest?.lng);
            setTr_lat(details?.geometry?.viewport?.northeast?.lat);
            setTr_lng(details?.geometry?.viewport?.northeast?.lng);
          }}
          query={{
            key: "AIzaSyAwNg47yOpCth8g_Z5t58W4tzNDs4HF10Y",
            language: "en",
          }}
        />
      </View>
          <View className=" flex-row items-center justify-between px-8 mt-8">
            <MenuContainer
              key={"hotels"}
              title="Hotels"
              imageSrc={require("../assets/images/hotel.png")}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={require("../assets/images/attraction.png")}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={require("../assets/images/restaurants.png")}
              type={type}
              setType={setType}
            />
          </View>
      {isLoading ? (
        
        <View className=" flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>) : (
        <ScrollView>
          <View>
          <View className="items-center justify-between px-9 py-3">
        <TouchableOpacity className="bg-gray-400 rounded-md justify-center shadow-lg"
        onPress={() => navigation.navigate("SearchFlights")}>
          <Image
            source={require("../assets/images/plane.png")}
            style={{ width: 380, height: 200 }}
            className="w-full h-full rounded-md object-cover items-center "
          />
        </TouchableOpacity>
      </View>
            <View className="flex-row items-center justify-between px-4 mt-8">
              <Text className="text-[#2C7379] text-[28px] font-bold">
                Top Travel
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

            <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <ItemCarDontainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[400px] items-center space-y-8 justify-center">
                  <Image
                    source={require("../assets/images/NotFound.png")}
                    className=" w-32 h-32 object-cover"
                  />
                  <Text className="text-2xl text-[#428288] font-semibold">
                    Opps...No Data Found
                  </Text>
                </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )
      }
      {/* <Text className="text-lg">Home Page -</Text>
      <TouchableOpacity
        className="p-1 bg-red-400 rounded-lg m-2"
        onPress={onSignoutPress}
      >
        <Text>Logout</Text>
      </TouchableOpacity> */}
    </SafeAreaView >
  );
}
