import axios from "axios";

const API_URL = "http://localhost:5014";

export default {
  async listar() {
    try {
      const res = await axios.get(`${API_URL}/palavras`); // ou "/api/palavra" dependendo da rota
      return res.data;
    } catch (error) {
      console.error("AXIOS ERROR message:", error.message);
      if (error.response) {
        console.error("AXIOS ERROR response.status:", error.response.status);
        console.error("AXIOS ERROR response.data:", error.response.data);
      } else if (error.request) {
        console.error("AXIOS ERROR no response, request sent:", error.request);
      } else {
        console.error("AXIOS ERROR setup:", error);
      }
      throw error; // re-throw se quiser tratar acima
    }
  },

  async cadastrar(palavra) {
    const dto = {
      palavraTexto: palavra.resposta,
      dica1: palavra.dicas1,
      dica2: palavra.dicas2,
      dica3: palavra.dicas3,
    };
    return axios.post(`${API_URL}/palavras`, dto);
  },

  async excluir(id) {
    return axios.delete(`${API_URL}/palavras/${id}`);
  },
};
