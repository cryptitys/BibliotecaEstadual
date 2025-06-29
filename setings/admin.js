import { db, auth } from "./firebase.js";
import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "login.html";
  }
});

document.getElementById("sair").onclick = () => {
  signOut(auth).then(() => window.location.href = "index.html");
};

const adminDiv = document.getElementById("admin-livros");
const livrosCol = collection(db, "livros");

getDocs(livrosCol).then(snapshot => {
  snapshot.forEach(docSnap => {
    const livro = docSnap.data();
    const id = docSnap.id;

    const container = document.createElement("div");
    container.innerHTML = `
      <input value="${livro.titulo}" id="titulo-${id}" />
      <input value="${livro.status}" id="status-${id}" />
      <input value="${livro.aluno || ''}" id="aluno-${id}" />
      <input value="${livro.serie || ''}" id="serie-${id}" />
      <input value="${livro.data || ''}" id="data-${id}" />
      <button onclick="salvar('${id}')">Salvar</button>
      <hr/>
    `;
    adminDiv.appendChild(container);
  });
});

window.salvar = async function (id) {
  const titulo = document.getElementById(`titulo-${id}`).value;
  const status = document.getElementById(`status-${id}`).value;
  const aluno = document.getElementById(`aluno-${id}`).value;
  const serie = document.getElementById(`serie-${id}`).value;
  const data = document.getElementById(`data-${id}`).value;

  const livroRef = doc(db, "livros", id);
  await updateDoc(livroRef, { titulo, status, aluno, serie, data });
  alert("Livro atualizado!");
};
