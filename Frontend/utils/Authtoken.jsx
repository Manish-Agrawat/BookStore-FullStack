import axios from "axios";
import baseUrl from "../src/components/Url";


export async function authToken() {
  try {
    const response = await axios.get(`${baseUrl}/api/users/token-verify`, {
      withCredentials: true,
    });

    return response.data; // Returns true if the token is valid
  } catch (error) {
    return false; // Returns false if the token is invalid
  }
}
