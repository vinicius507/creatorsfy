# Creatorsfy

Dashboard simples em NextJS.

## Contribuindo

**Requisitos::**

- bun 1.2.4

O projeto está estruturado como um [monorepo]() provendo os seguintes pacotes:

- **Aplicações**
  - [`api`](./apps/api): Backend NestJS
  - [`web`](./apps/api): Frontend NextJS
- **Pacotes**
  - [`@creatorsfy/typescript-config`](./packages/typescript-config): Configurações do TypeScript.

### Primeiros Passos

1. Clone o repositório
   ```bash
   git clone https://github.com/vinicius507/creatorsfy
   ```
2. Instale as dependências
   ```bash
   bun install
   ```
3. Configure as variáveis de ambiente
   ```bash
   # Copie os .env.example e realize as modificações necessárias
   cp ./apps/api/.env.example ./apps/api/.env
   cp ./apps/app/.env.example ./apps/app/.env
   ```
4. Execute a aplicação

   ```bash
   bun run dev
   ```

5. A aplicação vai estar disponível em http://localhost:3000

## Features

- Login com email e senha
- Dashboard contruido com rtk-query com paginação e filtro de data

## Possíveis melhorias

- Atualização de orders em tempo real usando SSE/WebSockets + Event Emitter.
- Trabalhar no design system.
- Adicionar sistema de notificações
- Usar OIDC/OAuth para login
- Adicionar i18n
