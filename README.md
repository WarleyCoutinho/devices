# Devices

**Devices** é um projeto inovador desenvolvido para criar e monitorar uma variedade de dispositivos, permitindo uma análise aprofundada de seu comportamento.

## Resumo da Tecnologia

Este projeto é construído sobre uma stack moderna e robusta, garantindo eficiência, escalabilidade e segurança. As principais tecnologias utilizadas incluem:

- **Fastify**: Um framework web de alto desempenho para Node.js, ideal para construir APIs rápidas e eficientes.
- **Fastify CORS**: Middleware que habilita CORS, permitindo que sua API seja acessada de diferentes origens.
- **Fastify JWT**: Plugin que facilita a implementação de autenticação segura usando JSON Web Tokens.
- **Fastify Swagger**: Ferramentas para documentar sua API de forma interativa, permitindo testes e visualizações dos endpoints.
- **Prisma**: Um ORM que simplifica a interação com bancos de dados, proporcionando uma experiência intuitiva para consultas e manipulações de dados.
- **Zod**: Biblioteca de validação de esquemas que assegura a integridade dos dados recebidos.
- **Bcryptjs**: Ferramenta para hash de senhas, garantindo a segurança das credenciais dos usuários.
- **dotenv-cli**: Utilitário que facilita a gestão de variáveis de ambiente.`.env`, facilitando a configuração do ambiente de desenvolvimento.

### Dependências de Desenvolvimento

- **TypeScript**: Um superconjunto do JavaScript que adiciona tipagem estática, melhorando a qualidade do código e a experiência de desenvolvimento.

## Conclusão

Com essa stack tecnológica, o **Devices** oferece uma base sólida para o desenvolvimento de aplicações web modernas, priorizando segurança, desempenho e facilidade de uso.

```mermaid
Isso deve fornecer uma representação clara das relações entre os modelos no banco de dados.
graph TD
    A[Device] -->|has| B[DeviceStatus]
    A -->|logs| C[DeviceLog]
    C -->|belongs to| A
    B -->|has| A

```

### Explicação do Diagrama:

- **Device**: Representa o dispositivo. Tem uma relação opcional com `DeviceStatus` e pode ter múltiplos registros em `DeviceLog`.
- **DeviceStatus**: Representa o status do dispositivo. Um status pode estar associado a múltiplos dispositivos.
- **DeviceLog**: Representa os logs de cada dispositivo. Cada log está associado a um único dispositivo.

```bash
## crie o .env na raiz do seu projeto para con as informaçoes abaixo
PORT=3000

POSTGRES_USER=colocar-aqui-seu-user-do-banco
POSTGRES_PASSWORD=colocar-aqui-seu-password
POSTGRES_DB=colocar-aqui-seu-database


DATABASE_URL="postgresql://colocar-aqui-seu-user-do-banco:colocar-aqui-seu-password@localhost:5432/colocar-aqui-seu-database?schema=public"

```

## Getting Started

Para iniciar o servidor de desenvolvimento, execute:

```bash
sudo docker compose up -d
pnpm migrate
pnpm dev
```

## Observação

**_ Esses comandos já estão prontos no package.json, caso você prefira rodar conforme seu costume. Consulte a documentação do Prisma para mais informações _**.
