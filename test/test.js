var assert = require('assert');
const Servicos = require('../src/api/servicos');

describe('1) Calcula Rotas conforme definido pela avaliação', function () {    
      it('Deveria retornar as rotas conforme saída definida', function () {

        let rotas;
        Servicos.verificaDados(()=>{
          Servicos.calculaRotas((ret)=>{
            rotas = String(ret);
            assert.equal(rotas, "SF WS 1,LS LV BC 2,WS SF LV BC 5");
          });
        });

      });    
  });


  describe('2) Carrega o arquivo de trecho padrão', function () {    
    it('Deveria retornar os trechos do arquivo', function () {
  
      Servicos.carregaTrechos("trechos.txt", (ret) => {
        assert.equal(String(ret).length, 106);
      });
    });    
  });
  
  describe('3) Carrega arquivo de encomendas padrão', function () {    
    it('Deveria retornar as encomendas do arquivo', function () {
      Servicos.carregaEncomendas("encomendas.txt", (ret) => {
        assert.equal(String(ret).length, 19);
      });
    });    
  });
  
  describe('4) Calcula rotas com emcomendas de test, para trechos inexistentes', function () {    
    it('Deveria retornar a última inalcançavel', function () {
      Servicos.carregaEncomendas("encomendasTest.txt", (ret) => {        
        Servicos.calculaRotas((ret)=>{
          rotas = String(ret);
          assert.equal(rotas, "SF WS 1,LV BC 1,Destino inalcançável");
        });
      });
    });    
  });
  
  describe('5) Calcula rotas com emcomendas de test, com novos trechos ', function () {    
    it('Deveria econtrar as rotas', function () {
      Servicos.carregaEncomendas("encomendasTest.txt", (ret) => {
        Servicos.carregaTrechos("trechosTest.txt", (ret) => {
          Servicos.calculaRotas((ret)=>{
            rotas = String(ret);
            assert.equal(rotas, "SF WS 1,LS LV BC 2,WS SF LV BC 5");
          });
        });
      });
    });    
  });
  
  
  describe('6) Calcula rotas com emcomendas e trechos fora de ordem ', function () {    
    it('Deveria nao econtrar a rota da primeira encomenda', function () {
      Servicos.carregaEncomendas("encomendasforadeordem.txt", (ret) => {
        Servicos.carregaTrechos("trechosforadeordem.txt", (ret) => {
          Servicos.calculaRotas((ret)=>{
            rotas = String(ret);
            assert.equal(rotas, "");
          });
        });
      });
    });    
  });

  describe('7) Calcula rotas com emcomendas e sem trechos ', function () {    
    it('Deveria nao econtrar nada', function () {
      Servicos.carregaEncomendas("encomendasforadeordem.txt", (ret) => {
        Servicos.carregaTrechos("semtrechos.txt", (ret) => {
          Servicos.calculaRotas((ret)=>{
            rotas = String(ret);
            assert.equal(rotas, "");
          });
        });
      });
    });
  });
  
