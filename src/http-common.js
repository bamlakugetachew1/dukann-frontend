
import axios from "axios";
export default axios.create({
 // baseURL: "http://localhost:8080/user",
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
    "Authorization":"Bearer " + localStorage.getItem("token"),
     "credentials": "same-origin",
     "Accept": "application/json",
  }
});
