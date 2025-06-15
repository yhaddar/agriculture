import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";

export const WeatherThunk = createAsyncThunk(
  "setting/weatherThunk",
    async () => {
      return await ServiceAPI.getWeather("setting", "weather");
    }
);