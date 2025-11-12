console.log("Script carregado com sucesso!");

const form = document.getElementById("formCompras");
const corpoTabela = document.getElementById("corpoTabela");
const totalMesCelula = document.getElementById("totalMes");
const btnCancelar = document.getElementById("btnCancelar");

let compras = JSON.parse(localStorage.getItem("compras")) || [];
let editandoIndex = null;

function salvarCompras() {
  localStorage.setItem("compras", JSON.stringify(compras));
}

function calcularTotalMes() {
  const total = compras.reduce((acc, compra) => acc + compra.total, 0);
  totalMesCelula.textContent = "R$ " + total.toFixed(2);
}

function carregarCompras() {
  corpoTabela.innerHTML = "";

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
        <button class="btn-remover" onclick="removerCompra(${index})">Remover</button>
      </td>
    `;
    corpoTabela.appendChild(linha);
  });

  calcularTotalMes();
}


function removerCompra(index) {
  compras.splice(index, 1);
  salvarCompras();
  carregarCompras();
}

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

  const novaCompra = { produto, marca, quantidade, preco, total, local, data, observacoes };

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

btnCancelar.addEventListener("click", () => {
  form.reset();
  editandoIndex = null;
});

carregarCompras();
