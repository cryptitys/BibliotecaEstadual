
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const lista = document.getElementById("lista-livros");
const livrosCol = collection(db, "livros");

getDocs(livrosCol).then(snapshot => {
  snapshot.forEach(doc => {
    const livro = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `<strong>${livro.titulo}</strong> - ${livro.status}
      ${livro.status === "emprestado" ? `<br>Aluno: ${livro.aluno}<br>Série: ${livro.serie}<br>Data: ${livro.data}` : ""}`;
    lista.appendChild(div);
  });
});
