
import axios from "axios";
export default axios.create({
 // baseURL: "http://localhost:8080/user",
  baseURL: "https://passwordmanager.liveblog365.com/api",
  headers: {
    "Content-type": "application/json",
    "Authorization":"Bearer " + localStorage.getItem("token"),
  }
});
