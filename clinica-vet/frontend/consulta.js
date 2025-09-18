const API_URL = "http://localhost:3000/consultas"; // ajuste se sua porta for diferente

// Função para carregar consultas
async function carregarConsultas() {
  const resposta = await fetch(API_URL);
  const consultas = await resposta.json();

  const tabela = document.querySelector("#tabela-consultas tbody");
  tabela.innerHTML = "";

  consultas.forEach(consulta => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${consulta.id}</td>
      <td>${consulta.animal}</td>
      <td>${consulta.tutor}</td>
      <td>${consulta.servico}</td>
      <td>${new Date(consulta.data).toLocaleDateString()}</td>
    `;
    tabela.appendChild(tr);
  });
}

// Função para cadastrar nova consulta
document.getElementById("form-consulta").addEventListener("submit", async (e) => {
  e.preventDefault();

  const novaConsulta = {
    animal: document.getElementById("animal").value,
    tutor: document.getElementById("tutor").value,
    servico: document.getElementById("servico").value,
    data: document.getElementById("data").value
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novaConsulta)
  });

  e.target.reset(); // limpa o formulário
  carregarConsultas(); // recarrega a lista
});

// Inicializa carregando as consultas
carregarConsultas();
