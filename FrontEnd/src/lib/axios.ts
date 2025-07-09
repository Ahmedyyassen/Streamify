import axios from "axios";
import { SERVER_HOST } from "../constants/constants";

export const request = axios.create({
  baseURL: SERVER_HOST,
  withCredentials: true,
});