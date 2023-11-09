import axios from "axios";
import SearchForm from "../screens/SearchScreen";
import { useDispatch } from "react-redux";

const API_KEY = "0ce1801f0emsh4f9245a4c2e81e1p1ff9a5jsn64334aa3c40c";
const API_HOST = "travel-advisor.p.rapidapi.com";
const API_URL = "https://travel-advisor.p.rapidapi.com/airports/search";

const getAirportCodes = async (searchword) => {
  
  try {
    const options = {
      method: "GET",
      url: API_URL,
      params: {
        query: searchword,
        locale: "en_US",
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    };

    const response = await axios.request(options);
    return response.data.map((airport) => airport.code);
  } catch (error) {
    console.error(error);
    return null; // Handle the error and return null
  }
};

export const GetFlightSearch = async (searchword) => {
  try {
    const [codesFrom, codesTo] = await Promise.all([
      getAirportCodes(searchword.wordfrom),
      getAirportCodes(searchword.wordto),
    ]);

    console.log("Codes From: ", codesFrom);
    console.log("Codes To: ", codesTo);

    // Now, you can store the codesFrom and codesTo values in lists or use them as needed.
    dispatch(setFlightCodes(codesFrom, codesTo));
    
  } catch (error) {
    console.error(error);
    // Handle any further error or return null
  }
};
