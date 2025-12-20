console.log("Script carregado");

// ================= ELEMENTOS =================
const form = document.getElementById("formCompras");
const corpoTabela = document.getElementById("corpoTabela");
const totalMesCelula = document.getElementById("totalMes");
const btnCancelar = document.getElementById("btnCancelar");
const inputLimite = document.getElementById("limite");
const avisoLimite = document.getElementById("avisoLimite");
const inputMes = document.getElementById("mesSelecionado");

// INPUTS
const produto = document.getElementById("produto");
const marca = document.getElementById("marca");
const quantidadeInput = document.getElementById("quantidade");
const precoInput = document.getElementById("preco");
const local = document.getElementById("local");
const data = document.getElementById("data");
const observacoes = document.getElementById("observacoes");

// ================= MÊS ATUAL =================
const hoje = new Date();
inputMes.value = hoje.toISOString().slice(0, 7);

// ================= BANCO =================
let bancoCompras = JSON.parse(localStorage.getItem("bancoCompras")) || {};
let mesAtual = inputMes.value;

if (!bancoCompras[mesAtual]) bancoCompras[mesAtual] = [];
let compras = bancoCompras[mesAtual];

// ================= FUNÇÕES =================
function salvarBanco() {
  localStorage.setItem("bancoCompras", JSON.stringify(bancoCompras));
}

function calcularTotalMes() {
  const total = compras.reduce((acc, c) => acc + c.total, 0);
  totalMesCelula.textContent = "R$ " + total.toFixed(2);

  const limite = parseFloat(inputLimite.value) || 0;

  if (limite > 0 && total >= limite) {
    avisoLimite.textContent = "⚠️ Limite do mês atingido";
  } else if (limite > 0) {
    avisoLimite.textContent = "✔️ Dentro do limite";
  } else {
    avisoLimite.textContent = "";
  }
}

// ================= PREENCHER FORM =================
function preencherFormulario(compra) {
  produto.value = compra.produto;
  marca.value = compra.marca;
  quantidadeInput.value = compra.quantidade;
  precoInput.value = compra.preco;
  local.value = compra.local;
  data.value = compra.data;
  observacoes.value = compra.observacoes;
}

// ================= TABELA =================
function carregarCompras() {
  corpoTabela.innerHTML = "";

  compras.forEach((c, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="clicavel">${c.produto}</td>
      <td>${c.marca}</td>
      <td>${c.quantidade}</td>
      <td>R$ ${c.preco.toFixed(2)}</td>
      <td>R$ ${c.total.toFixed(2)}</td>
      <td>${c.local}</td>
      <td>${c.data}</td>
      <td>${c.observacoes}</td>
      <td>
        <button onclick="removerCompra(${index})">Remover</button>
      </td>
    `;

    // 👉 clique na linha
    tr.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") {
        preencherFormulario(c);
      }
    });

    corpoTabela.appendChild(tr);
  });

  calcularTotalMes();
}

// ================= EVENTOS =================
inputMes.addEventListener("change", () => {
  mesAtual = inputMes.value;
  if (!bancoCompras[mesAtual]) bancoCompras[mesAtual] = [];
  compras = bancoCompras[mesAtual];
  carregarCompras();
});

inputLimite.addEventListener("input", calcularTotalMes);

function removerCompra(index) {
  compras.splice(index, 1);
  salvarBanco();
  carregarCompras();
}

// ================= SUBMIT =================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const qtd = parseFloat(quantidadeInput.value);
  const preco = parseFloat(precoInput.value);

  compras.push({
    produto: produto.value.trim(),
    marca: marca.value.trim(),
    quantidade: qtd,
    preco: preco,
    total: qtd * preco,
    local: local.value,
    data: data.value,
    observacoes: observacoes.value
  });

  salvarBanco();
  carregarCompras();
  form.reset();
});

// ================= INIT =================
carregarCompras();
