const button = document.querySelector('#add-btn');
const input = document.querySelector('#input-box');
const listaCompleta = document.querySelector('#area-lista')

let minhaListaDeItens = []



function adicionarNovaTarefa() {
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    })

    input.value = ''

    mostrarTarefas()
}

function mostrarTarefas() {

    let novaDiv = ''

    //[ ]
    minhaListaDeItens.forEach((item, posicao) => {
        novaDiv = novaDiv + `<div class="item ${item.concluida && "done"}">
        <div class="item-icone">
            <i class="circle"><img width="50" height="50" src="https://img.icons8.com/ios/50/circled.png"
                    alt="circled" / onclick="concluirTarefa(${posicao})"></i>
    
        </div>
        <div class="item-texto">
            ${item.tarefa}
        </div>
        <div class="item-botao">
            <button class="delete" onclick="deletarItem(${posicao})"><img width="30" height="30"
                    src="https://img.icons8.com/ios-glyphs/30/FA5252/filled-trash.png"
                    alt="filled-trash" /></button> 
    
        </div>
    
    </div>`
    })

    listaCompleta.innerHTML = novaDiv

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1)

    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

recarregarTarefas()

button.addEventListener("click", adicionarNovaTarefa)

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adicionarNovaTarefa();
    }
});

