import axios from "axios"
import { BASE_URL } from "../api"

const Api = axios.create({
  baseURL: BASE_URL,
})

export { Api }
