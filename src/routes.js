const Servicos = require('./api/servicos');

module.exports = function(server) {
    
    server.get('/api/carregatrechos', (req, res) => {
        console.log(req.query);        
        Servicos.carregaTrechos(req.query, (ret) => {
            res.send(String(ret));
        });
    })    

    server.get('/api/carregaencomendas', (req, res) => {
        console.log(req.query);        
        Servicos.carregaEncomendas(req.query, (ret) => {
            res.send(String(ret));            
        });
    })    

    server.get('/api/calcularotas', (req, res) => {
        console.log(req.query);        
        Servicos.verificaDados(()=>{
            Servicos.calculaRotas((ret)=>{
                res.send(ret);
            });
        });
    })    

}

