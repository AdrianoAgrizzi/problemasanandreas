
# Desenvolvimento de seleção Problema: Correios de San Andreas

## Solução realizada.
### Criei o backend com microserviços usando chamada api:
	-api/carregatrechos, carrega o arquivos dos trechos.
	-api/carregaencomendas, carrega o arquivo das encomendas.
	-api/calcularotas, realiza o carregamento dos arquivos e calcula a rota.
	-/, página de interface 

## Resumo da solução:
    - Os trechos são lidos do arquivo e carregados em arrays, cada coluna numa determinada array.
    - As encomendas tb são lidas do arquivo e carregadas numa array.
    ### Algorítimo:
        - Inicia com um loop das encomendas, pegando origem e destino.
	- Dentro o loop para localizar os trechos.
	- A busca do trechos é realizada de trás pra frente, ou seja, do destino para origem.
	- Assim usando como exemplo a emcomenda LS BC, o destino BC é localizado no arquivo de trecho na parte do destino.
	- Caso exista mais de um trecho para o mesmo destino, todos serão verificados.
        - Ao terminar a pesquisa, o próximo destino procurado no trecho é a origem do trecho anterior, neste caso LS.
	- Assim, todos os possíveis trechos com este destino serão novamente procurados, repetindo o mesmo método de busca
	- Até encontrar a orgiem da emcomenda e de forma que seja o menor tempo.
	- Durante a busca são verificadas e controladas rotas circulares.
	- Para este controle realizei marcações de trechos já verificados e condicionantes para analisar e conferir.
	- Caso a rota de menor tempo não seja alcançavel, e ela entre em um círculo, ela será ignorada e o trecho 
	   em segundo será utilizado.
 	- Portanto o algorítimo realiza o cálculo da menor rota, mas também verifica se a menor rota gera um problema circular.
	- Então é selecionada a segunda menor rota e o processo é repetido.
	- As rotas são armazendas e no fim gravadas no arquivo rotas.txt (pasta src/data)
	
	
