<h3 align="center">Desafio-Proway</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">🧐 Desafio proposto pela Proway como parte do processo de seleção de Trainees da Pública Tecnologia para Gestão de Cidades.
    <br>
</p>

## 📝 Conteúdo

- [Sobre](#about)
- [Inicializando a aplicação](#getting_started)
- [Ferramentas](#built_using)
- [Autores](#authors)
- [Fotos](#acknowledgement)
---

## 🏁 Sobre o desafio <a name = "getting_started"></a>

Maria é jogadora de basquete e criou uma tabela para registrar suas pontuações. A cada jogo ela anota quantos pontos conseguiu marcar e atualiza o mínimo e o máximo da temporada. Ela anota também nesta tabela quantas vezes quebrou o recorde mínimo e quantas vezes quebrou o recorde máximo. Os placares são sempre números inteiros e positivos menores que 1000 Depois de 4 jogos a tabela está assim:

| Jogo | Placar | Mínimo da temporada | Máximo da temporada | Quebra recorde min. | Quebra recorde máx. |
|------|--------|---------------------|---------------------|---------------------|---------------------|
| 1    | 12     | 12                  | 12                  | 0                   | 0                   |
| 2    | 24     | 12                  | 24                  | 0                   | 1                   |
| 3    | 10     | 10                  | 24                  | 1                   | 1                   |
| 4    | 24     | 10                  | 24                  | 1                   | 1                   |

Crie um programa na sua linguagem de programação preferida para facilitar o acompanhamento de resultados da Maria. 

### Requisitos Mínimos cumpridos:

    • [x] Possibilidade de inserção de novos jogos; 
    • [x] Cálculo do mínimo e máximo da temporada;
    • [x] Cálculo da quantidade de vezes que o recorde foi quebrado;
    • [x] Interface para inserção dos dados;
    • [x] Interface para consulta dos dados;
    • [ ] Testes unitários;
    • [x] Controle de versão Git;
    • [ ] Documentação do código;

### Funcionalidades adicionais:

    • [x] Autenticação JWT; 
    • [x] Criptografia de senha;
    • [x] Arquitetura cliente - servidor;
    • [x] Possibilidade de criar, alterar e deletar temporadas;
    • [x] Possibilidade de criar, alterar e deletar jogos em cada temporada;
    • [x] Possibilidade de visualizar os máximos e mínimos de cada temporada;
    • [x] Possibilidade de visualizar a quantidade de quebras de recordes em cada temporada;
    • [x] Cálculo do mínimo e máximo da temporada;


## 🏁 Inicializando a aplicação <a name = "getting_started"></a>

Você pode consumir a aplicação de três formas diferentes. Qualquer que seja a maneira, você vai precisar fazer o download deste repositório.

-   Método 1: Requisitos -> ter o Nodejs instalado na sua máquina, bem como o gerenciador de pacotes npm ou yarn.
    - Ao fazer o download do repositório: 
        - acesse o diretório /backend pelo terminal e execute os seguintes comandos:
            - npm install
            - npm run start:prod
        - acesse o diretório /frontend/web pelo terminal e execute os seguintes comandos:
            - npm install
            - npm start
        - Após executar os comandos, abra o seu browser e acesse a url: http://localhost:3000

-   Método 2: Requisito -> você só vai precisar de ter o Docker instalado em sua máquina.
    - Ao fazer o download do repositório, você tem duas opções:
        - Primeira: Fazer a build local das imagens (Pode levar algum tempo). Para isso, execute o seguinte comando na pasta raíz do projeto:
            - docker-compose -f docker_compose_com_build.yml up
        - Segunda: Fazer o deploy usando as imagens que já foram buildadas por mim e guardadas no repositório público do Docker Hub. Para isso, execute o seguinte comando na pasta raíz do projeto:
            - docker-compose -f docker_compose_sem_build.yml up
        - Após executar os comandos, abra o seu browser e acesse a url: http://localhost:3003

## ⛏️ Ferramentas <a name = "built_using"></a>

### Backend
- [Typescript](https://www.typescriptlang.org/) Javascript superset 
- [NodeJs](https://nodejs.org/en/) - Server-side framework
- [Express](https://expressjs.com/) - Server-side framework
- [Nestjs](https://nestjs.com/) - Server-side framework
- [SQLite](https://www.sqlite.org/index.html) - Database
- [TypeORM](https://typeorm.io/#/) - ORM solution

### Frontend
- [Reactjs](https://pt-br.reactjs.org/) - Frontend library
- [Typescript](https://www.typescriptlang.org/) Javascript superset 
- [Styled-components](https://styled-components.com/) Styling 

## ✍️ Autor <a name = "authors"></a>

- [@gsbiel](https://github.com/gsbiel)

## Fotos 

### :camera: - Screenshots
1 | 2 | 3 | 4
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
<img src="/screenshots/photo1.jpeg" width="200">  |  <img src="/screenshots/photo2.jpeg" width="200"> | <img src="/screenshots/photo3.jpeg" width="200"> | <img src="/screenshots/photo4.jpeg" width="200">

5 | 6 | 7 | 8
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
<img src="/screenshots/photo5.jpeg" width="200">  |  <img src="/screenshots/photo6.jpeg" width="200"> | <img src="/screenshots/photo7.jpeg" width="200"> | <img src="/screenshots/photo8.jpeg" width="200">
