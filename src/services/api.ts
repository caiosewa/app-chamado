import axios from "axios";

// Pode ser algum servidor executando localmente:
// http://localhost:3000
// COLOCAR URL DA API

const api = axios.create({
  baseURL: "http://main.barroscasa.me:8550/",
});

export default api;
