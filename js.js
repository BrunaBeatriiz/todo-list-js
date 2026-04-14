let tarefa = document.getElementById("texto");
// let button = document.getElementById("button");
// let resultado = document.getElementById("resultado");
let lista = document.getElementById("lista");

let listaTarefas = [];

const salvarTarefa = () => {
    if (tarefa.value.length === 0) {
        alert("Digite uma tarefa valida!");
        return;
    }

    const nova = {
        id: Date.now(),
        tarefa: tarefa.value,
        completed: false,
    };


    listaTarefas.push(nova);
    localStorage.setItem("listaTarefasSalva", JSON.stringify(listaTarefas));
    tarefa.value = "";

    exibirTarefa(nova.id);

}

function exibirTarefa() {
    lista.innerHTML = "";

    listaTarefas = JSON.parse(localStorage.getItem("listaTarefasSalva"));

    listaTarefas.map((tarefa) => {
        let elemento = document.createElement("li");
        let divEsquerda = document.createElement("div");
        let h2 = document.createElement("h2");
        let checkedBox = document.createElement("input");
        let button = document.createElement("button");



        // excluir(tarefa.id) está sendo executado na hora
        // Você precisa passar uma função, não executar:
        button.addEventListener('click', () => {
            excluir(tarefa.id)
            //  if (confirm('Tem certeza que quer excluir essa tarefa?')) {
            //     excluir(tarefa.id);
            //   }
        }
        );
        button.classList = "material-symbols-outlined";

        checkedBox.type = "checkbox";

        h2.textContent = tarefa.tarefa;
        button.innerHTML = 'delete'

        divEsquerda.appendChild(checkedBox);
        divEsquerda.appendChild(h2);

        elemento.appendChild(divEsquerda);
        elemento.appendChild(button);



        lista.appendChild(elemento);

        checkedBox.addEventListener("change", () => {
            tarefa.completed = checkedBox.checked;

            h2.style.textDecoration = checkedBox.checked ? h2.classList.add("tarefaConcluida") : h2.classList.remove("tarefaConcluida");

            localStorage.setItem("listaTarefasSalva", JSON.stringify(listaTarefas));
        })
    })
}

const excluir = (tarefaId) => {
    const lista = JSON.parse(localStorage.getItem("listaTarefasSalva"));

    const listaLimpa = lista.filter((tarefa) => tarefa.id !== tarefaId);

    localStorage.setItem("listaTarefasSalva", JSON.stringify(listaLimpa));
    exibirTarefa();
}


function limparTarefas() {
    listaTarefas = [];

    lista.textContent = "";
    
    localStorage.removeItem("listaTarefasSalva")
}

// button.addEventListener('click', excluir());
// Isso executa a função imediatamente, e o resultado (provavelmente undefined) é passado como manipulador do evento.

// ✅ Correto:
// js
// Copiar código
// button.addEventListener('click', excluir);
// Assim, você está dizendo: “Quando o botão for clicado, chame a função excluir”.