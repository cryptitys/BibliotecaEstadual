fetch("livros.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("livros-container");
    const input = document.getElementById("busca");
    const filtro = document.getElementById("filtro-status");

    // Criar e posicionar o contador
    const contador = document.createElement("div");
    contador.id = "contador";
    contador.style.fontWeight = "bold";
    contador.style.marginBottom = "1rem";
    container.before(contador);

    // Atualizar contador
    function atualizarContador(lista) {
      const total = lista.length;
      const disponiveis = lista.filter(l => l.status === "disponivel").length;
      const emprestados = lista.filter(l => l.status === "emprestado").length;
      contador.innerText = `📚 Total: ${total} livros | ✅ ${disponiveis} disponíveis | ❌ ${emprestados} emprestados`;
    }

    // Renderizar lista
    function render(lista) {
      container.innerHTML = "";
      atualizarContador(lista);
      lista.forEach(livro => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h2>${livro.titulo}</h2>
          <p>Status: <strong class="${livro.status}">${livro.status === "disponivel" ? "Disponível" : "Emprestado"}</strong></p>
          ${livro.status === "emprestado" ? `<p>Aluno: ${livro.aluno} (${livro.serie})</p><p>Data: ${livro.data}</p>` : ""}
        `;
        container.appendChild(card);
      });
    }

    // Filtro ativo
    function filtrar() {
      const termo = input.value.toLowerCase();
      const statusSelecionado = filtro.value;
      const resultado = data.filter(l => {
        const matchTitulo = l.titulo.toLowerCase().includes(termo);
        const matchStatus = statusSelecionado === "todos" || l.status === statusSelecionado;
        return matchTitulo && matchStatus;
      });
      render(resultado);
    }

    input.addEventListener("input", filtrar);
    filtro.addEventListener("change", filtrar);
    render(data);
  });
