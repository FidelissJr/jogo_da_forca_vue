import axios from "axios";

const API_URL = "http://localhost:5014";

export default {
  async cadastrar(usuario) {
    return axios.post(`${API_URL}/usuarios`, usuario);
  },
  async logar(usuario) {
    return axios.post(`${API_URL}/login`, usuario);
  },
  async listar() {
    try {
      const res = await axios.get(`${API_URL}/usuarios`);
      return res.data;
    } catch (error) {
      console.error("AXIOS ERROR message:", error);
    }
  },
  async pontuar(nome) {
    await axios
      .post(`${API_URL}/pontuar/${nome}`)
      .then((res) => {
        console.log(res.data.usuario);
      })
      .catch((err) => {
        console.error("Erro ao pontuar:", err);
      });
  },
};
