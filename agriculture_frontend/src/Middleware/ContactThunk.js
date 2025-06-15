import {createAsyncThunk} from "@reduxjs/toolkit";
import {ServiceAPI} from "../services/serviceAPI.js";

export const ContactThunk = createAsyncThunk(
  "contact/contactThunk",
  async ({body}) => {
      return await ServiceAPI.setAuthentication("contact", "", body);
  }
);