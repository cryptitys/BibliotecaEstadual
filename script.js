fetch("livros.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("livros-container");
    const input = document.getElementById("busca");
    const filtro = document.getElementById("filtro-status");

    function render(lista) {
      container.innerHTML = "";
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
