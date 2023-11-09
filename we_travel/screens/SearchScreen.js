import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import data from "../data.json";
import { Ionicons } from "@expo/vector-icons";
import { GetFlightSearch } from "../api/SearchFlight";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function SearchForm({}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [items, setitems] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const [searchword, setSearchword] = useState({ wordfrom: "", wordto: "" });

  const navigation = useNavigation();

  const handleFromLocationSelect = (data, details = null) => {
    setSearchword((prevSearchword) => ({
      ...prevSearchword,
      wordfrom: data.description,
    }));
  };

  const handleToLocationSelect = (data, details = null) => {
    setSearchword((prevSearchword) => ({
      ...prevSearchword,
      wordto: data.description,
    }));
  };

  const searchFlights = () => {
    GetFlightSearch(searchword);
  };

  useEffect(() => {
    setIsloading(true);
    setInterval(() => {
      setIsloading(false);
    }, 2000);
  }, []);

  const FlightList = ({ flight }) => {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.routes}>
            <View style={styles.route}>
              <Text style={styles.time}>
                {flight.from.departAt}{" "}
                <Ionicons name="airplane" size={16} color="gray" />{" "}
                {flight.from.arriveAt}
              </Text>
              <Text style={styles.airline}>{flight.from.airline}</Text>
            </View>

            <View style={styles.route}>
              <Text style={styles.time}>
                {flight.to.departAt}{" "}
                <Ionicons name="airplane" size={16} color="gray" />{" "}
                {flight.to.arriveAt}
              </Text>
              <Text style={styles.airline}>{flight.to.airline}</Text>
            </View>
          </View>

          <Text style={styles.price}>{flight.price}</Text>
        </View>
      </ScrollView>
    );
  };

  const image = { uri: "https://i.ibb.co/2vWKRkF/Global-Map.png" };
  return (
    <SafeAreaView className="flex-1 bg-blue-500">
      <ImageBackground className="bg-cover flex-1" source={image}>
        <View>
          <Text className="text-4xl font-extrabold mx-5 text-white">
            Discover
          </Text>
          <Text className="text-4xl font-extrabold mx-5 text-white">
            a New world
          </Text>
        </View>
        <View style={styles.card}>
          <View className="flex-row items-center border my-2">
            <GooglePlacesAutocomplete
              GooglePlacesDetailsQuery={{ fields: "geometry" }}
              placeholder="From"
              onPress={handleFromLocationSelect}
              query={{
                key: "AIzaSyAwNg47yOpCth8g_Z5t58W4tzNDs4HF10Y", // Replace with your API key
                language: "en",
              }}
            />
          </View>
          <View className="flex-row items-center border my-2">
            {/* <TextInput
              style={styles.input}
              placeholder="From"
              value={from}
              onChangeText={setFrom}
            /> */}
            <GooglePlacesAutocomplete
              GooglePlacesDetailsQuery={{ fields: "geometry" }}
              placeholder="to"
              onPress={handleToLocationSelect}
              query={{
                key: "AIzaSyAwNg47yOpCth8g_Z5t58W4tzNDs4HF10Y", // Replace with your API key
                language: "en",
              }}
            />
          </View>
          <View>
            <View style={styles.datePicker}>
              <Feather name="calendar" size={26} color="gray" />
              <DateTimePicker
                value={departDate}
                onChange={(event, date) => setDepartDate(date || new Date())}
                minimumDate={new Date()}
              />
              <Text
                style={{ fontSize: 20, color: "gainsboro", marginLeft: 10 }}
              >
                |
              </Text>
              <DateTimePicker
                value={returnDate}
                onChange={(event, date) => setReturnDate(date || new Date())}
                minimumDate={departDate}
              />
            </View>
          </View>
          <Button title="Search" onPress={searchFlights} />
        </View>
        {isloading ? (
          <View className="flex-1 items-center mt-32">
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <FlatList
            data={items}
            renderItem={({ item }) => <FlightList flight={item} />}
          ></FlatList>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 10,

    // Shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },

  title: {
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 16,
    marginVertical: 15,
  },

  input: {
    flex: 1,
    borderColor: "gainsboro",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },

  datePicker: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,

    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
  },
  routes: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: "gainsboro",
    gap: 10,
    paddingRight: 10,
  },
  route: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    fontWeight: "bold",
    fontSize: 16,
    color: "dimgray",
    fontFamily: "Courier New",
  },
  airline: {
    color: "gray",
  },
  price: {
    width: 75,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
