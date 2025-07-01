// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCuDMMDpvzvnrC40HAdGFQeJssZaO4N-6g",
    authDomain: "biblioteca-web-630c8.firebaseapp.com",
    projectId: "biblioteca-web-630c8",
    storageBucket: "biblioteca-web-630c8.firebasestorage.app",
    messagingSenderId: "67001997597",
    appId: "1:67001997597:web:a133fda6c73839f3b5a9f4"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Variáveis
let livros = [];

// Carregar livros do Firebase
function carregarLivros() {
    db.collection("livros").get().then((querySnapshot) => {
        livros = [];
        querySnapshot.forEach((doc) => {
            console.log("Documento carregado:", doc.data()); // Depuração
            livros.push({ id: doc.id, ...doc.data() });
        });
        console.log("Livros carregados:", livros); // Depuração
        atualizarLista();
    }).catch((error) => {
        console.error("Erro ao carregar livros:", error); // Depuração de erros
    });
}

// Atualizar lista de livros
function atualizarLista() {
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();
    const filtroStatus = document.getElementById("filtroStatus").value;
    const filtroSerie = document.getElementById("filtroSerie").value;
    const listaLivros = document.getElementById("listaLivros");
    const totalLivros = document.getElementById("totalLivros");
    const disponiveis = document.getElementById("disponiveis");
    const emprestados = document.getElementById("emprestados");

    listaLivros.innerHTML = "";
    let dispCount = 0;
    let empCount = 0;

    const livrosFiltrados = livros.filter(livro => {
        const matchesSearch = livro.titulo.toLowerCase().includes(pesquisa);
        const matchesStatus = filtroStatus === "Todos" || livro.status === filtroStatus;
        const matchesSerie = filtroSerie === "Todas as séries" || (livro.serie && livro.serie === filtroSerie);
        return matchesSearch && matchesStatus && matchesSerie;
    });

    livrosFiltrados.forEach(livro => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p>Status: <span class="${livro.status === 'Disponível' ? 'available-status' : 'borrowed-status'}">${livro.status}</span></p>
            ${livro.status === 'Emprestado' ? `<p>Aluno: ${livro.aluno || 'N/A'}</p>` : ''}
            ${livro.status === 'Emprestado' ? `<p>Data: ${livro.data || 'N/A'}</p>` : ''}
        `;
        listaLivros.appendChild(card);
        if (livro.status === 'Disponível') dispCount++;
        else empCount++;
    });

    totalLivros.textContent = livros.length;
    disponiveis.textContent = dispCount;
    emprestados.textContent = empCount;
}

// Eventos
document.getElementById("pesquisa").addEventListener("input", atualizarLista);
document.getElementById("filtroStatus").addEventListener("change", atualizarLista);
document.getElementById("filtroSerie").addEventListener("change", atualizarLista);

// Carregar livros ao iniciar
carregarLivros();
