
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const container = document.getElementById("livros-container");
const buscaInput = document.getElementById("busca");
const filtroStatus = document.getElementById("filtro-status");
const filtroSerie = document.getElementById("filtro-serie");
const contadorDiv = document.getElementById("contador");

const carregarLivros = async () => {
  const livrosCol = collection(db, "livros");
  const snapshot = await getDocs(livrosCol);
  const livros = snapshot.docs.map(doc => doc.data());

  const series = [...new Set(livros.map(l => l.serie).filter(Boolean))];
  series.forEach(serie => {
    const option = document.createElement("option");
    option.value = serie;
    option.textContent = serie;
    filtroSerie.appendChild(option);
  });

  const mostrarLivros = () => {
    const termo = buscaInput.value.toLowerCase();
    const statusFiltro = filtroStatus.value;
    const serieFiltro = filtroSerie.value;

    const filtrados = livros.filter(l => {
      const correspondeBusca = l.titulo.toLowerCase().includes(termo);
      const correspondeStatus = statusFiltro === "todos" || l.status === statusFiltro;
      const correspondeSerie = serieFiltro === "todas" || l.serie === serieFiltro;
      return correspondeBusca && correspondeStatus && correspondeSerie;
    });

    const total = livros.length;
    const disponiveis = livros.filter(l => l.status === "disponivel").length;
    const emprestados = livros.filter(l => l.status === "emprestado").length;
    contadorDiv.innerHTML = `📚 Total: ${total} | ✅ Disponíveis: ${disponiveis} | ❌ Emprestados: ${emprestados}`;

    container.innerHTML = "";
    filtrados.forEach(livro => {
      const div = document.createElement("div");
      div.className = "livro";
      div.innerHTML = `
        <h3>${livro.titulo}</h3>
        <p>Status: <strong style="color:${livro.status === 'disponivel' ? 'green' : 'red'}">${livro.status}</strong></p>
        ${livro.status === "emprestado" ? `<p>Aluno: ${livro.aluno}<br>Série: ${livro.serie}<br>Data: ${livro.data}</p>` : ""}
      `;
      container.appendChild(div);
    });
  };

  buscaInput.addEventListener("input", mostrarLivros);
  filtroStatus.addEventListener("change", mostrarLivros);
  filtroSerie.addEventListener("change", mostrarLivros);

  mostrarLivros();
};

carregarLivros();
