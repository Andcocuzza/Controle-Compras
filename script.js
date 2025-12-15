console.log("Script carregado com sucesso!");

const form = document.getElementById("formCompras");
const corpoTabela = document.getElementById("corpoTabela");
const totalMesCelula = document.getElementById("totalMes");
const btnCancelar = document.getElementById("btnCancelar");
const inputLimite = document.getElementById("limite");
const avisoLimite = document.getElementById("avisoLimite");

/* =============================
   FUNÇÕES AUXILIARES
============================= */
function obterMesAno(data) {
  if (!data) return null;
  const d = new Date(data);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/* =============================
   LOCALSTORAGE (POR MÊS)
============================= */
let comprasPorMes =
  JSON.parse(localStorage.getItem("comprasPorMes")) || {};

let mesAtual = obterMesAno(new Date().toISOString());
let compras = comprasPorMes[mesAtual] || [];

let editandoIndex = null;

/* =============================
   LIMITE DE GASTOS
============================= */
let limite = parseFloat(localStorage.getItem("limite")) || 0;

if (limite > 0) {
  inputLimite.value = limite;
}

inputLimite.addEventListener("input", () => {
  limite = parseFloat(inputLimite.value) || 0;
  localStorage.setItem("limite", limite);
  calcularTotalMes();
});

/* =============================
   SALVAR COMPRAS
============================= */
function salvarCompras() {
  comprasPorMes[mesAtual] = compras;
  localStorage.setItem("comprasPorMes", JSON.stringify(comprasPorMes));
}

/* =============================
   TOTAL DO MÊS
============================= */
function calcularTotalMes() {
  const total = compras.reduce((acc, compra) => acc + compra.total, 0);
  totalMesCelula.textContent = "R$ " + total.toFixed(2);

  if (limite > 0 && total >= limite) {
    avisoLimite.textContent = "⚠️ Atenção: Limite de compras atingido!";
    avisoLimite.className = "limite-estourado";
  } else if (limite > 0) {
    avisoLimite.textContent = "✔️ Compras dentro do limite";
    avisoLimite.className = "limite-ok";
  } else {
    avisoLimite.textContent = "";
  }
}

/* =============================
   CARREGAR COMPRAS DO MÊS
============================= */
function carregarCompras() {
  corpoTabela.innerHTML = "";

  compras = comprasPorMes[mesAtual] || [];

  compras.forEach((compra, index) => {
    const preco = parseFloat(compra.preco) || 0;
    const total = parseFloat(compra.total) || 0;

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${compra.produto}</td>
      <td>${compra.marca}</td>
      <td>${compra.quantidade}</td>
      <td>R$ ${preco.toFixed(2)}</td>
      <td>R$ ${total.toFixed(2)}</td>
      <td>${compra.local}</td>
      <td>${compra.data}</td>
      <td>${compra.observacoes}</td>
      <td>
        <button class="btn-remover" onclick="removerCompra(${index})">
          Remover
        </button>
      </td>
    `;
    corpoTabela.appendChild(linha);
  });

  calcularTotalMes();
}

/* =============================
   REMOVER COMPRA
============================= */
function removerCompra(index) {
  compras.splice(index, 1);
  salvarCompras();
  carregarCompras();
}

/* =============================
   EDITAR COMPRA
============================= */
function editarCompra(index) {
  const compra = compras[index];

  document.getElementById("produto").value = compra.produto;
  document.getElementById("marca").value = compra.marca;
  document.getElementById("quantidade").value = compra.quantidade;
  document.getElementById("preco").value = compra.preco;
  document.getElementById("local").value = compra.local;
  document.getElementById("data").value = compra.data;
  document.getElementById("observacoes").value = compra.observacoes;

  editandoIndex = index;
}

/* =============================
   SUBMIT DO FORM
============================= */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const produto = document.getElementById("produto").value;
  const marca = document.getElementById("marca").value;
  const quantidade = parseFloat(document.getElementById("quantidade").value);
  const preco = parseFloat(document.getElementById("preco").value);
  const local = document.getElementById("local").value;
  const data = document.getElementById("data").value;
  const observacoes = document.getElementById("observacoes").value;

  const total = quantidade * preco;

  // 👉 DEFINE O MÊS PELA DATA DA COMPRA
  const mesCompra = obterMesAno(data);
  mesAtual = mesCompra;

  comprasPorMes[mesAtual] = comprasPorMes[mesAtual] || [];
  compras = comprasPorMes[mesAtual];

  const novaCompra = {
    produto,
    marca,
    quantidade,
    preco,
    total,
    local,
    data,
    observacoes
  };

  if (editandoIndex !== null) {
    compras[editandoIndex] = novaCompra;
    editandoIndex = null;
  } else {
    compras.push(novaCompra);
  }

  salvarCompras();
  carregarCompras();
  form.reset();
});

/* =============================
   CANCELAR EDIÇÃO
============================= */
btnCancelar.addEventListener("click", () => {
  form.reset();
  editandoIndex = null;
});

/* =============================
   INICIALIZA
============================= */
carregarCompras();


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => console.log("Service Worker registrado com sucesso!"))
      .catch((erro) => console.log("Erro ao registrar SW:", erro));
  });
}
