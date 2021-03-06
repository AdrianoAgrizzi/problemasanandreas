fs = require('fs');

const Servicos = function(servicos) {
  this.trechos = servicos.trechos;
  this.encomendas = servicos.encomendas;
  this.rotas = servicos.rotas;
};

var arrayTrechos1 = [], arrayTrechos2 = [], arrayTrechosDistancia = [];
var arrayEncomendas;
var arrayRotas = [];

// Lê o arquivo de trechos
Servicos.carregaTrechos = (dados, retorno) => {
  
  if (dados != null && dados.trim() != ""){
    Servicos.trechos = "src/data/"+dados.trim();
  }

  // Verifica se o arquivo foi informado ou usa o padrão
  if ( Servicos.trechos == "" || Servicos.trechos == null ){
    Servicos.trechos = "src/data/trechos.txt";
  }

  arrayTrechos1 = [];
  arrayTrechos2 = [];
  arrayTrechosDistancia = [];

  // Verifica se o arquivo existe
  fs.stat(Servicos.trechos, (err, stats) => {
    if (err) throw err;

    // Carrega o arquivo na array    
    fs.readFile(Servicos.trechos, (err, data) => {
      if (err) throw err;

      let arrayTrechos = data.toString().split("\n"); 
      for ( i in arrayTrechos ){
        arrayTrechos1.push(String(arrayTrechos[i].split(' ')[0]).trim());
        arrayTrechos2.push(String(arrayTrechos[i].split(' ')[1]).trim());
        arrayTrechosDistancia.push(Number(String(arrayTrechos[i].split(' ')[2]).trim()));
      }
      retorno(data);
    });     
  });
};

// Lê o arquivo de encomendas
Servicos.carregaEncomendas = (dados, retorno) => {

  if (dados != null && dados.trim() != ""){
    Servicos.encomendas = "src/data/"+dados.trim();
  }

  // Verifica se o arquivo foi informado ou usa o padrão
  if ( Servicos.encomendas == "" || Servicos.encomendas == null ){
    Servicos.encomendas = "src/data/encomendas.txt";
  }

  arrayEncomendas = [];
  // Verifica se o arquivo existe
  fs.stat(Servicos.encomendas, (err, stats) => {
    if (err) throw err;

    // Carrega o arquivo no array
    fs.readFile(Servicos.encomendas, (err, data) => {
      if (err) throw err;

      arrayEncomendas =  data.toString().split("\n");
      retorno(data);
    });  
  });
};

// Calcula o caminho e o tempo de entrega das encomendas
Servicos.verificaDados = (retorno) => {

  if (arrayTrechos1 == null || arrayTrechos1.length == 0) {
    Servicos.carregaTrechos("trechos.txt", () => {
      if (arrayEncomendas == null || arrayEncomendas.length == 0) {
        Servicos.carregaEncomendas("", () => {
          retorno();
        });
      }
      else {
        retorno();
      }
    });
  }
  else {
    retorno();
  }
  
}; 

Servicos.calculaRotas = (retorno) => {

  let arrayTrechos1Loop, arrayTrechos2Loop;
  let origem, proximo, destino;
  let dias, distancia, distanciaMenor, indiceMenor, indiceMenor2;
  let achouRota, rota;
  let t;

  arrayRotas = [];

  if ( arrayTrechos1.length < 1 || arrayEncomendas.length < 1){
    retorno("");
    return
  }

  // Looping das encomendas
  for (e in arrayEncomendas){
    origem = String(arrayEncomendas[e].split(' ')[0]).trim();
    proximo = String(arrayEncomendas[e].split(' ')[1]).trim();
    destino = proximo;

    if (origem == "" || destino == "") continue;

    // Array auxiliar para controle das rotas
    arrayTrechos2Loop = arrayTrechos2.slice();
    arrayTrechos1Loop = arrayTrechos1.slice();

    rota = "";
    achouRota = false;
    dias = 0, t = 0, distanciaMenor = 99, indiceMenor = -1;
    // Looping das rotas/trechos
    while (true) {
      // Localiza o proximo destino da encomenda no trecho
      // A busca é realizada de trás para frente, do destino para a origem
      t = arrayTrechos2Loop.findIndex(e => e == proximo);
      // Se encontrou o destino no trecho e sendo diferente do destino da encomenda, para evitar entrar em círculo
      if (t > -1 && arrayTrechos1Loop[t] != destino ){
        // Guarda a menor distância, duas últimas
        distancia = arrayTrechosDistancia[t];        
        if (distancia < distanciaMenor){
          distanciaMenor = distancia;
          indiceMenor2 = indiceMenor;
          indiceMenor = t;          
        }

        // Verifica se encontrou a rota
        if (arrayTrechos1Loop[t] == origem) {
          rota = arrayTrechos2[t] + " " + rota;
          dias += arrayTrechosDistancia[t];
          achouRota = true;
          break;
        }
        // Marca trecho verificado
        arrayTrechos2Loop[t] = arrayTrechos2Loop[t]+"x";
      }
      else {
        // Verifica e marca o trecho para evitar uma rota circular
        if (arrayTrechos1Loop[t] == destino){
          arrayTrechos2Loop[t] = arrayTrechos2Loop[t]+"x";

          // Verifica se o destino é impossível de ser alcançado
          if (arrayTrechos2Loop[t].indexOf("xx") > -1){
            break;            
          }

          proximo = arrayTrechos1Loop[indiceMenor2];          
          continue;
        }

        // Verifica se entrou numa rota circular e marca trecho
        if (rota.indexOf(arrayTrechos2[indiceMenor]) > -1){
          arrayTrechos1Loop[indiceMenor] = arrayTrechos1Loop[indiceMenor]+"x";

          // Verifica se o destino é impossível de ser alcançado
          if (arrayTrechos1Loop[indiceMenor].indexOf("xx") > -1){
            break;            
          }
          
          if (indiceMenor2 > -1){
            rota = rota.replace(arrayTrechos2[indiceMenor]+" ","");
            proximo = arrayTrechos1Loop[indiceMenor2];
          }
          else{
            rota += "Destino inalcançável";
            break;
          }
          continue;
        }

        rota = arrayTrechos2[indiceMenor] + " " + rota;
        dias += distanciaMenor;
        distanciaMenor = 99;
        
        // Verifica se encontrou a rota
        if (arrayTrechos1Loop[indiceMenor] == origem) {
          achouRota = true;
          break;
        }

        // Seleciona próximo trecho para buscar a rota
        proximo = arrayTrechos1Loop[indiceMenor];
        continue;
      }
    }    

    // Guarda as rotas na array
    if (achouRota) {
      arrayRotas.push(origem + " " + rota + dias);
    }
    else{
      arrayRotas.push("Destino inalcançável");
    }
  }

  // Verifica se o arquivo foi informado ou usa o padrão
  if ( Servicos.rotas == "" || Servicos.rotas == null ){
    Servicos.rotas = "src/data/rotas.txt";
  }

  let dados = arrayRotas.toString();
  dados = dados.replace(/,/g,"\n");
  fs.writeFile(Servicos.rotas, dados,()=>{});

  try
  {
    retorno(arrayRotas.toString());
  }
  catch{}
}

module.exports = Servicos; 