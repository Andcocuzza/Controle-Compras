const listaAnimais = document.getElementById('lista-animais');
const formAnimal = document.getElementById('form-animal');
const btnSubmit = document.getElementById('btn-submit');
const API_URL = 'http://localhost:3000/animais';

async function listarAnimais() {
  if (!listaAnimais) return;
  listaAnimais.innerHTML = '';
  try {
    const res = await fetch(API_URL);
    const animais = await res.json();

    animais.forEach(animal => {
      const li = document.createElement('li');
      li.textContent = `${animal.nome} - ${animal.especie} - ${animal.raca} - ${animal.idade} anos - Tutor: ${animal.tutor}`;

      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.addEventListener('click', () => preencherFormulario(animal));

      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.addEventListener('click', () => excluirAnimal(animal.id));

      li.appendChild(btnEditar);
      li.appendChild(btnExcluir);
      listaAnimais.appendChild(li);
    });
  } catch (err) { console.error(err); }
}

function preencherFormulario(animal) {
  if (!formAnimal) return;
  document.getElementById('animal-id').value = animal.id;
  formAnimal.nome.value = animal.nome;
  formAnimal.especie.value = animal.especie;
  formAnimal.raca.value = animal.raca;
  formAnimal.idade.value = animal.idade;
  formAnimal.tutor.value = animal.tutor;
  btnSubmit.textContent = 'Salvar Alterações';
}

async function excluirAnimal(id) {
  if (confirm('Deseja realmente excluir este animal?')) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      listarAnimais();
    } catch (err) { console.error(err); }
  }
}

if (formAnimal) {
  formAnimal.addEventListener('submit', async e => {
    e.preventDefault();
    const id = document.getElementById('animal-id').value;
    const dados = {
      nome: formAnimal.nome.value,
      especie: formAnimal.especie.value,
      raca: formAnimal.raca.value,
      idade: Number(formAnimal.idade.value),
      tutor: formAnimal.tutor.value
    };

    try {
      if (id) {
        await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });
        btnSubmit.textContent = 'Cadastrar';
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });
      }
      formAnimal.reset();
      document.getElementById('animal-id').value = '';
      listarAnimais();
    } catch (err) { console.error(err); }
  });
}

// Inicializa
listarAnimais();
