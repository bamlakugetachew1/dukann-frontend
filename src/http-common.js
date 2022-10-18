
import axios from "axios";
export default axios.create({
 // baseURL: "http://localhost:8080/user",
<<<<<<< HEAD
  baseURL: "http://localhost:3000",
=======
  baseURL: "https://passwordmanager.liveblog365.com/api",
>>>>>>> a7dc5e057943eb469eca1e3a88aaf87c5f75f8fa
  headers: {
    "Content-type": "application/json",
    "Authorization":"Bearer " + localStorage.getItem("token"),
     "credentials": "same-origin",
     "Accept": "application/json",
  }
});
