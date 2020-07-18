fs = require('fs');

const Servicos = function(servicos) {
  this.trechos = servicos.trechos;
  this.encomendas = servicos.encomendas;
  this.rotas = servicos.rotas;
};

Servicos.carregaTrechos = (dados, retorno) => {
  // Lê o arquivo de trechos
  if ( Servicos.trechos == "" || Servicos.trechos == null ){
    Servicos.trechos = "src/data/trechos.txt";
  }

  fs.stat(Servicos.trechos, (err, stats) => {
    if (err) throw err;
    console.log(`stats: ${JSON.stringify(stats)}`);

    fs.readFile(Servicos.trechos, (err, data) => {
      if (err) throw err;
      console.log("data:"+data);

      retorno(data);
    });  
  });
};

Servicos.carregaEncomendas = (dados, retorno) => {
  // Lê o arquivo de encomendas
  if ( Servicos.encomendas == "" || Servicos.encomendas == null ){
    Servicos.encomendas = "src/data/encomendas.txt";
  }

  fs.stat(Servicos.encomendas, (err, stats) => {
    if (err) throw err;
    console.log(`stats: ${JSON.stringify(stats)}`);

    fs.readFile(Servicos.encomendas, (err, data) => {
      if (err) throw err;
      console.log("data:"+data);

      retorno(data);
    });  
  });
};

Servicos.calculaRotas = (dados, retorno) => {
  // Realiza o cálculo das rotas
  console.log("dados="+dados);
  retorno("calculaRotas");
}; 

module.exports = Servicos;