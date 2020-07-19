const Servicos = require('./api/servicos');
fs = require('fs');

module.exports = function(server) {
    
    server.get('/api/carregatrechos', (req, res) => {
        Servicos.carregaTrechos(req.query, (ret) => {
            res.send(String(ret));
        });
    })    

    server.get('/api/carregaencomendas', (req, res) => {
        Servicos.carregaEncomendas(req.query, (ret) => {
            res.send(String(ret));            
        });
    })    

    server.get('/api/calcularotas', (req, res) => {
        Servicos.verificaDados(()=>{
            Servicos.calculaRotas((ret)=>{
                res.send(String(ret));
            });
        });
    })    

    server.get('/', (req, res) => {
        fs.readFile('src/index.html', (err, data) => {
            let html = data.toString();
            res.send(html);
        });
    })    

}

