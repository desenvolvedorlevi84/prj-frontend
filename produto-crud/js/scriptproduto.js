xhttp = new XMLHttpRequest();
var lista;
var api = "https://dev-isa01.herokuapp.com/api/produto/";

function listar() {
    xhttp.open("GET", api);
    xhttp.send();
    xhttp.onload = function () {
        lista = this.responseText;
        lista = JSON.parse(lista);    
        texto = "";
        i = 0;
        for (const u of lista) {
            texto += `<tr onclick='editar(${i})'><td>${u.nome}</td><td>${u.descricao}</td><td>${u.valor}</tr>`;
            i++;
        }
        document.getElementById('lista').innerHTML = texto;
    }
}

function editar(i) {
    u = lista[i];
    document.getElementById("nome").value = u.nome;
    document.getElementById("descricao").value = u.descricao;
    document.getElementById("valor").value = u.valor;
    document.getElementById("id").value = u.id;
}

function gravar() {
    var item = {};
    item.nome = document.getElementById("nome").value;
    item.descricao = document.getElementById("descricao").value;
    item.valor = document.getElementById("valor").value;
    item.id = document.getElementById("id").value;
    if (item.id > 0) {
        acao = "PUT"; 
    } else {
        acao = "POST";
    }

    xhttp.open(acao, api);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(item));
    xhttp.onload = function () {
        listar();
        limpar();
    }
}

function limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("id").value = "";
}

function apagar() {
    id = document.getElementById("id").value;
    xhttp.open("DELETE", api + id);
    xhttp.send();
    xhttp.onload = function () {
        alert(this.responseText);
        listar();
        limpar();
    }
}
listar();