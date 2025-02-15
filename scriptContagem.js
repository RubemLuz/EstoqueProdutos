//PENDENCIAS:
// - Converter todas as palavras para maiusculas
// - Fazer sistema de Usuarios


let estocagemId = [];
let nomeproduto = [];
let quantidadeproduto = [];

let estoqueON = false;

var showIDList = document.getElementById('idlist');
var showNomeList = document.getElementById('nomelist');
var showQntList = document.getElementById('qntlist');

var inputNome = document.getElementById('produtonome');
var inputQnt = document.getElementById('qnt');


var tableLog = document.getElementById('listalog');
var tableEstoque = document.getElementById('listaestoque');

var carregarDados = LoadData();

function AdicionarProduto(nome, quantidade)
{
    if(nome == '' && quantidade == '')  // Verifica se os campos estão vazios
    {
        window.alert("Preencha todos os campos!");
        return;
    }
    else
    {
        if(nomeproduto.indexOf(nome) != -1) //Verifica se o produto já existe
            {
                window.alert("Produto duplicado!");

                for(var i = 0; i < nomeproduto.length; i++) //Percorre a lista de produtos
                {
                    if(nomeproduto[i] == nome) //Identifica o produto
                    {
                        quantidadeproduto[i] += Number(quantidade); //Soma a quantidade registrada com o atual

                        var addLog = document.createElement('option');
                        addLog.text = "ID: " + (i + 1) + " | Nome do Produto: " + nome + " | Qnt Adicionada: " + quantidadeproduto[i];
                        tableLog.appendChild(addLog);
                
                        window.alert("Produto adicionado com sucesso!");

                        SaveData();
                        return inputNome.value = '', inputQnt.value = '1';
                    }
                }
   
            }

            //Caso o produto não exista, criará um novo ID
            var checkID = estocagemId.length;    
            estocagemId.push(checkID + 1);

            nomeproduto.push(nome);
            quantidadeproduto.push(Number(quantidade));

            var addLog = document.createElement('option');
            addLog.text = "ID Gerado: " + (checkID + 1) + " | Nome do Produto: " + nome + " | Quantidade: " + quantidade;
            tableLog.appendChild(addLog);

            window.alert("Produto adicionado com sucesso!");

            //var thelog = document.getElementById('log').innerHTML = nome;

            SaveData();
            return inputNome.value = '', inputQnt.value = '1';        
            

    }


}

function ShowEstoque()
{
    tableEstoque.innerHTML = '';
    for(var i = 0; i < estocagemId.length; i++)
    {
        if(estocagemId[i] != 0)
        {
            var addProd = document.createElement('option');
    
            addProd.text = "ID: " + estocagemId[i] + " | Nome do Produto: " + nomeproduto[i] + " | Quantidade: " + quantidadeproduto[i];
            tableEstoque.appendChild(addProd);      
        }
  
    }
    var contagemProd = document.getElementById('contagemprod').innerHTML = "Total de Produtos: " + estocagemId.length;
}

function ShowProdutos()
{
    estoqueON = true;
    tableEstoque.innerHTML = '';
    for(var i = 0; i < estocagemId.length; i++)
    {
        if(estocagemId[i] != 0)
        {
            var addProd = document.createElement('option');
            addProd.text = "ID: " + estocagemId[i] + " | Nome do Produto: " + nomeproduto[i];
            tableEstoque.appendChild(addProd);
        }
    }
}

function RemoverProduto(id)
{
    if(estoqueON)
    {
        var inputID = document.getElementById("selectID");

        if(estocagemId.indexOf(Number(id)) != -1)
        {
            for(var i = 0; i < estocagemId.length; i++)
                {

                    if(estocagemId[i] == id && quantidadeproduto[i] <= 0)
                    {
                        estocagemId[i] = 0;
                        window.alert("Produto removido!");
                        ShowProdutos();

                        return inputID.value = '';
                    }else if(estocagemId[i] == id && quantidadeproduto[i] > 0)
                    {
                        let escolha = window.confirm("Deseja remover o produto com estoque disponível? " + quantidadeproduto[i] + " Restantes!");
                        if(escolha == true)
                        {
                            estocagemId[i] = 0;
                            window.alert("Produto removido!");
                            ShowProdutos();
                        }
                        return inputID.value = '';
                    }

                } 


        }else
        {
            window.alert("Produto com o ID " + id + " não existe no estoque!");
        }

        return inputID.value = '';
    }else
    {
        window.alert("Precisa carregar o estoque para remover o produto desejado!");
        return;
    }
}

function PagAddProd()
{
    window.location.href = "Index.html";
}

function PagEstoque()
{
    window.location.href = "Page2.html";
}

function PagRemoverProd()
{
    window.location.href = "Page3.html";
}

function SaveData()
{
    var data = {
        id: estocagemId,
        nome: nomeproduto,
        quantidade: quantidadeproduto
    }

    localStorage.setItem('data', JSON.stringify(data));
}

function LoadData()
{
    if(localStorage.getItem('data') == null)
    {
        return;
    }
    var data = JSON.parse(localStorage.getItem('data'));

    estocagemId = data.id;
    nomeproduto = data.nome;
    quantidadeproduto = data.quantidade;
}

function AAAAA(){
    window.alert(estocagemId);
}
function C(){
    localStorage.clear('data');
    window.alert("Dados deletados com sucesso!");
}