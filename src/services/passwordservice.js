
import http from "../http-common";

class passwordservice {
register(data) {
  return http.post('/users/register', data)
    }

// login(data) {
//   return http.post('/userlogin', data)
// }

login(data) {
  return http.post('/users/login', data)
}

alllinks(owner){
  return http.get(`/links/${owner}`);
}

createlinks(data) {
  return http.post('/links', data)
}

deletelink(id) {
  return http.delete(`/link/${id}`);
}

updatelinks(id, data) {
  return http.put(`/link/${id}`, data)
}


}

export default new passwordservice();
