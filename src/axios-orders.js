import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-b0143.firebaseio.com/"
});

export default instance;
