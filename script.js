
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const container = document.getElementById("livros-container");
const buscaInput = document.getElementById("busca");

const carregarLivros = async () => {
  const livrosCol = collection(db, "livros");
  const snapshot = await getDocs(livrosCol);
  const livros = snapshot.docs.map(doc => doc.data());

  const mostrarLivros = (filtro = "") => {
    container.innerHTML = "";
    livros
      .filter(l => l.titulo.toLowerCase().includes(filtro.toLowerCase()))
      .forEach(livro => {
        const div = document.createElement("div");
        div.className = "livro";
        div.innerHTML = `
          <strong>${livro.titulo}</strong><br>
          Status: <span style="color:${livro.status === 'disponivel' ? 'green' : 'red'}">${livro.status}</span><br>
          ${livro.status === "emprestado" ? `Aluno: ${livro.aluno} (${livro.serie})<br>Data: ${livro.data}` : ""}
          <hr>
        `;
        container.appendChild(div);
      });
  };

  mostrarLivros();

  buscaInput.addEventListener("input", () => {
    mostrarLivros(buscaInput.value);
  });
};

carregarLivros();
