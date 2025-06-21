# Sistema de Relatórios Diários

Uma API RESTful para registro e acompanhamento de atividades diárias, com geração de relatórios semanais, exportação em PDF e envio automático por e-mail.

## 🚀 Funcionalidades

-   **Autenticação de Usuários**: Cadastro e Login com JWT.
-   **Registro Diário**: Permite que os usuários insiram o que fizeram no dia, o que farão no dia seguinte e possíveis bloqueios.
-   **Histórico de Atividades**: Consulta de relatórios por período.
-   **Relatório Semanal**: Geração de um sumário das atividades da semana.
-   **Exportação de Relatórios**: Disponibiliza o relatório semanal em formato JSON ou PDF.
-   **Envio Automático por E-mail**: Um serviço (cron job) envia o relatório da semana para o usuário todos os domingos.

## 🛠️ Tecnologias Utilizadas

-   **Backend**: Node.js, Express.js
-   **Banco de Dados**: MongoDB com Mongoose
-   **Autenticação**: JSON Web Token (JWT) e bcrypt
-   **Geração de PDF**: PDFKit
-   **Tarefas Agendadas (Cron Jobs)**: node-cron
-   **Envio de E-mail**: Nodemailer

## ⚙️ Endpoints da API

### Autenticação

-   `POST /user/register`: Cadastra um novo usuário.
-   `POST /user/login`: Autentica um usuário e retorna um token JWT.

### Relatórios

-   `POST /reports`: Cria um novo relatório diário (requer autenticação).
-   `GET /reports?from=YYYY-MM-DD&to=YYYY-MM-DD`: Lista os relatórios de um usuário em um período (requer autenticação).
-   `GET /reports/summary/weekly`: Retorna o relatório semanal em JSON (requer autenticação).
-   `GET /reports/summary/weekly?format=pdf`: Retorna o relatório semanal em PDF (requer autenticação).

## 🚀 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone <https://github.com/juelsonjunior/api-daily-report.git>
    cd daily-report
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Retire o `.exemple` do `env.exemple` na raiz do projeto e use as suas variaveis.

4.  **Execute a aplicação em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O servidor estará disponível em `http://localhost:3001` usando a porta que você definir ou 3001 senão definir.

## 📚 Documentação

[Link para a documentação fazendo kkkkk] 
