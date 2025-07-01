// Array inicial de livros (pode ser substituído por livros.json depois)
let livros = [
    { id: 1, titulo: "Dom Casmurro", autor: "Machado de Assis", status: "Disponível" },
    { id: 2, titulo: "Harry Potter", autor: "J.K. Rowling", status: "Emprestado" },
    { id: 3, titulo: "1984", autor: "George Orwell", status: "Disponível" },
];

// Função para carregar e exibir livros
function carregarLivros(filtro = "") {
    const listaLivros = document.getElementById("listaLivros");
    const totalDisponiveis = document.getElementById("totalDisponiveis");
    let disponiveis = 0;

    listaLivros.innerHTML = ""; // Limpa a tabela
    const livrosFiltrados = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        livro.autor.toLowerCase().includes(filtro.toLowerCase())
    );

    livrosFiltrados.forEach(livro => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td class="${livro.status === 'Disponível' ? 'disponivel' : 'emprestado'}">${livro.status}</td>
        `;
        listaLivros.appendChild(tr);
        if (livro.status === "Disponível") disponiveis++;
    });

    totalDisponiveis.textContent = disponiveis;
}

// Função para adicionar um livro
function adicionarLivro(event) {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const status = document.getElementById("status").value;

    const novoLivro = {
        id: livros.length + 1,
        titulo,
        autor,
        status
    };

    livros.push(novoLivro);
    carregarLivros();
    document.getElementById("formAdicionar").reset();
}

// Evento de pesquisa
document.getElementById("pesquisa").addEventListener("input", (e) => {
    carregarLivros(e.target.value);
});

// Evento de adicionar livro
document.getElementById("formAdicionar").addEventListener("submit", adicionarLivro);

// Carrega os livros ao iniciar
carregarLivros();
