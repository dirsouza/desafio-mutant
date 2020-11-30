Mutant - Desafio NodeJS
===================

Projeto desenvolvido para a avaliação de competências técnicas.

As tecnologias utlizadas foram:

|             |Link                                           |
|-------------|-----------------------------------------------|
|Docker       |https://docs.docker.com/engine/install/ubuntu/ |
|NestJS       |https://nestjs.com/                            |
|TypeORM      |https://typeorm.io/#/                          |
|MySQL        |https://www.mysql.com/                         |

#### Para subir as aplicações via Docker:
   ```bash
   docker-compose up --build
   ```
Após a execução do comando com sucesso a aplicação estará disponível nos seguintes links:
* API de consulta de usuários:
   * Serviço: [http://localhost:3000/api/v1]()
   * Swagger: [http://localhost:3000/api/doc]()

> As portas dos serviços para acesso fora dos containers estão no arquivo `docker-compose.yml`, verifique antes de executar o `build` se alguma das portas irá conflitar com algum serviço já existente, caso sim, altere a porta relacionado ao serviço que conflita.
