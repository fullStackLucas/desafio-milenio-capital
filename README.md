# Desafio de Grafos - Desafio Back-End [Milenio Capital](https://www.milenio.capital/)

> Desafio de Grafos é uma aplicação back-end onde você pode adicionar um conjunto de grafos, fazer a busca por seu ID, buscar os caminhos possíveis dado o id do conjunto de grafos e buscar o caminho mais curto entre duas arestas dado um conjuto de grafos.

>Esta aplicação foi desenvolvida como desafio técnico da Milenio Capital para o cargo de Desenvolvedor Back-End Jr/Pl.

>A [Milenio Capital](https://www.milenio.capital/) é uma gestora de recursos focada na originação, estruturação, financiamento e gestão de produtos de crédito, com ênfase na redução da distância entre empresas e investidores. A missão da empresa é unir o melhor do crédito com tecnologia. Contantando com um time de +40 colaboradores, ela é liderada por sócios com profundo conhecimento no mercado de crédito e tecnologia.

## 🛠️ Tecnologias e Ferramentas utilizadas
#### Back-end
* Node.js
* Express.js
* Sequelize.js
* Mysql2
* Dotenv
* [Joi](https://joi.dev/)
* Mocha
* Chai
* Chai-Http
* Sinon
* Nyc
* Nodemon
* Swagger-Ui-Express
* node-dijkstra

## 💻 Pré-requisitos

Esta aplicação utiliza o [Docker](https://www.docker.com/get-started/) e o [Docker Compose](https://docs.docker.com/compose/install/) para iniciá-la. Certifique-se que ambas as ferramentas estão instaladas corretamente em seu computador.

## 🚀 Clonando o projeto

Abra seu terminal e digite os seguintes comandos:
```
git clone git@gitlab.com:lucaspinheirorocha/desafio-dev-jr-pl.git

cd desafio-dev-jr-pl
```
## 🚀 Iniciando a Aplicação
Com o projeto clonado em sua máquina e dentro do diretório `desafio-dev-jr-pl`, execute o seguinte comando do docker compose:

```
docker-compose up -d
```
Aguarde a instalação até que a mensagem `Escutando a porta 8080` apareça em seu terminal.

Abra seu navegador do `Google Chrome` e digite o seguinte link:

[http://localhost:8080/api-docs](http://localhost:8080/api-docs)

Essa é a interface gráfica para a aplicação.

Você pode testá-la à vontade.

#### Testando a aplicação

O back-end desta aplicação possui testes unitários e de integração dos controladores e serviços. **Para executá-los e checar a cobertura de testes, siga as seguintes instruções:**

Navegue até o diretório `server`:
```
cd /server
```
Instale as dependências:
```
npm install
```
Execute os testes:
```
npm test
```

## Utilizando a Aplicação

Assim que a aplicação iniciar, automaticamente já haverá um conjunto de grafos e seu id será 1.

## Endpoints da API
Esta API possui os seguintes endpoints:

| Method | Description |
|---|---|
| `POST - localhost:8080/graph` | Cria um novo conjunto de grafos com id auto incrementado. |
| `GET - localhost:8080/graph/:graphId` | Retorna todos os grafos que contenham o id informado. |
| `POST - localhost:8080/routes/:graphId/from/:town1/to/:town2/?maxStops=<maxStops>` | Busca todas as rotas possíveis dados um ponto de partida, um ponto de destino e um número máximo de paradas entre eles (parâmetro opcional) |
| `POST - localhost:8080/distance/:graphId/from/:town1/to/:town2/` | Busca o caminho mais curto entre dois pontos. |

#### Testando as rotas

Para criar um grafo, utilize a interface gráfica [http://localhost:8080/api-docs](http://localhost:8080/api-docs) e use a rota POST /graph e clique em `Try it out` >> `Execute`.

O mesmo se aplica para todas as outras rotas.

## Autor

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/lucaspinheiro1991/" target="_blank" rel="noopener noreferrer">
        <img src="https://ca.slack-edge.com/TMDDFEPFU-U027DPCHK54-69227d47efdd-512" width="100px;" alt="Lucas Pinheiro Rocha"/><br>
        <sub>
          <b>Lucas Pinheiro Rocha</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
