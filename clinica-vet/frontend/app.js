const listaAnimais = document.getElementById('lista-animais');
const formAnimal = document.getElementById('form-animal');
const btnSubmit = document.getElementById('btn-submit');

const API_URL = 'http://localhost:3000/animais'; // rota do back-end

// Função para buscar e listar animais
async function listarAnimais() {
  listaAnimais.innerHTML = ''; // limpa a lista
  try {
    const res = await fetch(API_URL);
    const animais = await res.json();

    animais.forEach(animal => {
      const li = document.createElement('li');
      li.textContent = `${animal.nome} - ${animal.especie} - ${animal.raca} - ${animal.idade} anos - Tutor: ${animal.tutor_nome || animal.tutor_id}`;

      // Botão Editar
      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.addEventListener('click', () => preencherFormulario(animal));

      // Botão Excluir
      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.addEventListener('click', () => excluirAnimal(animal.id));

      li.appendChild(btnEditar);
      li.appendChild(btnExcluir);
      listaAnimais.appendChild(li);
    });
  } catch (err) {
    console.error('Erro ao listar animais:', err);
  }
}

// Função para preencher o formulário para edição
function preencherFormulario(animal) {
  document.getElementById('animal-id').value = animal.id;
  document.querySelector('input[name="nome"]').value = animal.nome;
  document.querySelector('input[name="especie"]').value = animal.especie;
  document.querySelector('input[name="raca"]').value = animal.raca;
  document.querySelector('input[name="idade"]').value = animal.idade;
  document.querySelector('input[name="tutor_id"]').value = animal.tutor_id;
  btnSubmit.textContent = 'Salvar Alterações';
}

// Função para cadastrar ou atualizar animal
formAnimal.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('animal-id').value;
  const dados = {
    nome: formAnimal.nome.value,
    especie: formAnimal.especie.value,
    raca: formAnimal.raca.value,
    idade: Number(formAnimal.idade.value),
    tutor_id: Number(formAnimal.tutor_id.value)
  };

  try {
    if (id) {
      // Atualizar
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      btnSubmit.textContent = 'Cadastrar';
    } else {
      // Cadastrar
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
    }

    formAnimal.reset();
    document.getElementById('animal-id').value = '';
    listarAnimais();
  } catch (err) {
    console.error('Erro ao salvar animal:', err);
  }
});

// Função para excluir animal
async function excluirAnimal(id) {
  if (confirm('Deseja realmente excluir este animal?')) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      listarAnimais();
    } catch (err) {
      console.error('Erro ao excluir animal:', err);
    }
  }
}

// Inicializa a lista ao carregar a página
listarAnimais();
