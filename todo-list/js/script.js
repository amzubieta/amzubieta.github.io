let caixaTexto = document.querySelector('#campo');
let form = document.querySelector('#formulario');
const primeiraDiv = document.querySelector('#div1');
const mensageerro = document.getElementById('mensagemErro');

form.addEventListener('submit', function(evento){
    evento.preventDefault();

    if (caixaTexto.value.length == 0 || caixaTexto.value.replace (/\s/g , '').length == 0) {
        mensageerro.classList.add('activo')
        return;    
    } 
   
    mensageerro.classList.remove('activo');
    let divmae = document.createElement("div");
    let tarefas = document.createElement("p");
    let excluir = document.createElement("span");
    let editar = document.createElement("span");

    divmae.className = "divTarefas";
    tarefas.innerHTML=caixaTexto.value;
    excluir.innerHTML="x";
    tarefas.innerHTML=caixaTexto.value;
    editar.innerHTML="Edit";
    editar.classList.add("editar");
    document.getElementById("campo").value = "";
    divmae.setAttribute('draggable', true);
    tarefas.setAttribute('draggable', true);
    primeiraDiv.setAttribute('draggable', true); 

    
    
    divmae.appendChild(tarefas);
    divmae.appendChild(excluir);
    divmae.appendChild(editar);
    primeiraDiv.appendChild(divmae);

    tarefas.addEventListener("dblclick", function(){
        tarefas.style.textDecoration = "line-through";
        tarefas.style.color = "grey";
    })

    tarefas.addEventListener("click", function(){
        tarefas.style.textDecoration = "none";
        tarefas.style.color = "black";
    })

    excluir.addEventListener("click", function(){
        divmae.parentNode.removeChild(divmae);   
    })

    editar.addEventListener("click",function(){
        if (!editar.classList.contains("vermelho")){ 
            // Permitir edicion
            editar.classList.add("vermelho");
            tarefas.setAttribute("contentEditable", true);
            editar.textContent = "Ok";
        } else {
            // Dejar como estava
            editar.classList.remove("vermelho");
            editar.textContent = "Editar";
            tarefas.setAttribute("contentEditable", false);

        }
    })

    let excluirTodas = document.getElementById('excluirTodas');
    let selecionarTodas = document.getElementById('selecionarTodas');
    let removerCompletos = document.getElementById("removerCompletos");

    excluirTodas.addEventListener("click", function(){
        evento.preventDefault()
        divmae.remove();
    })

    selecionarTodas.addEventListener("dblclick", function(){
        
        tarefas.style.textDecoration = "line-through";
        tarefas.style.color = "grey";
    }) 

    selecionarTodas.addEventListener("click", function(){
        tarefas.style.textDecoration = "none";
        tarefas.style.color = "black";
    }) 

    removerCompletos.addEventListener("click", function(){
        if(tarefas.style.textDecoration === "line-through"){
            primeiraDiv.removeChild(tarefas.parentNode);
        }
    })

    //divmae
    // divmae.addEventListener("dragstart", function (ev) { 
    //     dragging = ev.target.closest(primeiraDiv)//tarefas
    // })
    
    // divmae.addEventListener("dragover", function (ev) {
    //     ev.preventDefault();
    //     const node = ev.target.closest(primeiraDiv) 
    //     this.parentNode.insertBefore('dragging', node)
    // })

    // divmae.addEventListener("dragend", function (ev) { 
    //     ev.preventDefault();
    //     const node2 = ev.target.closest(primeiraDiv) 
    //     this.parentNode.insertBefore('dragging', node2)
    //     dragging = null     
    // })
    primeiraDiv.addEventListener("dragstart", function (ev) { 
        dragging = ev.target.closest(".divTarefas")//tarefas

    })
    
    primeiraDiv.addEventListener("dragover", function (ev) {
        ev.preventDefault();
		const node = ev.target.closest(".divTarefas") 
        this.insertBefore(dragging, node)

    })

    primeiraDiv.addEventListener("dragend", function (ev) { 
        dragging = null     

    })
});