
fetch("livros.json")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("livros-container");
        const input = document.getElementById("busca");

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

        render(data);

        input.addEventListener("input", () => {
            const termo = input.value.toLowerCase();
            const filtrado = data.filter(l => l.titulo.toLowerCase().includes(termo));
            render(filtrado);
        });
    });
