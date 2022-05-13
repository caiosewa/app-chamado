import axios from "axios";

// Pode ser algum servidor executando localmente:
// http://localhost:3000
// COLOCAR URL DA API

const api = axios.create({
  baseURL: "http://flask-proxy-api.herokuapp.com/",
});

export default api;
